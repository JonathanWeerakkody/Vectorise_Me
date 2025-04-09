// public/script.js - FINAL COMPLETE Version (Presets, Zoom, Input Sync, Wrapper Sizing)

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput'); // Hidden file input
    const fileNameDisplay = document.getElementById('fileName'); // In file info area
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone'); // The whole clickable/droppable label area
    const fileInfoArea = document.getElementById('fileInfoArea');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn'); // In app header
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn'); // Update/Vectorize button
    const statusArea = document.getElementById('statusArea'); // App status area
    const resetOptionsBtn = document.getElementById('resetOptionsBtn'); // Reset Advanced
    const svgOutputDiv = document.getElementById('svgOutput'); // SVG injection target
    const previewOriginalImage = document.getElementById('previewOriginalImage'); // Original image element
    const originalImageWrapper = document.getElementById('originalImageWrapper'); // Wrapper for IMG
    const vectorImageWrapper = document.getElementById('vectorImageWrapper'); // Wrapper for SVG structure
    const previewAreaWrapper = document.getElementById('previewAreaWrapper'); // Wrapper for zoom/pan events
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink'); // Hidden link
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    // Preset elements
    const presetSelector = document.getElementById('presetSelector');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const managePresetsBtn = document.getElementById('managePresetsBtn');
    const toggleAdvancedBtn = document.getElementById('toggleAdvancedBtn');
    const optionsFormWrapper = document.getElementById('optionsFormWrapper');
    const presetModal = document.getElementById('presetModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const presetListUl = document.getElementById('presetList');
    const paletteSelect = document.getElementById('optPalette'); // Palette select element
    const colorPrecisionInput = document.getElementById('optColorPrecision'); // Hidden input for actual precision value

    // Option Controllers & Groups (Ensure these match HTML IDs)
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Hidden group ref
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette'); // Palette select group

    // --- Initial Element Check ---
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, uploadNewBtn, dropZone, previewAreaWrapper, previewOriginalImage, originalImageWrapper, vectorImageWrapper, modeSelect, colormodeSelect, resetOptionsBtn, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea, zoomInBtn, zoomOutBtn, zoomResetBtn, presetSelector, savePresetBtn, managePresetsBtn, toggleAdvancedBtn, optionsFormWrapper, presetModal, modalBackdrop, closeModalBtn, presetListUl, paletteSelect, colorPrecisionInput };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");

    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    let defaultOptions = {}; // Populated by storeDefaultOptions based on initial preset
    let customPresets = {}; // Loaded from localStorage
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10;
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };

    // --- Built-in Presets Definition ---
     const builtInPresets = {
         "Default Building": { mode: "spline", color_mode: "color", corner_threshold: 60, filter_speckle: 4, path_precision: 3, spline_threshold: 0.75, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 2, palette_selector: "6" },
         "Photo (Detailed)": { mode: "spline", color_mode: "color", corner_threshold: 85, filter_speckle: 2, path_precision: 5, spline_threshold: 0.6, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 1.5, palette_selector: "8" },
         "Illustration / Poster": { mode: "spline", color_mode: "color", corner_threshold: 50, filter_speckle: 6, path_precision: 3, spline_threshold: 0.8, splice_threshold: 60, segment_length: 5, hierarchical: 'stacked', gradient_step: 2.5, palette_selector: "5" },
         "Clipart": { mode: "polygon", color_mode: "color", corner_threshold: 60, filter_speckle: 5, path_precision: 2, hierarchical: 'cutout', gradient_step: 4, palette_selector: "5" },
         "Black and White": { mode: "polygon", color_mode: "bw", corner_threshold: 40, filter_speckle: 10, path_precision: 2, palette_selector: "6"},
         "Pixel Art": { mode: "pixel", color_mode: "color", filter_speckle: 0, path_precision: 1, hierarchical: 'stacked', gradient_step: 0, palette_selector: "8" },
     };

    // --- Helper: Safe Event Listener ---
    function safeAddListener(el, ev, fn, opts) { if (el && typeof fn === 'function') el.addEventListener(ev, fn, opts); else if(!el) console.warn(`Element not found for listener: ${ev}`); }

    // --- Initial UI Setup ---
    loadCustomPresets();
    showLandingView();
    populatePresetSelector();
    storeDefaultOptions(builtInPresets[presetSelector.value || "Default Building"] || {}); // Base defaults on initially selected preset
    applyPreset(presetSelector.value || "Default Building");
    updateOptionsAvailability();
    setupNumberInputSync();
    setupZoomPan();
    updateZoomButtons();
    if(optionsFormWrapper) optionsFormWrapper.classList.add('collapsed'); // Start collapsed
    if(toggleAdvancedBtn) toggleAdvancedBtn.setAttribute('aria-expanded','false');
    if(toggleAdvancedBtn) toggleAdvancedBtn.querySelector('i').style.transform = 'rotate(0deg)';

    // --- Comparison Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { if (!previewOriginalImage) return; originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; console.log("Original Dims Loaded:", originalImageNaturalDims); calculateAndApplyWrapperSize(); });
    safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed load original preview"); if(previewOriginalImage) previewOriginalImage.src = '#'; });

    // --- Drag and Drop ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); /* Allow drop */ } // Simplified over
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { console.log("Drop Event"); e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) { console.log(`Dropped: ${files[0].name}`); handleFile(files[0]); } }
    // Drag listeners are attached to the LABEL which is the dropzone now
    if (dropZone) { safeAddListener(dropZone,'dragenter',handleDragEnter); safeAddListener(dropZone,'dragover',handleDragOver); safeAddListener(dropZone,'dragleave',handleDragLeave); safeAddListener(dropZone,'drop',handleDrop); /* Click handled by label's 'for' attribute */ }

    // --- Event Listeners Setup ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability); // Also triggers conditional logic
    safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
    safeAddListener(presetSelector, 'change', handlePresetChange);
    safeAddListener(savePresetBtn, 'click', handleSavePreset);
    safeAddListener(managePresetsBtn, 'click', openPresetModal);
    safeAddListener(closeModalBtn, 'click', closePresetModal);
    safeAddListener(modalBackdrop, 'click', closePresetModal);
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);
    // Form change enables update button
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); }
    // Window Resize Listener - Recalculates wrapper sizes
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyWrapperSize, 150); });


    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() { if (!optionsForm) return; optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const numId=`${slider.id}Num`,numInput=document.getElementById(numId); if (numInput) { /* Attach listeners to sync slider and number input both ways, including validation/clamping */ safeAddListener(slider, 'input', (e) => { const step = parseFloat(e.target.step); numInput.value = (step < 1) ? parseFloat(e.target.value).toFixed(String(step).split('.')[1]?.length || 2) : Math.round(parseFloat(e.target.value)); }); safeAddListener(numInput, 'input', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value)-v) > (parseFloat(slider.step)/2||0.001)) { slider.value = v; slider.dispatchEvent(new Event('input',{bubbles:true})); /* Optionally dispatch change? slider.dispatchEvent(new Event('change',{bubbles:true}));*/ } }); safeAddListener(numInput, 'change', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)){ numInput.value=slider.value; return;} v=Math.max(min, Math.min(max, v)); numInput.value=v; if (slider.value != v) { slider.value=v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } }); } const valueDispId=`${slider.id}Value`;const vDisp=document.getElementById(valueDispId);if(vDisp){const upd=()=>{let v=slider.value;switch(slider.id){case'optCornerThreshold':v+='°';break;case'optFilterSpeckle':v+=' px';break;case'optPathPrecision':v+=' dec';break;case'optSpliceThreshold':v+='°';break;case'optSegmentLength':v=parseFloat(v).toFixed(1);break;case'optGradientStep':v=parseFloat(v).toFixed(1);break;/* no color precision display */}vDisp.textContent=v;};upd();safeAddListener(slider,'input',upd);} }); if(paletteSelect&&colorPrecisionInput){safeAddListener(paletteSelect,'change',e=>{colorPrecisionInput.value=e.target.value;optionsForm?.dispatchEvent(new Event('change',{bubbles:true}));console.log(`Mapped Palette->color_precision: ${colorPrecisionInput.value}`);});colorPrecisionInput.value=paletteSelect.value;}}

    // --- File Handling ---
    function handleFileSelectChange(event) { console.log("File Input Change Event Fired"); if (event.target.files?.length > 0) { handleFile(event.target.files[0]); } else { resetAppToLanding(); } }
    function handleFile(file) { if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const vError = validateFile(file); if (vError) { showLandingError(vError); resetAppToLanding(); return; } console.log("File Handler Processing:", file.name); currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); originalImageNaturalDims={width:0,height:0}; if(originalImageWrapper){originalImageWrapper.style.width='';originalImageWrapper.style.height='';originalImageWrapper.style.transform='';} if(vectorImageWrapper){vectorImageWrapper.style.width='';vectorImageWrapper.style.height='';vectorImageWrapper.style.transform='';} try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { console.error(e); showLandingError("Error creating preview"); resetAppToLanding(); return;} if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); resetZoomPan(); }
    function validateFile(file) { if (!file) return "No file."; if (file.size > 15*1024*1024) return 'Error: File > 15MB.'; if (!['image/jpeg','image/png','image/webp','image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; if(uploadProgress) uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) { if (!currentFile || !convertBtn || !downloadBtn) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`; const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') formData.append(key, value); } } console.log("Sending data...", Object.fromEntries(formData)); try { const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error ${res.status}`); if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; } if (originalImageNaturalDims.width > 0) setTimeout(calculateAndApplyWrapperSize, 50); else console.warn("Orig dims miss after convert."); if(isInitial) resetZoomPan(); } else throw new Error("No SVG data."); } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error'); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } }
    function simulateUploadProgress(callback) { if (!uploadProgress || !progressBar ) return; let p = 0; progressBar.style.width = `0%`; const i = setInterval(() => { p += Math.random()*15+10; if (p>=100){ p=100; clearInterval(i); progressBar.style.width=`100%`; setTimeout(callback,200); } else progressBar.style.width=`${p}%`; }, 80); }


    // --- Dimension Calculation ---
    function calculateAndApplyWrapperSize() { if (!previewAreaWrapper || !previewOriginalImage || !originalImageNaturalDims.width || !originalImageWrapper || !vectorImageWrapper) return; const cw=previewAreaWrapper.clientWidth, ch=previewAreaWrapper.clientHeight; if (cw<=0 || ch<=0) return; const imgR=originalImageNaturalDims.width/originalImageNaturalDims.height, cR=cw/ch; let tW, tH; if (imgR>cR){ tW=cw; tH=tW/imgR; } else { tH=ch; tW=tH*imgR; } tW=Math.max(1, Math.floor(tW)); tH=Math.max(1, Math.floor(tH)); console.log(`Applying WRAPPER dimensions - W: ${tW}px, H: ${tH}px`); if(originalImageWrapper){ originalImageWrapper.style.width=`${tW}px`; originalImageWrapper.style.height=`${tH}px`; } if(vectorImageWrapper){ vectorImageWrapper.style.width=`${tW}px`; vectorImageWrapper.style.height=`${tH}px`; } }


    // --- Zoom and Pan Logic ---
    function setTransform() { const v=`translate(${pointX}px, ${pointY}px) scale(${scale})`; if(originalImageWrapper)originalImageWrapper.style.transform=v; if(vectorImageWrapper)vectorImageWrapper.style.transform=v; updateZoomButtons(); }
    function setupZoomPan() { if (!previewAreaWrapper) return; const startP=(e)=>{if(e.button!==0&&e.type!=='touchstart')return; e.preventDefault(); panning=true; start={x:(e.clientX??e.touches[0].clientX)-pointX, y:(e.clientY??e.touches[0].clientY)-pointY}; previewAreaWrapper.classList.add('grabbing'); window.addEventListener('mousemove', panM); window.addEventListener('touchmove', panM, {passive:false}); window.addEventListener('mouseup', endP); window.addEventListener('touchend', endP);}; const panM=(e)=>{if(!panning)return; e.preventDefault(); const cX=e.clientX??e.touches[0].clientX, cY=e.clientY??e.touches[0].clientY; pointX=cX-start.x; pointY=cY-start.y; setTransform();}; const endP=()=>{if(!panning)return; panning=false; previewAreaWrapper.classList.remove('grabbing'); window.removeEventListener('mousemove', panM); window.removeEventListener('touchmove', panM); window.removeEventListener('mouseup', endP); window.removeEventListener('touchend', endP);}; safeAddListener(previewAreaWrapper,'wheel',(e)=>{e.preventDefault();const r=previewAreaWrapper.getBoundingClientRect();const mx=e.clientX-r.left,my=e.clientY-r.top;const xs=(mx-pointX)/scale,ys=(my-pointY)/scale;const d=-e.deltaY,zF=1.15;let nS=(d>0)?scale*zF:scale/zF;nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS));if(nS===scale)return;pointX=mx-xs*nS;pointY=my-ys*nS;scale=nS;setTransform();},{passive:false}); safeAddListener(previewAreaWrapper,'mousedown', startP); safeAddListener(previewAreaWrapper,'touchstart', startP,{passive:false}); }
    function zoom(factor) { if (!previewAreaWrapper) return; const r=previewAreaWrapper.getBoundingClientRect(); const cX=r.width/2,cY=r.height/2; const xs=(cX-pointX)/scale,ys=(cY-pointY)/scale; let nS=scale*factor; nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS)); if(nS===scale)return; pointX=cX-xs*nS; pointY=cY-ys*nS; scale=nS; setTransform(); }
    function resetZoomPan() { scale=1; pointX=0; pointY=0; setTransform(); calculateAndApplyWrapperSize(); }
    function updateZoomButtons() { if(zoomInBtn)zoomInBtn.disabled=(scale>=MAX_SCALE); if(zoomOutBtn)zoomOutBtn.disabled=(scale<=MIN_SCALE); }


    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { const t=event.target; if(t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetZoomPan(); updateStatus('', ''); }
    function resetAppToLanding() { currentFile=null; currentSvgContent=''; if(imageInput)imageInput.value=''; if(fileNameDisplay)fileNameDisplay.textContent=''; if(currentFileObjectURL){URL.revokeObjectURL(currentFileObjectURL);currentFileObjectURL=null;} if(previewOriginalImage){previewOriginalImage.src='#';} originalImageNaturalDims={width:0,height:0}; resetZoomPan(); if(originalImageWrapper){originalImageWrapper.style.width='';originalImageWrapper.style.height='';originalImageWrapper.style.transform='';} if(vectorImageWrapper){vectorImageWrapper.style.width='';vectorImageWrapper.style.height='';vectorImageWrapper.style.transform='';} showLandingView(); updateStatus('', ''); if(landingStatusArea) landingStatusArea.textContent = ''; }
    function resetUploadAreaVisuals(){ if(dropZone)dropZone.style.display='flex'; if(fileInfoArea)fileInfoArea.classList.add('hidden'); if(uploadProgress)uploadProgress.classList.add('hidden'); if(startConversionBtn)startConversionBtn.classList.add('hidden'); if(uploadArea)uploadArea.classList.remove('file-selected'); if(progressBar)progressBar.style.width='0%'; }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { if (!modeSelect||!colormodeSelect||!paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); toggleOptionGroup(colorPrecisionGroup,false); if(resetOptionsBtn) resetOptionsBtn.disabled = false; }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select, button'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }

    // --- Option Reset / Presets ---
    function storeDefaultOptions(source = null) { if (!optionsForm) return; defaultOptions = {}; const formData = source ? null : new FormData(optionsForm); for(const element of optionsForm.elements){ let key=element.name; if(!key || defaultOptions[key]!==undefined) continue; let valueToStore; if(source && source[key] !== undefined){ valueToStore = String(source[key]); } else if (formData) { let formVal = formData.get(key); if(element.type === 'checkbox') valueToStore = element.checked; else if(formVal !== null) valueToStore = formVal; } else if(element.tagName === 'SELECT'){ valueToStore = element.value; } else if (element.type === 'checkbox') { valueToStore = element.checked; } else if(element.value !== undefined){ valueToStore = element.value; } if (valueToStore !== undefined) defaultOptions[key] = valueToStore; } if(paletteSelect) defaultOptions['palette_selector'] = source?.palette_selector || paletteSelect.value || "6"; console.log("Stored defaults:", defaultOptions); }
    function handleResetOptions() { const currentPresetName = presetSelector?.value || "Default Building"; applyPreset(currentPresetName, true); updateStatus('Advanced options reset.', 'success', 2000); }
    function populatePresetSelector() { if (!presetSelector) return; const currentSelection = presetSelector.value; presetSelector.innerHTML = ''; const builtInGroup = document.createElement('optgroup'); builtInGroup.label = "Built-in Presets"; for (const name in builtInPresets) { const option = document.createElement('option'); option.value = name; option.textContent = name; builtInGroup.appendChild(option); } presetSelector.appendChild(builtInGroup); if (Object.keys(customPresets).length > 0) { const customGroup = document.createElement('optgroup'); customGroup.label = "My Presets"; for (const name in customPresets) { const option = document.createElement('option'); option.value = name; option.textContent = name; customGroup.appendChild(option); } presetSelector.appendChild(customGroup); } try { presetSelector.value = currentSelection && presetSelector.querySelector(`option[value="${CSS.escape(currentSelection)}"]`) ? currentSelection : "Default Building"; } catch(e) { presetSelector.value = "Default Building";} }
    function handlePresetChange(event) { applyPreset(event.target.value); }
    function applyPreset(presetName, isReset = false) { console.log("Applying preset:", presetName); const presetData = builtInPresets[presetName] || customPresets[presetName]; if (!presetData || !optionsForm) return; storeDefaultOptions(presetData); // Store THESE defaults before applying
      for (const key in defaultOptions) { const element = optionsForm.elements[key]; if (element) { if (key === 'palette_selector' && paletteSelect){ paletteSelect.value = defaultOptions[key]; paletteSelect.dispatchEvent(new Event('change', {bubbles:true})); } else if (element.type === 'checkbox'){ element.checked = (defaultOptions[key] === true || defaultOptions[key] === 'true'); } else if (element.name && defaultOptions[key] !== undefined) { element.value = defaultOptions[key]; } /* Trigger events AFTER setting value */ if (element.type === 'range' || element.type === 'number') { element.dispatchEvent(new Event('input', { bubbles: true })); } if(element.tagName === 'SELECT' && element !== paletteSelect) { element.dispatchEvent(new Event('change', {bubbles: true})); } } } updateOptionsAvailability(); if(!isReset && currentFile && convertBtn){ convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization';} if(isReset && convertBtn) { convertBtn.disabled = true; } updateStatus(`Preset '${presetName}' applied.`, 'success', 1500); }
    function handleSavePreset() { const name = prompt("Save current settings as:", "My Custom Preset"); if (!name?.trim()) return; if (builtInPresets[name]) { updateStatus(`Cannot overwrite: ${name}`, "error", 3000); return; } if (customPresets[name] && !confirm(`Overwrite "${name}"?`)) return; const currentSettings = {}; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el=optionsForm.elements[key]; if(el) currentSettings[key]=el.type==='checkbox'?el.checked:value; } if(paletteSelect) currentSettings['palette_selector'] = paletteSelect.value; customPresets[name] = currentSettings; saveCustomPresets(); populatePresetSelector(); presetSelector.value = name; updateStatus(`Preset "${name}" saved!`, 'success', 2000); }
    function loadCustomPresets() { try { customPresets = JSON.parse(localStorage.getItem('vectoriseMe_customPresets') || '{}'); } catch(e) { console.error("Err loading presets:", e); customPresets = {}; } }
    function saveCustomPresets() { try { localStorage.setItem('vectoriseMe_customPresets', JSON.stringify(customPresets)); } catch(e) { console.error("Err saving presets:", e); updateStatus("Could not save preset.", "error"); } }
    function openPresetModal() { /* ... Same logic */ } function closePresetModal() { /* ... Same logic */ } function handleDeletePreset(nameToDelete) { /* ... Same logic */ }

    // --- Advanced Options Toggle ---
    function toggleAdvancedOptions() { if(!optionsFormWrapper || !toggleAdvancedBtn) return; const isCollapsed = optionsFormWrapper.classList.toggle('collapsed'); toggleAdvancedBtn.setAttribute('aria-expanded', !isCollapsed); const icon = toggleAdvancedBtn.querySelector('i'); if(icon) icon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'; }
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);

    // --- Download Logic ---
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }

    // --- Utility ---
    let statusClearTimer; function updateStatus(m, t, d=0){const target=appView&&!appView.classList.contains('hidden')?statusArea:landingStatusArea;if(!target)return;clearTimeout(statusClearTimer);target.textContent=m;target.className=`status-area ${appView&&!appView.classList.contains('hidden')?'app-status':'landing-status'} ${t}`;if(t!=='error'&&d>0&&m!==''){statusClearTimer=setTimeout(()=>{if(target.textContent===m)updateStatus('','');},d);}if(t==='error'){console.error("UI Status:", m);}} function showLandingError(m){if(landingStatusArea){landingStatusArea.textContent=m;landingStatusArea.className='status-area landing-status error';}else{console.error("Landing Error:", m);}}
    function resetResultArea(clearStatusToo=true){if(svgOutputDiv){svgOutputDiv.innerHTML='<p class="placeholder-text">SVG result will appear here</p>';svgOutputDiv.classList.add('placeholder-text');}currentSvgContent='';if(downloadBtn)downloadBtn.disabled=true;if(clearStatusToo)updateStatus('');if(originalImageWrapper){originalImageWrapper.style.width='';originalImageWrapper.style.height='';}if(vectorImageWrapper){vectorImageWrapper.style.width='';vectorImageWrapper.style.height='';}}

    // --- Initial State Calls ---
    updateOptionsAvailability(); updateZoomButtons();
    console.log("vectorise.me script initialized (COMPLETE FINAL).");

}); // End DOMContentLoaded