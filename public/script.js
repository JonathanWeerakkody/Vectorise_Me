// --- Import ONLY the init function initially ---
// We trust 'init' to load everything else, including the _bg files and the wasm binary.
import initVTracer from './wasm/vtracer_webapp.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // (Keep all element references the same as before)
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
    // We need to get the API functions AFTER init runs successfully
    let vtracer_svg_from_image = null;
    let vtracer_get_version = null;
    let currentImageData = null;
    let currentFilenameBase = 'vectorised-image';
    let isProcessing = false;
    let currentSvgString = '';
    let wasmInitialized = false; // Track initialization state

    // --- Debounce Timer ---
    let debounceTimer;

    // --- Initialization ---
    async function initializeWasm() {
        try {
            updateStatus('Initializing Vectorizer...', 'loading');
            toggleOptionsPanel(false);

            // --- Call the Default Export init function ---
            // Pass the URL path to the WASM binary file.
            // 'initVTracer' handles fetching and setting up WASM and JS bindings.
            const instance = await initVTracer('/wasm/vtracer_webapp_bg.wasm');

            // --- Access API functions AFTER initialization ---
            // Check the exports of the 'instance' or if they become globally available
            // or attached to the imported 'initVTracer' object itself AFTER init runs.
            // Let's assume they might be attached to the 'instance.exports' or become
            // directly available via the original module import IF init modified it.
            // This depends heavily on the specific wasm-bindgen output structure.

            // Attempt 1: Check instance exports (if init returns an instance with exports)
             if (instance && instance.exports && instance.exports.svg_from_image) {
                vtracer_svg_from_image = instance.exports.svg_from_image;
                vtracer_get_version = instance.exports.get_version;
             } else {
                 // Attempt 2: Check if init modified the original import object
                 // Need to re-import or access differently? This is tricky without seeing the exact
                 // structure after init. Let's try assuming the functions defined within
                 // vtracer_webapp_bg.js are now properly linked and callable via the initial
                 // import scope IF the bundler/loader correctly handles side effects.

                 // For simplicity, let's dynamically import again AFTER init
                 // This ensures we get the module scope *after* initialization.
                  const wasmApi = await import('./wasm/vtracer_webapp.js');
                  if (wasmApi.svg_from_image) {
                     vtracer_svg_from_image = wasmApi.svg_from_image;
                     vtracer_get_version = wasmApi.get_version;
                 } else {
                      // Attempt 3: Check if they were attached to the init function itself
                       if(initVTracer.svg_from_image) {
                           vtracer_svg_from_image = initVTracer.svg_from_image;
                            vtracer_get_version = initVTracer.get_version;
                        } else {
                             throw new Error("Could not find WASM API functions (svg_from_image) after initialization.");
                         }
                 }

             }

            if (!vtracer_svg_from_image) {
                 throw new Error("svg_from_image function is not available after WASM init.");
            }


            const version = vtracer_get_version ? vtracer_get_version() : 'N/A';
            console.log(`VTracer WASM Initialized Successfully! Version reported: ${version}`);
            wasmInitialized = true; // Mark as initialized
            updateStatus('Ready for image.', 'success', 2000);

        } catch (error) {
            console.error("WASM Initialization Failed:", error);
            let errorMsg = 'FATAL: Error loading vectorizer. Please refresh.';
            // ... (keep more specific error messages) ...
            if (error.message.includes('instantiate')) {
                 errorMsg = 'FATAL: Failed to instantiate WASM. Check file paths or browser compatibility.';
            }
            updateStatus(errorMsg, 'error');
            toggleOptionsPanel(false);
        }
    }

    // --- Event Listeners & Setup ---
    // (Keep all slider, select, checkbox, input, button listeners the same)
        // Sliders & Value Displays (Attach listeners)
    optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplayId = `${slider.id}Value`;
        const valueDisplay = document.getElementById(valueDisplayId);
        if (!valueDisplay) return;
        const updateDisplay = () => { /* ... same as before ... */ };
        updateDisplay();
        slider.addEventListener('input', updateDisplay);
        slider.addEventListener('input', debouncedRunVtracer);
    });
    // Select dropdowns
    optionsForm.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', runVtracer);
    });
    // Segment view checkbox
    segmentViewCheckbox.addEventListener('change', toggleSegmentView);
    // File input and Download button
    imageInput.addEventListener('change', handleImageUpload);
    downloadBtn.addEventListener('click', handleDownload);

    // --- Start Initialization ---
    initializeWasm();


    // --- Core Functions ---

    // handleImageUpload function (Keep exactly the same as the previous version)
     async function handleImageUpload(event) {
         /* ... Same code as previous version ... */
        const file = event.target.files[0];
        if (!file) { /* reset */ return; }
        resetPreview(); updateStatus('Reading...', 'loading'); toggleOptionsPanel(false);
        if (file.size > 20*1024*1024) { /* error */ return; }
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) { /* error */ return; }
        fileNameDisplay.textContent = file.name;
        currentFilenameBase = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        try {
            const arrayBuffer = await file.arrayBuffer(); currentImageData = new Uint8Array(arrayBuffer);
            console.log(`Image loaded: ${file.name}, size: ${currentImageData.byteLength} bytes`);
            await runVtracer();
            if (currentSvgString) { toggleOptionsPanel(true); } // Enable options *after* successful first run
        } catch(error){ /* error handling */ resetInput(); }
     }

    function debouncedRunVtracer() {
        if (!currentImageData || !wasmInitialized) return; // Check init flag
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runVtracer, 300);
    }

    async function runVtracer() {
        // --- Use the vtracer_svg_from_image stored after init ---
        if (!wasmInitialized || !currentImageData || !vtracer_svg_from_image) {
            console.warn("Run skipped: WASM not ready, no image data, or API function missing.");
            return;
        }
        if (isProcessing) {
            console.warn("Run skipped: Already processing.");
            return;
        }
        // ... (rest of the function is the SAME as previous version) ...
        isProcessing = true; updateStatus('Vectorizing...', 'loading'); /*...*/
        const options = {}; /* gather options */
         delete options.segment_view;
        console.log("Running vtracer_svg_from_image with options:", options);
        await new Promise(resolve => requestAnimationFrame(resolve));
        try {
            // --- Call WASM via the stored function reference ---
             currentSvgString = vtracer_svg_from_image(currentImageData, options);

             if (!currentSvgString || currentSvgString.length < 10) {/* error */}
             svgOutputDiv.innerHTML = currentSvgString; /*...*/
             toggleSegmentView();
             const svgSize = new Blob([currentSvgString]).size; /*...*/
             svgSizeInfo.textContent = `SVG Size: ${(svgSize / 1024).toFixed(1)} KB`;
             updateStatus('Vectorization complete.', 'success', 2000); downloadBtn.disabled = false;
        } catch (error) { /* ... error handling same as before ... */ }
         finally { isProcessing = false; }
    }

    // toggleOptionsPanel function (Keep exactly the same)
    function toggleOptionsPanel(enable) { /* ... same code ... */ }

    // toggleSegmentView function (Keep exactly the same)
     function toggleSegmentView() { /* ... same code ... */ }

    // handleDownload function (Keep exactly the same)
     function handleDownload() { /* ... same code ... */ }

    // --- Utility Functions ---
    // updateStatus (Keep same)
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... same code ... */ }
    // resetPreview (Keep same)
     function resetPreview() { /* ... same code ... */ }
    // resetInput (Keep same)
     function resetInput() { /* ... same code ... */ }
    // resetApp (Keep same)
     function resetApp() { /* ... same code ... */ }
    // capitalizeFirstLetter (Keep same)
     function capitalizeFirstLetter(string = '') { /* ... same code ... */ }

}); // End DOMContentLoaded
