// public/script.js - Stable Version (No Zoom/Pan)

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');
    const statusArea = document.getElementById('statusArea');
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const comparisonContainer = document.getElementById('comparisonContainer');
    const comparisonOriginalImage = document.getElementById('comparisonOriginalImage');
    const comparisonSvgLayer = document.getElementById('comparisonSvgLayer');
    const svgOutputWrapper = document.getElementById('svgOutputWrapper');
    const comparisonSlider = document.getElementById('comparisonSlider');
    const downloadLink = document.getElementById('downloadLink');
    const comparisonContentWrapper = document.querySelector('.comparison-content-wrapper'); // Added wrapper ref

    // Option Controllers & Groups
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');


    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};
    let isDraggingSlider = false;
    let currentImageDimensions = { width: 0, height: 0 };


    // --- Initial UI Setup ---
    // Element check (removed zoom buttons)
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, dropZone, comparisonContainer, comparisonOriginalImage, comparisonSvgLayer, svgOutputWrapper, comparisonSlider, modeSelect, colormodeSelect, resetOptionsBtn, comparisonContentWrapper };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; /* ... error logging ... */ } }
    if (missingElement) return;

    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider(); // Only setup slider now


    // --- Comparison Image Load Listener ---
    safeAddListener(comparisonOriginalImage, 'load', () => {
        if (!comparisonOriginalImage) return;
        currentImageDimensions.width = comparisonOriginalImage.naturalWidth;
        currentImageDimensions.height = comparisonOriginalImage.naturalHeight;
        console.log("Original Dims:", currentImageDimensions);
        calculateAndApplyDimensions();
    });
    safeAddListener(comparisonOriginalImage, 'error', () => {
        console.error("Failed to load original image into comparison view.");
        if(comparisonOriginalImage) comparisonOriginalImage.src = '#';
   });


    // --- Drag and Drop ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) handleFile(files[0]); }
    if (dropZone) { dropZone.addEventListener('dragenter', handleDragEnter); dropZone.addEventListener('dragover', handleDragOver); dropZone.addEventListener('dragleave', handleDragLeave); dropZone.addEventListener('drop', handleDrop); dropZone.addEventListener('click', (e) => { if (e.target !== imageInput && !e.target.closest('button, label')) imageInput?.click(); }); }


    // --- Event Listeners Setup (Removed Zoom Buttons) ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') { element.addEventListener(event, handler, options); } else if (!element) { /* Logged above */ } else { console.warn(`Invalid handler provided for event '${event}' on element`, element); } }

    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(copyBtn, 'click', handleCopy);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

    // Option form change listener (same)
    if (optionsForm) { optionsForm.addEventListener('change', () => { /* ... enable update button ... */ }); /* ... Slider value display updates ... */ }
    // Window Resize Listener (same)
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyDimensions, 150); });


    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... same ... */ }
    function handleFile(file) { /* ... same ... calls calculateAndApplyDimensions indirectly via img onload ... */ }
    function validateFile(file) { /* ... same ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... */ }
    async function handleConvert(isInitial = false) {
        // ... (start of function is same: status, disable buttons, FormData) ...
        // ENSURE to append ENABLED options only
        if (optionsForm) { /* ... logic to append only !element.disabled options ... */ }

        console.log("Sending data to /convert...");
        try {
            // ... (fetch logic, handle response) ...
            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) svgOutputDiv.innerHTML = currentSvgContent;
                // ... (update textarea, status, buttons) ...

                // --- Crucial: Apply dimensions AFTER SVG inserted ---
                 if (currentImageDimensions.width > 0) {
                     // Use timeout to allow rendering
                     setTimeout(calculateAndApplyDimensions, 50);
                 } else { console.warn("Cannot apply dimensions - original image dims missing."); }

                resetComparisonSlider(); // Reset slider position

            } else throw new Error("Server response ok but no SVG data.");
        } catch (error) { /* ... error handling ... */ }
        finally { /* ... finally block ... */ }
    }
    function simulateUploadProgress(callback) { /* ... same ... */ }


    // --- Dimension Calculation (Same as last version) ---
    function calculateAndApplyDimensions() {
         if (!comparisonContainer || !comparisonOriginalImage || !svgOutputWrapper || !currentImageDimensions.width || currentImageDimensions.width <= 0 || !comparisonContentWrapper) return;
         const containerWidth = comparisonContainer.clientWidth; const containerHeight = comparisonContainer.clientHeight;
         if (containerWidth <= 0 || containerHeight <= 0) return;
         const imgRatio = currentImageDimensions.width / currentImageDimensions.height; const containerRatio = containerWidth / containerHeight;
         let targetWidth, targetHeight;
         if (imgRatio > containerRatio) { targetWidth = containerWidth; targetHeight = targetWidth / imgRatio; }
         else { targetHeight = containerHeight; targetWidth = targetHeight * imgRatio; }
         targetWidth = Math.max(1, Math.floor(targetWidth)); targetHeight = Math.max(1, Math.floor(targetHeight));
         console.log(`Applying dimensions - Target W: ${targetWidth}px, Target H: ${targetHeight}px`);

          // Apply to image and SVG wrapper for size calculation by browser
         comparisonOriginalImage.style.width = `${targetWidth}px`; comparisonOriginalImage.style.height = `${targetHeight}px`;
         svgOutputWrapper.style.width = `${targetWidth}px`; svgOutputWrapper.style.height = `${targetHeight}px`;
          // Apply to the content wrapper to set the containing block size for centering
          comparisonContentWrapper.style.width = `${targetWidth}px`; comparisonContentWrapper.style.height = `${targetHeight}px`;
    }

    // --- Comparison Slider Logic (Listener on slider element) ---
    function setupComparisonSlider() {
        if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) return;
        let isDragging = false;
        const moveSlider = (clientX) => { const rect = comparisonContainer.getBoundingClientRect(); const x = Math.max(0, Math.min(rect.width, clientX - rect.left)); let percentage = (x / rect.width) * 100; comparisonSlider.style.left = `${percentage}%`; comparisonSvgLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`; };
        const onPointerDown = (e) => { if (e.button !== 0 && e.type !== 'touchstart') return; e.preventDefault(); e.stopPropagation(); isDragging = true; comparisonSlider.classList.add('dragging'); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); window.addEventListener('mousemove', onPointerMove); window.addEventListener('touchmove', onPointerMove, { passive: false }); window.addEventListener('mouseup', onPointerUp); window.addEventListener('touchend', onPointerUp); };
        const onPointerMove = (e) => { if (!isDragging) return; e.preventDefault(); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); };
        const onPointerUp = () => { if (!isDragging) return; isDragging = false; comparisonSlider.classList.remove('dragging'); window.removeEventListener('mousemove', onPointerMove); window.removeEventListener('touchmove', onPointerMove); window.removeEventListener('mouseup', onPointerUp); window.removeEventListener('touchend', onPointerUp); };
        // **** Listener on the slider div itself ****
        safeAddListener(comparisonSlider, 'mousedown', onPointerDown);
        safeAddListener(comparisonSlider, 'touchstart', onPointerDown, { passive: false });
    }
    function resetComparisonSlider() { if (comparisonSlider) comparisonSlider.style.left = '50%'; if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)'; }

    // --- Zoom and Pan Logic (REMOVED) ---
    // function setTransform() {} // Remove
    // function setupZoomPan() {} // Remove
    // function zoom(factor) {} // Remove
    // function resetZoomPan() {} // Remove
    // function updateZoomButtons() {} // Remove

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... same ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... same ... */ }
    function showAppView() { /* ... same, ensures conditional options updated ... */ }
    function resetAppToLanding() {
         currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = '';
         if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
         // Reset image/wrapper sizes and actual image src
         if (comparisonOriginalImage) { comparisonOriginalImage.src = '#'; comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height=''; }
         if (svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; }
         if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; }
         currentImageDimensions = { width: 0, height: 0 };
         showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = '';
         resetComparisonSlider();
         // No need to reset zoom/pan
     }
    function resetUploadAreaVisuals(){ /* ... same ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { /* ... same ... */ }
    function toggleOptionGroup(groupElement, enable) { /* ... same ... */ }

    // --- Option Reset ---
    function storeDefaultOptions() { /* ... same ... */ }
    function handleResetOptions() { /* ... same ... */ }

    // --- Download and Copy Logic ---
    function handleDownload() { /* ... same ... */ }
    function handleCopy() { /* ... same ... */ }

    // --- Utility Functions ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... same ... */ }
    function showLandingError(message){ /* ... same ... */ }
    function resetResultArea(clearStatusToo = true) {
         if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); }
         if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = '';
         if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true;
         if(clearStatusToo) updateStatus('', '');
         resetComparisonSlider();
         // Reset wrapper/content size when clearing result
         if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; }
         if(comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; }
         // Don't reset original image size here, only on full reset/new file
     }

    // --- Initial State Calls ---
    updateOptionsAvailability(); // Set initial option disabled states based on defaults

}); // End DOMContentLoaded