// public/script.js - Multi-Page Logic (App + Contact Form) - Preset Updated

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // App View Elements (Might not exist on all pages)
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
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const paletteSelect = document.getElementById('optPalette');
    const colorPrecisionInput = document.getElementById('optColorPrecision');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette');
    const presetSelect = document.getElementById('presetSelect');
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');
    const loadOptionsBtn = document.getElementById('loadOptionsBtn');
    const optionsFileInput = document.getElementById('optionsFileInput');

    // Contact Form Elements (Only on contact.html)
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    const defaultOptions = {}; // Only relevant for app page
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10; // App page only
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 }; // App page only
    let originalImageNaturalDims = { width: 0, height: 0 }; // App page only

    // --- Preset Definitions (Renamed & Reviewed) ---
     const presets = [
        {
            name: "General / Balanced", // The original default settings captured at startup
            options: { /* Populated by storeDefaultOptions */ }
        },
        {
            name: "Pixel Art",
            options: {
                color_mode: "color", hierarchical: "stacked", filter_speckle: "0",
                palette_selector: "8", color_precision: "8", mode: "pixel", gradient_step: "0",
                corner_threshold: "60", path_precision: "3", spline_threshold: "0.75",
                splice_threshold: "45", segment_length: "4"
            }
        },
        {
            name: "Technical Drawing / Blueprint",
            options: {
                color_mode: "bw", filter_speckle: "2",
                mode: "polygon", corner_threshold: "60", path_precision: "3",
                // Default other fields
                hierarchical: "stacked", palette_selector: "6", color_precision: "6", gradient_step: "2",
                spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
            }
        },
        {
            name: "Illustration / Graphic", // Was Cityscape
            options: {
                color_mode: "color", hierarchical: "stacked", filter_speckle: "4",
                palette_selector: "8", color_precision: "8", gradient_step: "5",
                mode: "spline", corner_threshold: "60", path_precision: "3",
                spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
            }
        },
        // ***** MODIFIED PRESET BELOW *****
        {
            name: "Clipart / Logo",
            options: {
                color_mode: "color", hierarchical: "stacked", filter_speckle: "1", // Very low speckle
                palette_selector: "6", color_precision: "6", // Standard detail (up to 64 colors)
                gradient_step: "0", // Disable gradients
                mode: "spline", corner_threshold: "80", // Favor sharper corners slightly
                path_precision: "3", spline_threshold: "0.75", splice_threshold: "45",
                segment_length: "4" // Default segment length
            }
        },
        // ***** END MODIFIED PRESET *****
        {
            name: "Cartoon / Flat Style", // Was Landscape, adjusted
            options: {
                color_mode: "color", hierarchical: "stacked", filter_speckle: "2",
                palette_selector: "5", color_precision: "5",
                gradient_step: "1",
                mode: "spline", corner_threshold: "60", path_precision: "3",
                spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
            }
        },
        {
            name: "Photograph", // Was Photo
            options: {
                color_mode: "color", hierarchical: "stacked", filter_speckle: "6",
                palette_selector: "8", color_precision: "8", gradient_step: "8",
                mode: "spline", corner_threshold: "100",
                 path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
            }
        }
    ];


    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element && event !== 'DOMContentLoaded' && event !== 'resize') console.warn(`Element not found for listener: ${event}`); } // Adjusted warning

    // --- Initial UI Setup ---
    // Check if we are on the main app page (where landingView exists)
    if (landingView || appView) {
        if (landingView) showLandingView(); // Show landing if it exists
        if (optionsForm) { // Run setup only if options form exists
            updateOptionsAvailability();
            storeDefaultOptions();
            populatePresetSelect();
            setupNumberInputSync();
            optionsForm.addEventListener('change', handleOptionsFormChange);
        }
         if (previewAreaWrapper) setupZoomPan();
         if (zoomInBtn) updateZoomButtons(); // Needs zoomInBtn


        // Drag and Drop Listeners (only if dropZone exists)
        if (dropZone) { dropZone.addEventListener('dragenter', handleDragEnter); dropZone.addEventListener('dragover', handleDragOver); dropZone.addEventListener('dragleave', handleDragLeave); dropZone.addEventListener('drop', handleDrop); dropZone.addEventListener('click', (e) => { if (imageInput && e.target !== imageInput && !e.target.closest('button, label')) imageInput.click(); }); }

        // App Event Listeners Setup (Check for element existence)
        safeAddListener(imageInput, 'change', handleFileSelectChange);
        safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
        safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
        safeAddListener(convertBtn, 'click', () => handleConvert(false));
        safeAddListener(downloadBtn, 'click', handleDownload);
        safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
        safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
        safeAddListener(presetSelect, 'change', handlePresetChange);
        safeAddListener(saveOptionsBtn, 'click', handleSaveOptions);
        safeAddListener(loadOptionsBtn, 'click', () => optionsFileInput?.click());
        safeAddListener(optionsFileInput, 'change', handleLoadOptionsFile);
        safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
        safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
        safeAddListener(zoomResetBtn, 'click', resetZoomPan);
        safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
        safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

        // Original Preview Image Load Listener
        safeAddListener(previewOriginalImage, 'load', () => { if (!previewOriginalImage) return; originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; calculateAndApplyWrapperSize(); });
        safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed load original preview"); if(previewOriginalImage) previewOriginalImage.src = '#'; });

         console.log("vectorise.me script initialized (App Mode).");
    } else {
        console.log("vectorise.me script initialized (Static Page Mode).");
    }

    // --- Contact Form Logic (Only runs if form exists) ---
    if (contactForm) {
        safeAddListener(contactForm, 'submit', handleContactFormSubmit);
        console.log("Contact form listeners added.");
    }

     // --- Global Listeners (like resize) ---
     let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyWrapperSize, 150); }); // calculateAndApplyWrapperSize checks for elements internally


    // --- App Specific Functions ---
    function handleOptionsFormChange() {
        if (paletteSelect && colorPrecisionInput) { colorPrecisionInput.value = paletteSelect.value; }
        if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; }
        updateOptionsAvailability(); // Need to update enabled/disabled state on any change
        // Deselect preset only if the change wasn't *triggered* by selecting a preset initially
        // This basic listener can't easily know the trigger, so manual changes *will* deselect.
        resetPresetSelection();
    }
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer?.files; if (files && files.length > 0) handleFile(files[0]); }
    function setupNumberInputSync() { if (!optionsForm) return; optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { safeAddListener(slider, 'input', (e) => { const step = parseFloat(e.target.step); numInput.value = (step < 1) ? parseFloat(e.target.value).toFixed(String(step).split('.')[1]?.length || 2) : String(Math.round(parseFloat(e.target.value))); }); safeAddListener(numInput, 'input', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value)-v) > (parseFloat(slider.step)/2||0.001)) { slider.value = String(v); slider.dispatchEvent(new Event('input',{bubbles:true})); } }); } }); }
    function handleFileSelectChange(event) { if (event.target.files?.length > 0) handleFile(event.target.files[0]); else if (landingView) resetAppToLanding(); }
    function handleFile(file) { if (!file || (!landingView && !appView)) { if (landingView) resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const vError = validateFile(file); if (vError) { showLandingError(vError); if (landingView) resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; originalImageNaturalDims={width:0,height:0}; if(originalImageWrapper){ originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; originalImageWrapper.style.transform='';} if(vectorImageWrapper){ vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; vectorImageWrapper.style.transform='';} try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { updateStatus(`Error creating object URL: ${e.message}`, 'error', 0, !!appView); } if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); resetZoomPan(); }
    function validateFile(file) { if (!file) return "No file."; if (file.size > 15*1024*1024) return 'Error: File > 15MB.'; if (!['image/jpeg','image/png','image/webp','image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn || !appView) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; if(uploadProgress) uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) { if (!currentFile || !convertBtn || !downloadBtn || !appView) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading', 0, true); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`; const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') { formData.append(key, value); } } } console.log("Sending data:", Object.fromEntries(formData)); try { const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) { throw new Error(result.error || `Server error: ${res.status}`); } if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } updateStatus('Complete!', 'success', 3000, true); if (downloadBtn) downloadBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; } if (originalImageNaturalDims.width > 0) setTimeout(calculateAndApplyWrapperSize, 50); else console.warn("Orig dims missing after convert."); if(isInitial) resetZoomPan(); } else { throw new Error("No SVG data received from server."); } } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error', 0, true); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } }
    function simulateUploadProgress(callback) { if (!uploadProgress || !progressBar ) return; let p = 0; progressBar.style.width = `0%`; const i = setInterval(() => { p += Math.random()*15+10; if (p>=100){ p=100; clearInterval(i); progressBar.style.width=`100%`; setTimeout(callback,200); } else { progressBar.style.width=`${p}%`; } }, 80); }
    function calculateAndApplyWrapperSize() { if (!previewAreaWrapper || !previewOriginalImage || !originalImageWrapper || !vectorImageWrapper) return; if (originalImageNaturalDims.width === 0 && previewOriginalImage.naturalWidth > 0) { originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; } if (!originalImageNaturalDims.width) return; const cw=previewAreaWrapper.clientWidth; const ch=previewAreaWrapper.clientHeight; if (cw<=0 || ch<=0) return; const imgRatio=originalImageNaturalDims.width/originalImageNaturalDims.height; const contRatio=cw/ch; let tw, th; if (imgRatio>contRatio){ tw=cw; th=tw/imgRatio; } else { th=ch; tw=th*imgRatio; } tw=Math.max(1, Math.floor(tw)); th=Math.max(1, Math.floor(th)); originalImageWrapper.style.width=`${tw}px`; originalImageWrapper.style.height=`${th}px`; vectorImageWrapper.style.width=`${tw}px`; vectorImageWrapper.style.height=`${th}px`; }
    function setTransform() { if (!originalImageWrapper || !vectorImageWrapper) return; const v=`translate(${pointX}px, ${pointY}px) scale(${scale})`; originalImageWrapper.style.transform=v; vectorImageWrapper.style.transform=v; updateZoomButtons(); }
    function setupZoomPan() { if (!previewAreaWrapper) return; const startP=(e)=>{if(e.button!==0&&e.type!=='touchstart')return; e.preventDefault(); panning=true; start={x:(e.clientX??e.touches[0].clientX)-pointX, y:(e.clientY??e.touches[0].clientY)-pointY}; previewAreaWrapper.classList.add('grabbing'); window.addEventListener('mousemove', panM); window.addEventListener('touchmove', panM, {passive:false}); window.addEventListener('mouseup', endP); window.addEventListener('touchend', endP);}; const panM=(e)=>{if(!panning)return; e.preventDefault(); pointX=(e.clientX??e.touches[0].clientX)-start.x; pointY=(e.clientY??e.touches[0].clientY)-start.y; setTransform();}; const endP=()=>{if(!panning)return; panning=false; previewAreaWrapper.classList.remove('grabbing'); window.removeEventListener('mousemove', panM); window.removeEventListener('touchmove', panM); window.removeEventListener('mouseup', endP); window.removeEventListener('touchend', endP);}; safeAddListener(previewAreaWrapper,'wheel',(e)=>{e.preventDefault();const r=previewAreaWrapper.getBoundingClientRect();const mx=e.clientX-r.left,my=e.clientY-r.top;const xs=(mx-pointX)/scale,ys=(my-pointY)/scale;const d=-e.deltaY,zF=1.15;let nS=(d>0)?scale*zF:scale/zF;nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS));if(nS===scale)return;pointX=mx-xs*nS;pointY=my-ys*nS;scale=nS;setTransform();},{passive:false}); safeAddListener(previewAreaWrapper,'mousedown', startP); safeAddListener(previewAreaWrapper,'touchstart', startP,{passive:false}); }
    function zoom(factor) { if (!previewAreaWrapper) return; const r=previewAreaWrapper.getBoundingClientRect(); const cX=r.width/2,cY=r.height/2; const xs=(cX-pointX)/scale,ys=(cY-pointY)/scale; let nS=scale*factor; nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS)); if(nS===scale)return; pointX=cX-xs*nS; pointY=cY-ys*nS; scale=nS; setTransform(); }
    function resetZoomPan() { scale=1; pointX=0; pointY=0; if (previewAreaWrapper) setTransform(); calculateAndApplyWrapperSize(); } // Check if exists
    function updateZoomButtons() { if(zoomInBtn)zoomInBtn.disabled=(scale>=MAX_SCALE); if(zoomOutBtn)zoomOutBtn.disabled=(scale<=MIN_SCALE); }
    function handleSvgPathHover(event) { const t=event.target; if(t && t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetZoomPan(); updateStatus('', '', 0, true); }
    function resetAppToLanding() { if (!landingView && !appView) return; currentFile=null; currentSvgContent=''; if(imageInput)imageInput.value=''; if(fileNameDisplay)fileNameDisplay.textContent=''; if(currentFileObjectURL){URL.revokeObjectURL(currentFileObjectURL);currentFileObjectURL=null;} if(previewOriginalImage){previewOriginalImage.src='#';} originalImageNaturalDims={width:0,height:0}; resetZoomPan(); if(originalImageWrapper){originalImageWrapper.style.width='';originalImageWrapper.style.height='';originalImageWrapper.style.transform='';} if(vectorImageWrapper){vectorImageWrapper.style.width='';vectorImageWrapper.style.height='';vectorImageWrapper.style.transform='';} showLandingView(); updateStatus('', '', 0, false); if(landingStatusArea) landingStatusArea.textContent = ''; resetPresetSelection(); }
    function resetUploadAreaVisuals(){ if(dropZone)dropZone.style.display='flex'; if(fileInfoArea)fileInfoArea.classList.add('hidden'); if(uploadProgress)uploadProgress.classList.add('hidden'); if(startConversionBtn)startConversionBtn.classList.add('hidden'); if(uploadArea)uploadArea.classList.remove('file-selected'); if(progressBar)progressBar.style.width='0%'; }
    function updateOptionsAvailability() { if (!optionsForm || !modeSelect || !colormodeSelect || !paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); toggleOptionGroup(colorPrecisionGroup,false); }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { defaultOptions[key] = value; } if (defaultOptions.hasOwnProperty('palette_selector')) { defaultOptions['color_precision'] = defaultOptions['palette_selector']; } const defaultPreset = presets.find(p => p.name === "General / Balanced"); if (defaultPreset) { defaultPreset.options = {...defaultOptions}; } else { console.error("Could not find 'General / Balanced' preset to store defaults!"); } console.log("Stored defaults:", defaultOptions); }
    function handleResetOptions() { if (!optionsForm) return; applyOptions(defaultOptions); updateStatus('Options reset to default.', 'success', 2000, true); resetPresetSelection(); }
    function populatePresetSelect() { if (!presetSelect) return; presetSelect.innerHTML = '<option value="" disabled selected>Load Preset...</option>'; presets.forEach((preset, index) => { const option = document.createElement('option'); option.value = index.toString(); option.textContent = preset.name; presetSelect.appendChild(option); }); }
    function handlePresetChange(event) { if (!appView) return; const selectedIndex = event.target.value; if (selectedIndex === "" || !presets[selectedIndex]) return; const selectedPreset = presets[selectedIndex]; applyOptions(selectedPreset.options); updateStatus(`Preset "${selectedPreset.name}" loaded.`, 'info', 3000, true); // Prevent deselection right after applying
         setTimeout(() => { if (presetSelect) presetSelect.value = selectedIndex; }, 10); }
    function resetPresetSelection() { if(presetSelect && presetSelect.value !== "") presetSelect.value = ""; }
    function applyOptions(optionsToApply) { if (!optionsForm) return; console.log("Applying options:", optionsToApply); let needsUpdateAvailability = false; for (const key in optionsToApply) { const value = optionsToApply[key]; const element = optionsForm.elements[key]; if (element) { if (element.type === 'radio' || element.type === 'checkbox') {} else { element.value = String(value); } if (element.type === 'range') { const numInputId = `${element.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { numInput.value = String(value); } } if (key === 'mode' || key === 'color_mode' || key === 'palette_selector') { needsUpdateAvailability = true; } // Trigger change *after* value set using timeout
            setTimeout(() => element.dispatchEvent(new Event('change', { bubbles: true })), 0); } else { console.warn(`Option key "${key}" with value "${value}" not found in form.`); } } setTimeout(() => { if (needsUpdateAvailability) { updateOptionsAvailability(); } if (currentFile && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }, 50); } // Delay ensures changes are processed
    function handleSaveOptions() { if (!optionsForm || !downloadLink) return; const currentOptions = {}; const formData = new FormData(optionsForm); Object.keys(defaultOptions).forEach(key => { if (formData.has(key)) { currentOptions[key] = formData.get(key); } }); try { const jsonString = JSON.stringify(currentOptions, null, 2); const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' }); const url = URL.createObjectURL(blob); downloadLink.href = url; downloadLink.download = 'vectorise-options.json'; downloadLink.click(); URL.revokeObjectURL(url); updateStatus('Settings saved.', 'success', 2000, true); } catch (e) { console.error('Error saving options:', e); updateStatus('Error saving settings.', 'error', 0, true); } }
    function handleLoadOptionsFile(event) { if (!event.target.files || event.target.files.length === 0 || !appView) return; const file = event.target.files[0]; if (file.type !== 'application/json') { updateStatus('Error: Please select a valid .json settings file.', 'error', 0, true); optionsFileInput.value = ''; return; } const reader = new FileReader(); reader.onload = (e) => { try { const loadedOptions = JSON.parse(e.target.result); if (typeof loadedOptions !== 'object' || loadedOptions === null || Array.isArray(loadedOptions)) { throw new Error("Invalid JSON structure."); } const knownKeys = Object.keys(defaultOptions); const loadedKeys = Object.keys(loadedOptions); const hasKnownKey = knownKeys.some(key => loadedKeys.includes(key)); if (!hasKnownKey) { throw new Error("JSON does not contain recognizable options."); } applyOptions(loadedOptions); updateStatus('Settings loaded successfully.', 'success', 3000, true); resetPresetSelection(); } catch (error) { console.error('Error loading options file:', error); updateStatus(`Error loading settings: ${error.message}`, 'error', 0, true); } finally { if(optionsFileInput) optionsFileInput.value = ''; } }; reader.onerror = () => { updateStatus('Error reading settings file.', 'error', 0, true); if(optionsFileInput) optionsFileInput.value = ''; }; reader.readAsText(file); }
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error', 0, true);} }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(clearStatusToo && appView) updateStatus('', '', 0, true); }

    // --- Contact Form Submission Handler ---
    function handleContactFormSubmit(event) {
        event.preventDefault();
        if (!contactForm || !contactFormStatus) return;

        const nameInput = contactForm.elements['name'];
        const emailInput = contactForm.elements['email'];
        const subjectInput = contactForm.elements['subject'];
        const messageInput = contactForm.elements['message'];
        const recipientEmail = "jonkarystudio@gmail.com"; // Your email

        // Simple frontend validation
        let isValid = true;
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger-color)'; // Highlight empty fields
                isValid = false;
            } else {
                input.style.borderColor = ''; // Reset border color
            }
        });

        if (!isValid) {
             showContactFormStatus("Please fill out all fields.", "error");
             return;
        }
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => input.style.borderColor = '');


        // *** Mailto Workaround ***
        const mailtoSubject = encodeURIComponent(subjectInput.value.trim());
        const mailtoBody = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        );
        const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

        try {
             showContactFormStatus("Opening your email client...", "info"); // Give feedback
             window.location.href = mailtoLink;
             // Optionally clear after a delay, assuming mailto link worked
             setTimeout(() => {
                 if (contactForm) contactForm.reset();
                 showContactFormStatus("Please complete sending the email via your email application.", "success");
             }, 1500);
        } catch (error) {
            console.error("Failed to open mailto link:", error);
            showContactFormStatus("Could not open email client. Please copy details manually and send to " + recipientEmail, "error");
        }
    }

    function showContactFormStatus(message, type) {
        if (!contactFormStatus) return;
        contactFormStatus.textContent = message;
        contactFormStatus.className = `form-status ${type}`;
        contactFormStatus.style.display = 'block';
    }

    // --- Utility Functions (Shared) ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0, isAppStatus = true) {
        const target = isAppStatus ? statusArea : landingStatusArea;
        if(!target) return;

        clearTimeout(statusClearTimer);
        target.textContent = message;
        target.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'}`;
        if (type) { target.classList.add(type); }

        if(type!=='error' && clearDelay>0 && message!=='') {
             statusClearTimer = setTimeout(()=>{
                if(target.textContent === message) {
                    target.textContent = '';
                    target.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'}`;
                }
            }, clearDelay);
        }
        if(type === 'error'){ console.error("UI Status:", message); }
    }
    function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Error:", message); } }

}); // End DOMContentLoaded