// public/script.js - Final Version (Palette, Input Sync, Zoom, NO BG/Slider/Copy)

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // ... (Get Landing/App Views, Buttons: Upload, Start, Convert, Reset, UploadNew, Download) ...
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
    // const svgCodeTextarea = document.getElementById('svgCode'); // REMOVED
    const downloadBtn = document.getElementById('downloadBtn');
    // const copyBtn = document.getElementById('copyBtn'); // REMOVED
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper'); // Wrapper for IMG
    const vectorImageWrapper = document.getElementById('vectorImageWrapper'); // Wrapper for SVG structure
    // svgOutputWrapper is inside vectorImageWrapper, no longer sized directly by JS
    const downloadLink = document.getElementById('downloadLink');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');

    // Option Controllers & Groups
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const paletteSelect = document.getElementById('optPalette'); // NEW
    const colorPrecisionInput = document.getElementById('optColorPrecision'); // Hidden input
    // Group element refs (same as before)
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Parent of hidden input
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette'); // Parent of palette select


    // --- Initial Element Check ---
    // Added paletteSelect to critical checks
    const criticalElementRefs = { /* ..., modeSelect, colormodeSelect, paletteSelect, colorPrecisionInput, resetOptionsBtn, ... zoom buttons */ };
    // ... (Run check loop as before) ...


    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    const defaultOptions = {}; // To store initial values from the form
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10;
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };

    // --- Helper ---
    function safeAddListener(el, ev, fn, opts) { if (el && typeof fn === 'function') el.addEventListener(ev, fn, opts); }

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupNumberInputSync(); // Setup slider/number links
    setupZoomPan();
    updateZoomButtons();

    // --- Original Preview Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => {
         if (!previewOriginalImage) return;
         originalImageNaturalDims.width = previewOriginalImage.naturalWidth;
         originalImageNaturalDims.height = previewOriginalImage.naturalHeight;
         console.log("Original Dims Loaded:", originalImageNaturalDims);
         // Calculate and apply initial size to wrappers
         calculateAndApplyWrapperSize();
     });
     safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed original img load"); if (previewOriginalImage) previewOriginalImage.src = '#'; });

    // --- Drag and Drop ---
    // ... (Keep exact same drag/drop handlers and listeners for dropZone) ...

    // --- Event Listeners ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability); // Update when palette changes
    safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
    // Option form change listener enables update button
    if (optionsForm) optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } });

    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() {
        if (!optionsForm) return;
        optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
             const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId);
             if (!numInput) return; // Skip if no corresponding number input

             // Sync Slider TO Number Input
             safeAddListener(slider, 'input', (e) => { const step = parseFloat(e.target.step); numInput.value = (step < 1) ? parseFloat(e.target.value).toFixed(String(step).split('.')[1]?.length || 2) : Math.round(parseFloat(e.target.value)); });
             // Sync Number Input TO Slider
             safeAddListener(numInput, 'input', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value) - v) > (parseFloat(slider.step)/2||0.001)) { slider.value = v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } });
              // Sync on number input 'change' (blur/enter)
             safeAddListener(numInput, 'change', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)){ numInput.value=slider.value; return;} v=Math.max(min, Math.min(max, v)); numInput.value=v; if (slider.value != v) { slider.value = v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } });
             // Also update the text display span when slider value changes
              const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); if (!valueDisplay) return; safeAddListener(slider, 'input', ()=>{ const step=parseFloat(slider.step); let dv = slider.value; switch(slider.id){ case 'optCornerThreshold': dv+='°';break; case 'optFilterSpeckle': dv+=' px';break; /*case 'optColorPrecision': dv+=' bits';break;*/ case 'optPathPrecision': dv+=' dec';break; case 'optSpliceThreshold': dv+='°';break; case 'optSegmentLength': dv=parseFloat(dv).toFixed(1); break; case 'optGradientStep': dv=parseFloat(dv).toFixed(1);break;} valueDisplay.textContent=dv;});
         });
         // Link Palette Selector to Hidden Color Precision Input
          if (paletteSelect && colorPrecisionInput) {
             safeAddListener(paletteSelect, 'change', (e) => {
                 colorPrecisionInput.value = e.target.value; // Update hidden input's value
                 // Potentially trigger change on optionsForm if needed for other logic
                  optionsForm?.dispatchEvent(new Event('change', { bubbles: true }));
                 console.log(`Mapped Palette Select [${e.target.value}] to color_precision`);
             });
         }
     }

    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files?.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) { if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const vError = validateFile(file); if (vError) { showLandingError(vError); resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); originalImageNaturalDims={width:0,height:0}; if(originalImageWrapper){ originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; } if(vectorImageWrapper){ vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; } try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { /* Error */ resetAppToLanding(); return; } if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); resetZoomPan(); }
    function validateFile(file) { if (!file) return "No file."; if (file.size > 15*1024*1024) return 'Error: File > 15MB.'; if (!['image/jpeg','image/png','image/webp','image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; if(uploadProgress) uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) {
         if (!currentFile) return;
         updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading');
         if(convertBtn) convertBtn.disabled = true; if(convertBtn) convertBtn.textContent = 'Working...'; if(downloadBtn) downloadBtn.disabled = true; /* copyBtn removed */
         if(svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;
         const formData = new FormData(); formData.append('imageFile', currentFile);
         if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') { formData.append(key, value); } } } // Exclude proxy selector
         console.log("Sending data...");
         try {
             const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error: ${res.status}`);
             if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) svgOutputDiv.innerHTML = currentSvgContent; /* No textarea */ updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; /* No copyBtn */ if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; } if (originalImageNaturalDims.width > 0) setTimeout(calculateAndApplyWrapperSize, 50); else console.warn("Original dims missing after convert."); if(isInitial) resetZoomPan(); } else throw new Error("No SVG data.");
         } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error'); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; }
     }
     function simulateUploadProgress(callback) { /* ... same ... */ }

    // --- Dimension Calculation ---
    function calculateAndApplyWrapperSize() { if (!previewAreaWrapper || !previewOriginalImage || !originalImageNaturalDims.width || originalImageNaturalDims.width <= 0 || !originalImageWrapper || !vectorImageWrapper) { return; } const cw = previewAreaWrapper.clientWidth; const ch = previewAreaWrapper.clientHeight; if (cw <= 0 || ch <= 0) return; const imgRatio = originalImageNaturalDims.width / originalImageNaturalDims.height; const contRatio = cw / ch; let tw, th; if (imgRatio > contRatio) { tw = cw; th = tw / imgRatio; } else { th = ch; tw = th * imgRatio; } tw = Math.max(1, Math.floor(tw)); th = Math.max(1, Math.floor(th)); console.log(`Applying WRAPPER dimensions - W: ${tw}px, H: ${th}px`); if(originalImageWrapper) { originalImageWrapper.style.width = `${tw}px`; originalImageWrapper.style.height = `${th}px`; } if(vectorImageWrapper) { vectorImageWrapper.style.width = `${tw}px`; vectorImageWrapper.style.height = `${th}px`; } }

    // --- Zoom and Pan Logic ---
    function setTransform() { const transformValue = `translate(${pointX}px, ${pointY}px) scale(${scale})`; if(originalImageWrapper) originalImageWrapper.style.transform = transformValue; if(vectorImageWrapper) vectorImageWrapper.style.transform = transformValue; updateZoomButtons(); }
    function setupZoomPan() { /* ... keep same zoom/pan setup logic using previewAreaWrapper ... */ }
    function zoom(factor) { /* ... keep same zoom logic with clamping ... */ }
    function resetZoomPan() { scale = 1; pointX = 0; pointY = 0; setTransform(); calculateAndApplyWrapperSize(); } // Recalc size on reset
    function updateZoomButtons() { if (zoomInBtn) zoomInBtn.disabled = (scale >= MAX_SCALE); if (zoomOutBtn) zoomOutBtn.disabled = (scale <= MIN_SCALE); }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... same ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... */ } function showAppView() { /* ... calls resetZoomPan ... */ } function resetAppToLanding() { /* ... calls resetZoomPan, clears image src, wrapper styles ... */ } function resetUploadAreaVisuals(){ /* ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() {
        if (!modeSelect || !colormodeSelect || !paletteSelect) return;
        const currentMode = modeSelect.value; const currentColorMode = colormodeSelect.value; const isSpline = currentMode === 'spline'; const isPixel = currentMode === 'pixel'; const isColor = currentColorMode === 'color';
        toggleOptionGroup(splineThresholdGroup, isSpline); toggleOptionGroup(spliceThresholdGroup, isSpline); toggleOptionGroup(segmentLengthGroup, isSpline); toggleOptionGroup(cornerThresholdGroup, !isPixel);
        toggleOptionGroup(hierarchicalGroup, isColor); toggleOptionGroup(gradientStepGroup, isColor);
        toggleOptionGroup(paletteGroup, isColor); // Show palette select only in color mode
        toggleOptionGroup(colorPrecisionGroup, false); // Keep actual precision hidden/disabled conceptually
         // BG removal group removed
    }
    function toggleOptionGroup(groupElement, enable) { /* ... same ... */ }

    // --- Option Reset ---
    function storeDefaultOptions() { /* ... same ... captures initial form state */ }
    function handleResetOptions() { if (!optionsForm) return; for (const key in defaultOptions) { const el = optionsForm.elements[key]; if (el) { if(el.type === 'checkbox') el.checked = (defaultOptions[key] === 'true' || defaultOptions[key] === true); else el.value = defaultOptions[key]; if (el.type === 'range' || el.type === 'number' || el.tagName === 'SELECT') el.dispatchEvent(new Event('input', {bubbles:true}));}} /* Need to ensure palette also updates hidden input */ if(paletteSelect && colorPrecisionInput) colorPrecisionInput.value = paletteSelect.value; updateOptionsAvailability(); if(currentFile&&convertBtn){ convertBtn.disabled=false; convertBtn.textContent='Update Vectorization';} updateStatus('Options reset.', 'success', 2000); }

    // --- Download Logic ---
    function handleDownload() { /* ... same ... */ }
    // --- Copy Logic REMOVED ---

    // --- Utility Functions ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... same ... */ }
    function showLandingError(message){ /* ... same ... */ }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } /* no text area */ currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; /* no copy btn */ if(clearStatusToo) updateStatus('', ''); /* no slider reset */ if(originalImageWrapper) { originalImageWrapper.style.width=''; originalImageWrapper.style.height='';} if(vectorImageWrapper) { vectorImageWrapper.style.width=''; vectorImageWrapper.style.height='';} /* Clear explicit sizes */ }

    // --- Initial State Calls ---
    updateOptionsAvailability();
    updateZoomButtons(); // Init zoom buttons
    console.log("vectorise.me script initialized successfully (Palette, Zoom).");

}); // End DOMContentLoaded