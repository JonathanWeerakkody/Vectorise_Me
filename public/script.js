// --- Import the MAIN JS Glue Code as an ES Module ---
// This file internally handles loading the _bg.js and the .wasm file.
import initVTracer, { svg_from_image, get_version } from './wasm/vtracer_webapp.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const statusArea = document.getElementById('statusArea');
    const optionsForm = document.getElementById('optionsForm');
    const optionsPanel = document.getElementById('optionsPanel');
    const optionsOverlay = document.getElementById('optionsDisabledOverlay');
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgSizeInfo = document.getElementById('svgSizeInfo');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    const segmentViewCheckbox = document.getElementById('optSegmentView');

    // --- State Variables ---
    let vtracerApi = null; // Will hold the { svg_from_image, get_version } functions
    let currentImageData = null; // Uint8Array of the loaded image
    let currentFilenameBase = 'vectorised-image';
    let isProcessing = false;
    let currentSvgString = '';

    // --- Debounce Timer ---
    let debounceTimer;

    // --- Initialization ---
    async function initializeWasm() {
        try {
            updateStatus('Initializing Vectorizer...', 'loading');
            toggleOptionsPanel(false); // Disable options initially

            // --- Correct WASM Initialization ---
            // Pass the URL path to the WASM binary file to the init function.
            // The 'initVTracer' function imported from vtracer_webapp.js handles the rest.
            await initVTracer('/wasm/vtracer_webapp_bg.wasm');

            // --- Store API functions ---
            // Assign the imported functions AFTER init has successfully completed.
            vtracerApi = { svg_from_image, get_version };

            const version = vtracerApi.get_version ? vtracerApi.get_version() : 'N/A';
            console.log(`VTracer WASM Initialized Successfully! Version: ${version}`);
            updateStatus('Ready for image.', 'success', 2000);
            // Options remain disabled until an image is loaded.

        } catch (error) {
            console.error("WASM Initialization Failed:", error);
            // Provide more specific feedback if possible
            let errorMsg = 'FATAL: Error loading vectorizer. Please refresh.';
            if (error instanceof TypeError && error.message.includes('failed to fetch')) {
                 errorMsg = 'FATAL: Failed to fetch WASM module. Check network or server path.';
            } else if (error.message.includes('compile')) {
                 errorMsg = 'FATAL: Failed to compile WASM module. File might be corrupted.';
            } else if (error.message.includes('link')) {
                errorMsg = 'FATAL: Failed to link WASM module. File versions might mismatch.';
            }
            updateStatus(errorMsg, 'error');
            toggleOptionsPanel(false); // Keep disabled on error
        }
    }

    // --- Event Listeners & Setup ---

    // Sliders & Value Displays
    optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplayId = `${slider.id}Value`;
        const valueDisplay = document.getElementById(valueDisplayId);
        if (!valueDisplay) return;

        const updateDisplay = () => {
            let displayValue = slider.value;
            // Add units/symbols based on slider ID
             switch (slider.id) {
                 case 'optCornerThreshold': displayValue += '°'; break;
                 case 'optFilterSpeckle': displayValue += ' px'; break;
                 case 'optColorPrecision': displayValue += ' bits'; break;
                 case 'optPathPrecision': displayValue += ' dec'; break;
             }
            valueDisplay.textContent = displayValue;
        };

        updateDisplay();
        slider.addEventListener('input', updateDisplay);
        slider.addEventListener('input', debouncedRunVtracer);
    });

    // Select dropdowns
    optionsForm.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', runVtracer); // Run immediately on change
    });

    // Segment view checkbox
    segmentViewCheckbox.addEventListener('change', toggleSegmentView);

    // File input and Download button
    imageInput.addEventListener('change', handleImageUpload);
    downloadBtn.addEventListener('click', handleDownload);

    // --- Start Initialization ---
    initializeWasm();


    // --- Core Functions ---

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            resetApp();
            return;
        }
        // Reset UI before validation
        resetPreview();
        updateStatus('Reading image...', 'loading');
        toggleOptionsPanel(false);

        // Validation
        if (file.size > 20 * 1024 * 1024) {
             updateStatus('Error: Image too large (> 20MB).', 'error');
             resetInput(); return;
        }
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
              updateStatus(`Error: Unsupported file type (${file.type || '?'}). Use JPG, PNG, WEBP, BMP.`, 'error');
             resetInput(); return;
        }

        fileNameDisplay.textContent = file.name;
        currentFilenameBase = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        try {
            const arrayBuffer = await file.arrayBuffer();
            currentImageData = new Uint8Array(arrayBuffer);
            console.log(`Image loaded: ${file.name}, size: ${currentImageData.byteLength} bytes`);
            await runVtracer(); // Initial run
            if (currentSvgString) { // Enable options only if first run was successful
                toggleOptionsPanel(true);
            }
        } catch (error) {
            console.error("Error reading/processing image:", error);
            updateStatus(`Error reading image: ${error.message}`, 'error');
            resetInput();
        }
    }

    function debouncedRunVtracer() {
        if (!currentImageData || !vtracerApi) return; // Check if ready
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runVtracer, 300);
    }

    async function runVtracer() {
        if (!vtracerApi || !currentImageData) {
            console.warn("Run skipped: WASM not ready or no image data.");
            return;
        }
        if (isProcessing) {
            console.warn("Run skipped: Already processing.");
            return;
        }

        isProcessing = true;
        updateStatus('Vectorizing...', 'loading');
        downloadBtn.disabled = true;
        svgSizeInfo.textContent = '';

        // --- Gather options (ensure correct types) ---
        const options = {};
        const formData = new FormData(optionsForm);
        for (let [key, value] of formData.entries()) {
            const element = optionsForm.elements[key]; // Get form element by name
             if (element && element.type === 'range') {
                 options[key] = parseFloat(value); // Range values are numbers
            } else if (element && element.type === 'checkbox') {
                 // Skip checkbox state here, handle segment view separately
             } else {
                 options[key] = value; // Select values are strings
            }
        }
        // Don't pass UI-only options
         delete options.segment_view;

        console.log("Running vtracerApi.svg_from_image with options:", options);

        // Allow UI repaint before potentially heavy computation
        await new Promise(resolve => requestAnimationFrame(resolve));

        try {
            // --- Call WASM Function via API object ---
            currentSvgString = vtracerApi.svg_from_image(currentImageData, options);

            if (!currentSvgString || currentSvgString.length < 10) {
                throw new Error("WASM returned empty or invalid SVG data.");
            }

            // --- Update UI ---
            svgOutputDiv.innerHTML = currentSvgString;
            svgOutputDiv.classList.remove('placeholder-text');
            toggleSegmentView();

            const svgSize = new Blob([currentSvgString]).size;
            svgSizeInfo.textContent = `SVG Size: ${(svgSize / 1024).toFixed(1)} KB`;

            updateStatus('Vectorization complete.', 'success', 2000);
            downloadBtn.disabled = false;

        } catch (error) {
            console.error("VTracer WASM Execution Error:", error);
            currentSvgString = '';
            svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Vectorization Failed: ${error.message || 'See console for details.'}.<br/>Try simpler options/image.</p>`;
            updateStatus(`Error: Vectorization failed.`, 'error');
            // Keep download disabled
            downloadBtn.disabled = true;
            svgSizeInfo.textContent = '';
        } finally {
            isProcessing = false;
        }
    }

    function toggleOptionsPanel(enable) {
        const currentlyDisabled = optionsPanel.classList.contains('disabled');
        if (enable && currentlyDisabled) {
             optionsPanel.classList.remove('disabled');
             optionsOverlay.style.opacity = '0';
             optionsOverlay.style.pointerEvents = 'none';
        } else if (!enable && !currentlyDisabled) {
             optionsPanel.classList.add('disabled');
             optionsOverlay.style.opacity = '1';
             optionsOverlay.style.pointerEvents = 'all';
        }
    }

    function toggleSegmentView() {
         // Use checkbox state to toggle class
         if (segmentViewCheckbox.checked) {
            svgOutputDiv.classList.add('segment-view');
         } else {
             svgOutputDiv.classList.remove('segment-view');
         }
    }


    function handleDownload() {
        if (!currentSvgString) return;
        try {
            const svgBlob = new Blob([currentSvgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            downloadLink.href = url;
            downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
            downloadLink.click();

            URL.revokeObjectURL(url); // Clean up Object URL
            console.log("SVG Download Triggered");
        } catch (error) {
             console.error("Download Error:", error);
             updateStatus('Error preparing download.', 'error');
        }
    }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
        clearTimeout(statusClearTimer);
        statusArea.textContent = message;
        statusArea.className = `status-area ${type}`; // Applies CSS class for styling

        if (type !== 'error' && clearDelay > 0 && message !== '') {
            statusClearTimer = setTimeout(() => {
                if (statusArea.textContent === message) { // Avoid race conditions
                    updateStatus('', '');
                }
            }, clearDelay);
        }
    }

     function resetPreview() {
         svgOutputDiv.innerHTML = '<p class="placeholder-text">Upload an image to see the preview</p>';
         svgOutputDiv.classList.remove('segment-view');
         currentSvgString = '';
         downloadBtn.disabled = true;
         svgSizeInfo.textContent = '';
     }

     function resetInput() {
          imageInput.value = '';
          fileNameDisplay.textContent = 'No file chosen';
          currentImageData = null;
          toggleOptionsPanel(false);
     }

     function resetApp() {
         resetInput();
         resetPreview();
         // Maybe reset options? Or keep user's last settings? Let's keep them for now.
         // optionsForm.reset();
         // sliders.forEach(s => s.dispatchEvent(new Event('input', { bubbles: true }))); // Trigger updates if reset
         updateStatus('Ready for image.', '', 0);
     }

     function capitalizeFirstLetter(string = '') { // Add default empty string
       return string.charAt(0).toUpperCase() + string.slice(1);
     }

}); // End DOMContentLoaded