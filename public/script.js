// --- Import WASM Glue Code ---
// Ensure your wasm files (vtracer_webapp.js, _bg.js, _bg.wasm)
// are in the /wasm/ directory relative to where index.html is served.
import init, { svg_from_image, get_version } from './wasm/vtracer_webapp.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const statusArea = document.getElementById('statusArea');
    const optionsForm = document.getElementById('optionsForm');
    const optionsPanel = document.getElementById('optionsPanel'); // The whole panel
    const optionsOverlay = document.getElementById('optionsDisabledOverlay'); // Overlay div
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgSizeInfo = document.getElementById('svgSizeInfo');
    // const originalImage = document.getElementById('originalImage'); // Optional image overlay
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    const segmentViewCheckbox = document.getElementById('optSegmentView');

    // Sliders & Value Displays (Attach listeners)
    const sliders = optionsForm.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const valueDisplayId = `${slider.id}Value`;
        const valueDisplay = document.getElementById(valueDisplayId);
        if (!valueDisplay) {
            console.warn(`No value display found for slider ${slider.id}`);
            return;
        }

        // Function to update display based on slider type
        const updateDisplay = () => {
            let displayValue = slider.value;
            switch (slider.id) {
                case 'optCornerThreshold': displayValue += '°'; break;
                case 'optFilterSpeckle': displayValue += ' px'; break;
                case 'optColorPrecision': displayValue += ' bits'; break;
                case 'optPathPrecision': displayValue += ' dec'; break;
            }
            valueDisplay.textContent = displayValue;
        };

        updateDisplay(); // Initial display
        slider.addEventListener('input', updateDisplay); // Update text while sliding
        slider.addEventListener('input', debouncedRunVtracer); // Vectorize (debounced)
    });

    // Other options (select dropdowns)
    optionsForm.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', runVtracer); // Re-vectorize immediately on change
    });

    // Segment view checkbox
    segmentViewCheckbox.addEventListener('change', () => {
        toggleSegmentView();
        // Re-vectorization NOT needed, just toggles CSS
    });

    // --- State Variables ---
    let wasmModule = null; // Holds the initialized WASM module functions
    let currentImageData = null; // Uint8Array of the loaded image
    let currentFilenameBase = 'vectorised-image';
    let isProcessing = false;
    let currentSvgString = '';

    // --- Debounce Timer ---
    let debounceTimer;

    // --- Initialization ---
    async function initializeWasm() {
        try {
            updateStatus('Loading vectorizer module...', 'loading');
            toggleOptionsPanel(false); // Disable options initially
            wasmModule = await init('/wasm/vtracer_webapp_bg.wasm'); // Adjust path if server structure differs
            const version = wasmModule.get_version ? wasmModule.get_version() : 'N/A'; // Check if function exists
            console.log(`VTracer WASM loaded successfully! Version reported: ${version}`);
            updateStatus('Ready for image.', 'success', 2000); // Success msg, clear after 2s
            // Keep options disabled until image is loaded
        } catch (error) {
            console.error("WASM Initialization Error:", error);
            updateStatus('FATAL: Error loading vectorizer. Please refresh.', 'error');
            toggleOptionsPanel(false); // Keep disabled on error
        }
    }

    initializeWasm(); // Start loading WASM

    // --- Event Listeners ---
    imageInput.addEventListener('change', handleImageUpload);
    downloadBtn.addEventListener('click', handleDownload);

    // --- Core Functions ---

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            resetApp();
            return;
        }

        // Reset previous state before validation/processing
        resetPreview();
        updateStatus('Reading image...', 'loading');
        toggleOptionsPanel(false);

        if (file.size > 20 * 1024 * 1024) { // Limit size (e.g., 20MB)
             updateStatus('Error: Image too large (> 20MB). Please choose a smaller file.', 'error');
             resetInput();
             return;
        }
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
              updateStatus(`Error: Unsupported file type (${file.type || 'unknown'}). Use JPG, PNG, WEBP, or BMP.`, 'error');
             resetInput();
             return;
        }

        fileNameDisplay.textContent = file.name;
        currentFilenameBase = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        try {
            // Read file as ArrayBuffer first, then convert
            const arrayBuffer = await file.arrayBuffer();
            currentImageData = new Uint8Array(arrayBuffer);
            console.log(`Image loaded: ${file.name}, size: ${currentImageData.byteLength} bytes`);

            // Initial vectorization run
            await runVtracer(); // Wait for the first run to complete

            // Only enable options *after* the first successful vectorization
            if (currentSvgString) {
                 toggleOptionsPanel(true);
            }

        } catch (error) {
            console.error("Error processing image:", error);
            updateStatus(`Error reading or processing image: ${error.message}`, 'error');
            resetInput();
        }
    }

    // Debounce function to limit rapid calls
    function debouncedRunVtracer() {
        if (!currentImageData) return; // Don't run if no image
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runVtracer, 300); // Adjust delay (ms)
    }

    async function runVtracer() {
        // Guard clauses
        if (!wasmModule || !currentImageData) {
            console.log("Vtracer run skipped: No WASM or image data.");
            return;
        }
        if (isProcessing) {
             console.log("Vtracer run skipped: Already processing.");
            // Optionally: queue the next run? For simplicity, we just skip.
            return;
        }

        isProcessing = true;
        updateStatus('Vectorizing...', 'loading');
        downloadBtn.disabled = true;
        svgSizeInfo.textContent = ''; // Clear old size info

        // Get options (ensure correct types)
        const options = {};
        const formData = new FormData(optionsForm);
        for (let [key, value] of formData.entries()) {
            const inputElement = document.getElementById(`opt${capitalizeFirstLetter(key.replace(/_/g, ''))}`);
            if (inputElement && inputElement.type === 'range') {
                 options[key] = parseFloat(value); // Ensure numeric
            } else {
                options[key] = value; // mode, color_mode are strings
            }
        }
        delete options.segment_view; // Not a core vtracer option

        console.log("Running vtracer WASM with options:", options);

        // Use requestAnimationFrame to allow UI update (e.g., "Vectorizing...") before blocking thread
        await new Promise(resolve => requestAnimationFrame(resolve));

        try {
             // --- Call WASM Function ---
             currentSvgString = wasmModule.svg_from_image(currentImageData, options);
             // console.log("SVG generated:", currentSvgString.substring(0, 200)); // DEBUG

             // --- Update UI ---
             if (!currentSvgString || currentSvgString.length < 10) {
                 throw new Error("WASM function returned empty or invalid SVG.");
             }
             svgOutputDiv.innerHTML = currentSvgString; // Render preview
              svgOutputDiv.classList.remove('placeholder-text');
             toggleSegmentView(); // Apply segment style if needed

             // Calculate and display approximate SVG size
             const svgSize = new Blob([currentSvgString]).size;
             svgSizeInfo.textContent = `SVG Size: ${(svgSize / 1024).toFixed(1)} KB`;

             updateStatus('Vectorization complete.', 'success', 2000); // Clear after 2s
             downloadBtn.disabled = false;

        } catch (error) {
            console.error("VTracer WASM Execution Error:", error);
            currentSvgString = ''; // Clear invalid result
            svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Vectorization Failed: ${error.message || 'Unknown WASM error.'}.<br/>Try different options or a simpler image.</p>`;
            updateStatus(`Error: Vectorization failed.`, 'error');
        } finally {
            isProcessing = false;
            // Controls are re-enabled by toggleOptionsPanel if needed (not disabled during run)
        }
    }

    function toggleOptionsPanel(enable) {
        if (enable) {
            optionsPanel.classList.remove('disabled');
            optionsOverlay.style.opacity = '0';
            optionsOverlay.style.pointerEvents = 'none';
        } else {
             optionsPanel.classList.add('disabled');
             optionsOverlay.style.opacity = '1';
             optionsOverlay.style.pointerEvents = 'all';
        }
    }

    function toggleSegmentView() {
         // Checkbox state determines class on the output div
         if (segmentViewCheckbox.checked) {
            svgOutputDiv.classList.add('segment-view');
         } else {
             svgOutputDiv.classList.remove('segment-view');
         }
    }


    function handleDownload() {
        if (!currentSvgString) return;

        const svgBlob = new Blob([currentSvgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        downloadLink.href = url;
        downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
        downloadLink.click();

        URL.revokeObjectURL(url);
        console.log("SVG Downloaded");
    }

    // --- Utility Functions ---

    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
        clearTimeout(statusClearTimer); // Clear any pending timeout
        statusArea.textContent = message;
        statusArea.className = `status-area ${type}`;

        if (type !== 'error' && clearDelay > 0 && message !== '') {
            statusClearTimer = setTimeout(() => {
                // Only clear if the message hasn't changed in the meantime
                if (statusArea.textContent === message) {
                    updateStatus('', ''); // Clear status
                }
            }, clearDelay);
        }
         // Make sure errors persist until the next action/message
         if (type === 'error') {
            console.error("UI Status Update (Error):", message);
         }
    }

     function resetPreview() {
         svgOutputDiv.innerHTML = '<p class="placeholder-text">Upload an image to see the preview</p>';
         svgOutputDiv.classList.remove('segment-view');
         currentSvgString = '';
         downloadBtn.disabled = true;
         svgSizeInfo.textContent = '';
          // Keep segment view checkbox as is
     }

     function resetInput() {
          imageInput.value = '';
          fileNameDisplay.textContent = 'No file chosen';
          currentImageData = null;
          toggleOptionsPanel(false); // Disable options when input is reset
          // Don't necessarily reset the preview here, resetPreview is called separately
     }

     function resetApp() {
         resetInput();
         resetPreview();
         // Optionally reset options to defaults
         // optionsForm.reset(); // Uncomment to reset form on file clear
         // Trigger display updates if form is reset
         // sliders.forEach(s => s.dispatchEvent(new Event('input')));
         updateStatus('Ready for image.', '', 0);
     }

     function capitalizeFirstLetter(string) {
       return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
     }

}); // End DOMContentLoaded
