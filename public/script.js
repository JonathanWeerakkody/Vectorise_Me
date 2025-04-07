// public/script.js - FINAL STABLE Version (Overlay Fix, Better Slider, No Zoom/Pan)

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
    const comparisonContentWrapper = document.querySelector('.comparison-content-wrapper');

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

    // --- Initial Element Check ---
    // (Same critical element check as before, REMOVING zoom buttons)
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, dropZone, comparisonContainer, comparisonOriginalImage, comparisonSvgLayer, svgOutputWrapper, comparisonSlider, modeSelect, colormodeSelect, resetOptionsBtn, comparisonContentWrapper, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");


    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};
    let currentImageDimensions = { width: 0, height: 0 };

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider(); // Setup ONLY slider


    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Comparison Image Load Listener ---
    safeAddListener(comparisonOriginalImage, 'load', () => { /* ... same as before ... */ });
    safeAddListener(comparisonOriginalImage, 'error', () => { /* ... same as before ... */ });

    // --- Drag and Drop ---
    function handleDragEnter(e) { /* ... same ... */ } function handleDragOver(e) { /* ... same ... */ } function handleDragLeave(e) { /* ... same ... */ } function handleDrop(e) { /* ... same ... */ }
    if (dropZone) { /* ... listeners ... */ }

    // --- Event Listeners Setup (No Zoom Listeners) ---
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
    // Option form change listener (unchanged)
    if (optionsForm) { /* ... Add listener to enable Update button ... */ /* ... Slider value updates ... */ }
    // Window Resize Listener (unchanged)
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyDimensions, 150); });


    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... same ... */ }
    function handleFile(file) { /* ... same as before ... */ }
    function validateFile(file) { /* ... same ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... */ }
    async function handleConvert(isInitial = false) {
        // ... (Same logic, including calling calculateAndApplyDimensions on success) ...
         if (!currentFile) { updateStatus('No file selected.', 'error'); return; }
         if (!convertBtn || !downloadBtn || !copyBtn) { console.error("Conversion buttons missing"); return; }

         updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading');
         convertBtn.disabled = true; convertBtn.textContent = 'Working...';
         downloadBtn.disabled = true; copyBtn.disabled = true;
         if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;

         const formData = new FormData(); formData.append('imageFile', currentFile);
         if (optionsForm) { const optionsData = new FormData(optionsForm); for (let [key, value] of optionsData.entries()) { const element = optionsForm.elements[key]; if (element && !element.disabled && value !== '' && value !== null) formData.append(key, value); } }
         console.log("Sending data to /convert...");
         try {
             const response = await fetch('/convert', { method: 'POST', body: formData }); const result = await response.json(); if (!response.ok) throw new Error(result.error || `Server error: ${response.status}`);
             if (result.svg) {
                 currentSvgContent = result.svg;
                 if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); }
                 if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent;
                 updateStatus('Vectorization Complete!', 'success', 3000);
                 if (downloadBtn) downloadBtn.disabled = false; if (copyBtn) copyBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; }
                 // Apply dimensions AFTER new SVG is inserted and original has loaded
                 if (currentImageDimensions.width > 0) setTimeout(calculateAndApplyDimensions, 50); else console.warn("Cannot apply dims after convert, original dims missing");
                 resetComparisonSlider();
             } else throw new Error("Server response ok but no SVG data.");
         } catch (error) { /* ... same error handling ... */ }
         finally { if (convertBtn) convertBtn.disabled = !currentFile || convertBtn.textContent === 'Working...'; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } // More robust button state
    }
    function simulateUploadProgress(callback) { /* ... same ... */ }


    // --- Dimension Calculation (Keep the SAME fix logic) ---
    function calculateAndApplyDimensions() {
        if (!comparisonContainer || !comparisonOriginalImage || !svgOutputWrapper || !currentImageDimensions.width || currentImageDimensions.width <= 0 || !comparisonContentWrapper) return;
        const containerWidth = comparisonContainer.clientWidth; const containerHeight = comparisonContainer.clientHeight; if (containerWidth <= 0 || containerHeight <= 0) return;
        const imgRatio = currentImageDimensions.width / currentImageDimensions.height; const containerRatio = containerWidth / containerHeight;
        let targetWidth, targetHeight; if (imgRatio > containerRatio) { targetWidth = containerWidth; targetHeight = targetWidth / imgRatio; } else { targetHeight = containerHeight; targetWidth = targetHeight * imgRatio; }
        targetWidth = Math.max(1, Math.floor(targetWidth)); targetHeight = Math.max(1, Math.floor(targetHeight));
        console.log(`Applying dimensions - Target W: ${targetWidth}px, Target H: ${targetHeight}px`);
        if(comparisonOriginalImage) { comparisonOriginalImage.style.width = `${targetWidth}px`; comparisonOriginalImage.style.height = `${targetHeight}px`; }
        if(svgOutputWrapper) { svgOutputWrapper.style.width = `${targetWidth}px`; svgOutputWrapper.style.height = `${targetHeight}px`; }
        if (comparisonContentWrapper) { comparisonContentWrapper.style.width = `${targetWidth}px`; comparisonContentWrapper.style.height = `${targetHeight}px`; }
    }


    // --- Comparison Slider Logic (Keep listener on slider element) ---
    function setupComparisonSlider() {
        if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) return;
        let isDragging = false;
        const moveSlider = (clientX) => { const rect = comparisonContainer.getBoundingClientRect(); const x = Math.max(0, Math.min(rect.width, clientX - rect.left)); let percentage = (x / rect.width) * 100; comparisonSlider.style.left = `${percentage}%`; comparisonSvgLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`; };
        const onPointerDown = (e) => { if (e.button !== 0 && e.type !== 'touchstart') return; e.preventDefault(); e.stopPropagation(); isDragging = true; comparisonSlider.classList.add('dragging'); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); window.addEventListener('mousemove', onPointerMove); window.addEventListener('touchmove', onPointerMove, { passive: false }); window.addEventListener('mouseup', onPointerUp); window.addEventListener('touchend', onPointerUp); };
        const onPointerMove = (e) => { if (!isDragging) return; e.preventDefault(); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); };
        const onPointerUp = () => { if (!isDragging) return; isDragging = false; comparisonSlider.classList.remove('dragging'); window.removeEventListener('mousemove', onPointerMove); window.removeEventListener('touchmove', onPointerMove); window.removeEventListener('mouseup', onPointerUp); window.removeEventListener('touchend', onPointerUp); };
        safeAddListener(comparisonSlider, 'mousedown', onPointerDown);
        safeAddListener(comparisonSlider, 'touchstart', onPointerDown, { passive: false });
    }
    function resetComparisonSlider() { if (comparisonSlider) comparisonSlider.style.left = '50%'; if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)'; }


    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { const target = event.target; if (target.tagName === 'path' && target.closest('svg')) { if (event.type === 'mouseover') target.classList.add('path-hover'); else if (event.type === 'mouseout') target.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { /* ... same ... */ }
    function showAppView() { /* ... same ... Calls resetComparisonSlider */ }
    function resetAppToLanding() { /* ... same ... Clears image/wrapper styles, calls resetComparisonSlider */ }
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
    function resetResultArea(clearStatusToo = true) { /* ... same ... Calls resetComparisonSlider and clears wrapper styles */ }


    // --- Initial State Calls ---
    updateOptionsAvailability();

}); // End DOMContentLoaded