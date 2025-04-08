// public/script.js - Final Stable Version (Side-by-Side, Zoom Reintegrated, Wrapper Sizing, No Copy/Slider)

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
    // const svgCodeTextarea = document.getElementById('svgCode'); // REMOVED
    const downloadBtn = document.getElementById('downloadBtn');
    // const copyBtn = document.getElementById('copyBtn'); // REMOVED
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');
    // svgOutputWrapper (nested inside vectorImageWrapper) isn't strictly needed by JS now
    const downloadLink = document.getElementById('downloadLink');
    // Zoom Elements
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    // Option Controllers & Groups
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const paletteSelect = document.getElementById('optPalette'); // NEW Palette select
    const colorPrecisionInput = document.getElementById('optColorPrecision'); // Hidden input
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Keep for enabling/disabling concept
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette'); // Added Palette group

    // --- Initial Element Check ---
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, /*copyBtn removed*/, uploadNewBtn, dropZone, previewAreaWrapper, previewOriginalImage, originalImageWrapper, vectorImageWrapper, /*svgOutputWrapper maybe not needed now*/ modeSelect, colormodeSelect, resetOptionsBtn, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea, zoomInBtn, zoomOutBtn, zoomResetBtn, paletteSelect, colorPrecisionInput };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");


    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    const defaultOptions = {};
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10;
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };


    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupZoomPan();
    updateZoomButtons();
    setupNumberInputSync(); // Set up sync listeners

    // --- Original Preview Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { if (!previewOriginalImage) return; originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; console.log("Original Dims Loaded:", originalImageNaturalDims); calculateAndApplyWrapperSize(); }); // Trigger sizing when image data is ready
    safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed load original preview"); if(previewOriginalImage) previewOriginalImage.src = '#'; });

    // --- Drag and Drop ---
    function handleDragEnter(e) { /*...*/ } function handleDragOver(e) { /*...*/ } function handleDragLeave(e) { /*...*/ } function handleDrop(e) { /*...*/ }
    if (dropZone) { /* ... Add listeners ... */ }

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
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability); // Palette influences options
    safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

    // Option form change listener
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); }

    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() { if (!optionsForm) return; optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { safeAddListener(slider, 'input', (e) => { const step = parseFloat(e.target.step); numInput.value = (step < 1) ? parseFloat(e.target.value).toFixed(String(step).split('.')[1]?.length || 2) : Math.round(parseFloat(e.target.value)); /* Trigger change? No, handled by form change */ }); safeAddListener(numInput, 'input', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value)-v) > (parseFloat(slider.step)/2||0.001)) { slider.value = v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } }); safeAddListener(numInput, 'change', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)){ numInput.value=slider.value; return;} v=Math.max(min, Math.min(max, v)); numInput.value=v; if (slider.value != v) { slider.value=v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } }); /* Update slider text span (if kept) */ const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); if (!valueDisplay) return; safeAddListener(slider, 'input', ()=>{ const step=parseFloat(slider.step); let dv = slider.value; switch(slider.id){ case 'optCornerThreshold': dv+='°';break; /* ... other cases ... */ } valueDisplay.textContent=dv;}); } }); /* Palette select drives hidden precision input */ if (paletteSelect && colorPrecisionInput) { safeAddListener(paletteSelect, 'change', (e) => { colorPrecisionInput.value = e.target.value; optionsForm?.dispatchEvent(new Event('change', { bubbles: true })); console.log(`Mapped Palette->color_precision: ${e.target.value}`); }); } }


    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files?.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) { /* ... Same logic ... sets previewOriginalImage.src, calls resetZoomPan() ... */ }
    function validateFile(file) { /* ... same validation ... */ return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... */ }
    async function handleConvert(isInitial = false) {
        // ... (Start: status, disable buttons) ...
        const formData = new FormData(); formData.append('imageFile', currentFile);
        // Get options, handling palette proxy
        if (optionsForm) {
             const data = new FormData(optionsForm);
             for (let [key, value] of data.entries()) {
                 const element = optionsForm.elements[key];
                 if (element && !element.disabled && value !== '' && value !== null) {
                      if (key === 'palette_selector') { // Map proxy name
                           formData.append('color_precision', value);
                      } else { // Append others normally
                           formData.append(key, value);
                      }
                  }
             }
        }
        console.log("Sending data...");
        try {
             // ... (fetch logic) ...
             if (result.svg) {
                  // ... (Set state, update UI, enable buttons) ...
                 if (originalImageNaturalDims.width > 0) setTimeout(calculateAndApplyWrapperSize, 50);
                 if(isInitial) resetZoomPan(); // Only reset zoom on initial load
             } else { /* ... */ }
        } catch (error) { /* ... error handling ... */ }
        finally { /* ... finally block ... */ }
    }
    function simulateUploadProgress(callback) { /* ... */ }

    // --- Dimension Calculation (Sizes the WRAPPERS) ---
    function calculateAndApplyWrapperSize() { if (!previewAreaWrapper || !previewOriginalImage || !originalImageNaturalDims.width || !originalImageWrapper || !vectorImageWrapper) return; const cw=previewAreaWrapper.clientWidth; const ch=previewAreaWrapper.clientHeight; if (cw<=0 || ch<=0) return; const imgRatio=originalImageNaturalDims.width/originalImageNaturalDims.height; const contRatio=cw/ch; let tw, th; if (imgRatio>contRatio){ tw=cw; th=tw/imgRatio; } else { th=ch; tw=th*imgRatio; } tw=Math.max(1, Math.floor(tw)); th=Math.max(1, Math.floor(th)); console.log(`Applying WRAPPER dims - W: ${tw}px, H: ${th}px`); if(originalImageWrapper){ originalImageWrapper.style.width=`${tw}px`; originalImageWrapper.style.height=`${th}px`; } if(vectorImageWrapper){ vectorImageWrapper.style.width=`${tw}px`; vectorImageWrapper.style.height=`${th}px`; } }

    // --- Zoom and Pan Logic (Reinstated - Targets wrappers) ---
    function setTransform() { const v=`translate(${pointX}px, ${pointY}px) scale(${scale})`; if(originalImageWrapper)originalImageWrapper.style.transform=v; if(vectorImageWrapper)vectorImageWrapper.style.transform=v; updateZoomButtons(); }
    function setupZoomPan() { if(!previewAreaWrapper) return; const startP=(e)=>{/*...*/ panning=true; start={x:(e.clientX??e.touches[0].clientX)-pointX, y:(e.clientY??e.touches[0].clientY)-pointY}; previewAreaWrapper.classList.add('grabbing'); window.addEventListener('mousemove', panM); window.addEventListener('touchmove', panM, {passive:false}); window.addEventListener('mouseup', endP); window.addEventListener('touchend', endP);}; const panM=(e)=>{/*...*/ pointX=(e.clientX??e.touches[0].clientX)-start.x; pointY=(e.clientY??e.touches[0].clientY)-start.y; setTransform();}; const endP=()=>{/*...*/ panning=false; previewAreaWrapper.classList.remove('grabbing'); window.removeEventListener('mousemove', panM); /* etc */}; safeAddListener(previewAreaWrapper,'wheel', (e)=>{/* ... wheel zoom logic targeting scale, pointX, pointY, calls setTransform ... */},{passive:false}); safeAddListener(previewAreaWrapper,'mousedown', startP); safeAddListener(previewAreaWrapper,'touchstart', startP,{passive:false}); }
    function zoom(factor) { /* ... zoom logic calculating new scale, pointX, pointY, calling setTransform ... */ }
    function resetZoomPan() { scale=1; pointX=0; pointY=0; setTransform(); calculateAndApplyWrapperSize(); }
    function updateZoomButtons() { if(zoomInBtn)zoomInBtn.disabled=(scale>=MAX_SCALE); if(zoomOutBtn)zoomOutBtn.disabled=(scale<=MIN_SCALE); }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... same ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... same ... */ } function showAppView() { /* ... same, calls resetZoomPan */ }
    function resetAppToLanding() { /* ... same, calls resetZoomPan, clears wrapper sizes */ } function resetUploadAreaVisuals(){ /* ... same ... */ }

    // --- Conditional Options Logic (Includes Palette Group) ---
    function updateOptionsAvailability() { if (!modeSelect||!colormodeSelect||!paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); /* Keep group hidden */ toggleOptionGroup(colorPrecisionGroup,false); /* BG Group Removed */ }
    function toggleOptionGroup(groupElement, enable) { /* ... same ... */ }

    // --- Option Reset ---
    function storeDefaultOptions() { /* ... same ... */ }
    function handleResetOptions() { if (!optionsForm) return; /* ... same ... ensure palette syncs hidden precision on reset ... */ if(paletteSelect && colorPrecisionInput) colorPrecisionInput.value = paletteSelect.value; updateOptionsAvailability(); if(currentFile&&convertBtn){ /* enable btn */ } updateStatus('Options reset.', 'success', 2000); }

    // --- Download Logic ---
    function handleDownload() { /* ... same ... */ }
    // --- Copy Logic REMOVED ---

    // --- Utility ---
    let statusClearTimer; function updateStatus(m, t, d=0){/* ... */} function showLandingError(m){/* ... */} function resetResultArea(c=true){ if(svgOutputDiv){/*...*/}; /*textarea removed*/ currentSvgContent=''; if(downloadBtn)downloadBtn.disabled=true; /*copy removed*/ if(c)updateStatus(''); /* No slider reset*/ if(originalImageWrapper){/*clear style*/} if(vectorImageWrapper){/*clear style*/} }

    // --- Init Calls ---
    updateOptionsAvailability();
    updateZoomButtons();
    console.log("vectorise.me script initialized successfully (Zoom OK).");

}); // End DOMContentLoaded