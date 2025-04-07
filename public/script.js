// public/script.js - Final Stable Version (Overlay Fix, Better Slider, No Zoom/Pan)

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
    const svgOutputWrapper = document.getElementById('svgOutputWrapper'); // Crucial wrapper
    const comparisonSlider = document.getElementById('comparisonSlider');
    const downloadLink = document.getElementById('downloadLink');
    const comparisonContentWrapper = document.querySelector('.comparison-content-wrapper'); // Get wrapper

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
    // Removed zoom/pan state: let scale = 1; let panning = false; let pointX = 0; let pointY = 0; let start = { x: 0, y: 0 };
    let currentImageDimensions = { width: 0, height: 0 };


    // --- Initial UI Setup & Element Check ---
    // Removed zoom button references from check
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, dropZone, comparisonContainer, comparisonOriginalImage, comparisonSvgLayer, svgOutputWrapper, comparisonSlider, modeSelect, colormodeSelect, resetOptionsBtn, comparisonContentWrapper, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");

    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider(); // Only setup slider


    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Comparison Image Load Listener ---
    safeAddListener(comparisonOriginalImage, 'load', () => {
        if(!comparisonOriginalImage) return;
        currentImageDimensions.width = comparisonOriginalImage.naturalWidth;
        currentImageDimensions.height = comparisonOriginalImage.naturalHeight;
        console.log("Original Dims Loaded:", currentImageDimensions);
        calculateAndApplyDimensions(); // Apply initial dimensions
    });
    safeAddListener(comparisonOriginalImage, 'error', () => { console.error("Failed to load original comparison image."); if(comparisonOriginalImage) comparisonOriginalImage.src = '#'; });


    // --- Drag and Drop ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) handleFile(files[0]); }
    if (dropZone) { dropZone.addEventListener('dragenter', handleDragEnter); dropZone.addEventListener('dragover', handleDragOver); dropZone.addEventListener('dragleave', handleDragLeave); dropZone.addEventListener('drop', handleDrop); dropZone.addEventListener('click', (e) => { if (e.target !== imageInput && !e.target.closest('button, label')) imageInput?.click(); }); }

    // --- Event Listeners Setup ---
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
    // Zoom Listeners REMOVED
    // safeAddListener(zoomInBtn, 'click', () => zoom(1.2));
    // safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.2));
    // safeAddListener(zoomResetBtn, 'click', resetZoomPan);

    // Option form change listener
    if (optionsForm) {
         optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } });
         // Slider value display updates
         optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); if (!valueDisplay || !slider) return; const updateDisplay = () => { let v=slider.value; switch(slider.id){ case 'optCornerThreshold': v+='°'; break; case 'optFilterSpeckle': v+=' px'; break; case 'optColorPrecision': v+=' bits'; break; case 'optPathPrecision': v+=' dec'; break; case 'optSpliceThreshold': v+='°'; break; case 'optSegmentLength': v=parseFloat(v).toFixed(1); break; case 'optGradientStep': v=parseFloat(v).toFixed(1); break; } valueDisplay.textContent=v; }; updateDisplay(); safeAddListener(slider, 'input', updateDisplay); });
    }
    // Window Resize Listener
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyDimensions, 150); });

    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) { /* ... same as before, including revokeObjectURL and setting comparisonOriginalImage.src ... */ }
    function validateFile(file) { /* ... same ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... */ }
    async function handleConvert(isInitial = false) {
         if (!currentFile) { updateStatus('No file selected.', 'error'); return; }
         if (!convertBtn || !downloadBtn || !copyBtn) return;

         updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; copyBtn.disabled = true;
         if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;
         const formData = new FormData(); formData.append('imageFile', currentFile);
         if (optionsForm) { /* ... same logic to append *enabled* options ... */ }
         console.log("Sending data to /convert...");
         try {
             const response = await fetch('/convert', { method: 'POST', body: formData }); const result = await response.json(); if (!response.ok) throw new Error(result.error || `Server error: ${response.status}`);
             if (result.svg) {
                  currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent; updateStatus('Vectorization Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (copyBtn) copyBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; }
                  // Apply dimensions AFTER SVG is inserted
                  if (currentImageDimensions.width > 0) setTimeout(calculateAndApplyDimensions, 50); else console.warn("Original dims not ready for applying size after conversion.");
                  resetComparisonSlider();
                 // No Zoom Reset needed
             } else throw new Error("Server response ok but no SVG data.");
         } catch (error) { /* ... same error handling ... */ }
     }
     function simulateUploadProgress(callback) { /* ... same ... */ }


    // --- Dimension Calculation ---
    function calculateAndApplyDimensions() { /* ... Keep exact same logic as before, applying size to img, svg wrapper, and content wrapper ... */ }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() { /* ... Keep exact same logic, attaching listener to comparisonSlider element ... */ }
    function resetComparisonSlider() { /* ... same ... */ }

    // --- Zoom and Pan Logic (REMOVED) ---

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { const target = event.target; if (target.tagName === 'path' && target.closest('svg')) { if (event.type === 'mouseover') target.classList.add('path-hover'); else if (event.type === 'mouseout') target.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetComparisonSlider(); /* No Zoom Reset */ updateStatus('', ''); }
    function resetAppToLanding() { currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = ''; if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; } if(comparisonOriginalImage) { comparisonOriginalImage.src = '#'; comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height='';} if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; } currentImageDimensions = { width: 0, height: 0 }; showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = ''; resetComparisonSlider(); }
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
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true; if(clearStatusToo) updateStatus('', ''); resetComparisonSlider(); if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; } }


    // --- Initial State Calls ---
    updateOptionsAvailability(); // Set initial option disabled states based on defaults

}); // End DOMContentLoaded