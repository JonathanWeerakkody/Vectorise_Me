// public/script.js - Includes Presets and Save/Load Options

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
  const previewOriginalImage = document.getElementById('previewOriginalImage');
  const originalImageWrapper = document.getElementById('originalImageWrapper'); // Wrapper for IMG
  const vectorImageWrapper = document.getElementById('vectorImageWrapper');   // Wrapper for SVG structure
  const previewAreaWrapper = document.getElementById('previewAreaWrapper'); // Wrapper for events
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadLink = document.getElementById('downloadLink');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomResetBtn = document.getElementById('zoomResetBtn');

  // Option Controllers & Groups
  const modeSelect = document.getElementById('optMode');
  const colormodeSelect = document.getElementById('optColormode');
  const paletteSelect = document.getElementById('optPalette');
  const colorPrecisionInput = document.getElementById('optColorPrecision'); // Hidden input
  const splineThresholdGroup = document.getElementById('groupSplineThreshold');
  const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
  const segmentLengthGroup = document.getElementById('groupSegmentLength');
  const hierarchicalGroup = document.getElementById('groupHierarchical');
  const gradientStepGroup = document.getElementById('groupGradientStep');
  const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Hidden group
  const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
  const paletteGroup = document.getElementById('groupPalette'); // Palette select group

  // --- NEW Preset and Load/Save Elements ---
  const presetSelect = document.getElementById('presetSelect');
  const saveOptionsBtn = document.getElementById('saveOptionsBtn');
  const loadOptionsBtn = document.getElementById('loadOptionsBtn');
  const optionsFileInput = document.getElementById('optionsFileInput');


  // --- Initial Element Check ---
  // Updated to include new elements
  const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, uploadNewBtn, dropZone, previewAreaWrapper, previewOriginalImage, originalImageWrapper, vectorImageWrapper, modeSelect, colormodeSelect, resetOptionsBtn, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea, zoomInBtn, zoomOutBtn, zoomResetBtn, paletteSelect, colorPrecisionInput, presetSelect, saveOptionsBtn, loadOptionsBtn, optionsFileInput }; // Added new ones
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

  // --- NEW Preset Definitions ---
  // Using form input names (snake_case) as keys
  const presets = [
      {
          name: "Default",
          options: { // Will be populated by storeDefaultOptions
              // Placeholder, gets filled later
          }
      },
      {
          name: "Pixel Art",
          options: {
              color_mode: "color", hierarchical: "stacked", filter_speckle: "0",
              palette_selector: "8", color_precision: "8", // Need both for consistent UI
              mode: "pixel", gradient_step: "0",
              // Set irrelevant options to defaults just in case
              corner_threshold: "60", path_precision: "3", spline_threshold: "0.75",
              splice_threshold: "45", segment_length: "4"
          }
      },
      {
          name: "Blueprint",
          options: {
              color_mode: "bw", filter_speckle: "4", mode: "polygon",
              corner_threshold: "60", path_precision: "3",
              // Set irrelevant options to defaults just in case
              hierarchical: "stacked", palette_selector: "6", color_precision: "6", gradient_step: "2",
              spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
          }
      },
      {
          name: "Cityscape",
          options: {
              color_mode: "color", hierarchical: "stacked", filter_speckle: "4",
              palette_selector: "8", color_precision: "8", gradient_step: "10", // Capped from 25
              mode: "spline", corner_threshold: "60", path_precision: "3",
              spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
          }
      },
      {
          name: "Poster",
          options: {
              color_mode: "color", hierarchical: "stacked", filter_speckle: "8",
              palette_selector: "6", color_precision: "6", // Using standard detail instead of 7
              gradient_step: "10", // Capped from 64
              mode: "spline", corner_threshold: "60", path_precision: "3",
              spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
          }
      },
      {
          name: "Landscape",
          options: {
              color_mode: "color", hierarchical: "stacked", filter_speckle: "4",
              palette_selector: "8", color_precision: "8", gradient_step: "10", // Capped from 28
              mode: "spline", corner_threshold: "60", path_precision: "3",
              spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
          }
      },
      {
          name: "Photo",
          options: {
              color_mode: "color", hierarchical: "stacked", filter_speckle: "10",
              palette_selector: "8", color_precision: "8", gradient_step: "10", // Capped from 48
              mode: "spline", corner_threshold: "180", path_precision: "3",
              spline_threshold: "0.75", splice_threshold: "45", segment_length: "4"
          }
      }
  ];


  // --- Helper: Safe Event Listener ---
  function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element) console.warn(`Element not found for listener: ${event}`); }

  // --- Initial UI Setup ---
  showLandingView();
  storeDefaultOptions(); // Store defaults AND populate the "Default" preset
  populatePresetSelect(); // NEW: Populate the preset dropdown
  updateOptionsAvailability();
  setupZoomPan();
  updateZoomButtons();
  setupNumberInputSync();

  // --- Original Preview Image Load Listener ---
  safeAddListener(previewOriginalImage, 'load', () => { if (!previewOriginalImage) return; originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; console.log("Original Dims Loaded:", originalImageNaturalDims); calculateAndApplyWrapperSize(); });
  safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed load original preview"); if(previewOriginalImage) previewOriginalImage.src = '#'; });

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
  safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
  safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
  safeAddListener(modeSelect, 'change', updateOptionsAvailability);
  safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
  safeAddListener(paletteSelect, 'change', updateOptionsAvailability); // Update on palette change
  safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
  safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
  safeAddListener(zoomResetBtn, 'click', resetZoomPan);
  safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
  safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
  // Option form change listener
  if (optionsForm) { optionsForm.addEventListener('change', () => { // When any form element changes...
      // Update the hidden color_precision input if palette changed
      if (paletteSelect && colorPrecisionInput) {
          colorPrecisionInput.value = paletteSelect.value;
      }
      // Enable the update button if we already have SVG content
      if (currentSvgContent && convertBtn) {
          convertBtn.disabled = false;
          convertBtn.textContent = 'Update Vectorization';
      }
      // Update which options are visually enabled/disabled
      updateOptionsAvailability();
  }); }
  // Window Resize Listener
  let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyWrapperSize, 150); });

  // --- NEW Preset and Load/Save Listeners ---
  safeAddListener(presetSelect, 'change', handlePresetChange);
  safeAddListener(saveOptionsBtn, 'click', handleSaveOptions);
  safeAddListener(loadOptionsBtn, 'click', () => optionsFileInput?.click()); // Trigger hidden input
  safeAddListener(optionsFileInput, 'change', handleLoadOptionsFile);


  // --- Number Input / Slider Syncing ---
  function setupNumberInputSync() { if (!optionsForm) return; optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId); const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); if (numInput) { safeAddListener(slider, 'input', (e) => { const step = parseFloat(e.target.step); numInput.value = (step < 1) ? parseFloat(e.target.value).toFixed(String(step).split('.')[1]?.length || 2) : Math.round(parseFloat(e.target.value)); }); safeAddListener(numInput, 'input', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value)-v) > (parseFloat(slider.step)/2||0.001)) { slider.value = v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } }); safeAddListener(numInput, 'change', (e) => { let v=parseFloat(e.target.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)){ numInput.value=slider.value; return;} v=Math.max(min, Math.min(max, v)); numInput.value=v; if (slider.value != v) { slider.value=v; slider.dispatchEvent(new Event('input',{bubbles:true})); slider.dispatchEvent(new Event('change',{bubbles:true})); } }); } /* Update text display span */ if (valueDisplay) { const updateDisplay = () => { let v=slider.value; switch(slider.id){ case 'optCornerThreshold': v+='°'; break; case 'optFilterSpeckle': v+=' px'; break; case 'optPathPrecision': v+=' dec'; break; case 'optSpliceThreshold': v+='°'; break; case 'optSegmentLength': v=parseFloat(v).toFixed(1); break; case 'optGradientStep': v=parseFloat(v).toFixed(1); break; } valueDisplay.textContent=v; }; updateDisplay(); safeAddListener(slider, 'input', updateDisplay); } }); /* Palette select drives hidden precision input */ /* Handled in main form 'change' listener now
  if (paletteSelect && colorPrecisionInput) { safeAddListener(paletteSelect, 'change', (e) => { colorPrecisionInput.value = e.target.value; console.log(`Mapped Palette->color_precision: ${e.target.value}`); }); } */
  }

  // --- File Handling ---
  function handleFileSelectChange(event) { if (event.target.files?.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
  function handleFile(file) { if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const vError = validateFile(file); if (vError) { showLandingError(vError); resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); originalImageNaturalDims={width:0,height:0}; if(originalImageWrapper){ originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; originalImageWrapper.style.transform='';} if(vectorImageWrapper){ vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; vectorImageWrapper.style.transform='';} try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { /* Error */ } if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); resetZoomPan(); } // Reset zoom/pan on new file
  function validateFile(file) { if (!file) return "No file."; if (file.size > 15*1024*1024) return 'Error: File > 15MB.'; if (!['image/jpeg','image/png','image/webp','image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }

  // --- Conversion ---
  function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; if(uploadProgress) uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
  async function handleConvert(isInitial = false) { if (!currentFile || !convertBtn || !downloadBtn) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`; const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; // Check if the element exists and is NOT disabled before sending
           // Explicitly exclude the 'palette_selector' as we use 'color_precision'
           if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') {
               formData.append(key, value);
           } } } console.log("Sending data:", Object.fromEntries(formData)); // Log form data for debug
       try { const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error: ${res.status}`); if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; // Disable update btn *after* conversion completes successfully
            } if (originalImageNaturalDims.width > 0) setTimeout(calculateAndApplyWrapperSize, 50); else console.warn("Orig dims missing after convert."); if(isInitial) resetZoomPan(); } else throw new Error("No SVG data."); } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error'); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; // Re-enable if there's a file
        if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } }
  function simulateUploadProgress(callback) { if (!uploadProgress || !progressBar ) return; let p = 0; progressBar.style.width = `0%`; const i = setInterval(() => { p += Math.random()*15+10; if (p>=100){ p=100; clearInterval(i); progressBar.style.width=`100%`; setTimeout(callback,200); } else progressBar.style.width=`${p}%`; }, 80); }

  // --- Dimension Calculation (Sizes Wrappers) ---
  function calculateAndApplyWrapperSize() { if (!previewAreaWrapper || !previewOriginalImage || !originalImageNaturalDims.width || !originalImageWrapper || !vectorImageWrapper) return; const cw=previewAreaWrapper.clientWidth; const ch=previewAreaWrapper.clientHeight; if (cw<=0 || ch<=0) return; const imgRatio=originalImageNaturalDims.width/originalImageNaturalDims.height; const contRatio=cw/ch; let tw, th; if (imgRatio>contRatio){ tw=cw; th=tw/imgRatio; } else { th=ch; tw=th*imgRatio; } tw=Math.max(1, Math.floor(tw)); th=Math.max(1, Math.floor(th)); // console.log(`Applying WRAPPER dimensions - W: ${tw}px, H: ${th}px`); // Less verbose logging
       if(originalImageWrapper){ originalImageWrapper.style.width=`${tw}px`; originalImageWrapper.style.height=`${th}px`; } if(vectorImageWrapper){ vectorImageWrapper.style.width=`${tw}px`; vectorImageWrapper.style.height=`${th}px`; } }

  // --- Zoom and Pan Logic ---
  function setTransform() { const v=`translate(${pointX}px, ${pointY}px) scale(${scale})`; if(originalImageWrapper)originalImageWrapper.style.transform=v; if(vectorImageWrapper)vectorImageWrapper.style.transform=v; updateZoomButtons(); }
  function setupZoomPan() { if (!previewAreaWrapper) return; const startP=(e)=>{if(e.button!==0&&e.type!=='touchstart')return; e.preventDefault(); panning=true; start={x:(e.clientX??e.touches[0].clientX)-pointX, y:(e.clientY??e.touches[0].clientY)-pointY}; previewAreaWrapper.classList.add('grabbing'); window.addEventListener('mousemove', panM); window.addEventListener('touchmove', panM, {passive:false}); window.addEventListener('mouseup', endP); window.addEventListener('touchend', endP);}; const panM=(e)=>{if(!panning)return; e.preventDefault(); pointX=(e.clientX??e.touches[0].clientX)-start.x; pointY=(e.clientY??e.touches[0].clientY)-start.y; setTransform();}; const endP=()=>{if(!panning)return; panning=false; previewAreaWrapper.classList.remove('grabbing'); window.removeEventListener('mousemove', panM); window.removeEventListener('touchmove', panM); window.removeEventListener('mouseup', endP); window.removeEventListener('touchend', endP);}; safeAddListener(previewAreaWrapper,'wheel',(e)=>{e.preventDefault();const r=previewAreaWrapper.getBoundingClientRect();const mx=e.clientX-r.left,my=e.clientY-r.top;const xs=(mx-pointX)/scale,ys=(my-pointY)/scale;const d=-e.deltaY,zF=1.15;let nS=(d>0)?scale*zF:scale/zF;nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS));if(nS===scale)return;pointX=mx-xs*nS;pointY=my-ys*nS;scale=nS;setTransform();},{passive:false}); safeAddListener(previewAreaWrapper,'mousedown', startP); safeAddListener(previewAreaWrapper,'touchstart', startP,{passive:false}); }
  function zoom(factor) { if (!previewAreaWrapper) return; const r=previewAreaWrapper.getBoundingClientRect(); const cX=r.width/2,cY=r.height/2; const xs=(cX-pointX)/scale,ys=(cY-pointY)/scale; let nS=scale*factor; nS=Math.max(MIN_SCALE,Math.min(MAX_SCALE,nS)); if(nS===scale)return; pointX=cX-xs*nS; pointY=cY-ys*nS; scale=nS; setTransform(); }
  function resetZoomPan() { scale=1; pointX=0; pointY=0; setTransform(); calculateAndApplyWrapperSize(); } // Recalc size
  function updateZoomButtons() { if(zoomInBtn)zoomInBtn.disabled=(scale>=MAX_SCALE); if(zoomOutBtn)zoomOutBtn.disabled=(scale<=MIN_SCALE); }

  // --- SVG Path Hover Logic ---
  function handleSvgPathHover(event) { const t=event.target; if(t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }

  // --- UI State Management ---
  function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
  function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetZoomPan(); updateStatus('', ''); }
  function resetAppToLanding() { currentFile=null; currentSvgContent=''; if(imageInput)imageInput.value=''; if(fileNameDisplay)fileNameDisplay.textContent=''; if(currentFileObjectURL){URL.revokeObjectURL(currentFileObjectURL);currentFileObjectURL=null;} if(previewOriginalImage){previewOriginalImage.src='#';} originalImageNaturalDims={width:0,height:0}; resetZoomPan(); if(originalImageWrapper){originalImageWrapper.style.width='';originalImageWrapper.style.height='';originalImageWrapper.style.transform='';} if(vectorImageWrapper){vectorImageWrapper.style.width='';vectorImageWrapper.style.height='';vectorImageWrapper.style.transform='';} showLandingView(); updateStatus('', ''); if(landingStatusArea) landingStatusArea.textContent = ''; resetPresetSelection(); }
  function resetUploadAreaVisuals(){ if(dropZone)dropZone.style.display='flex'; if(fileInfoArea)fileInfoArea.classList.add('hidden'); if(uploadProgress)uploadProgress.classList.add('hidden'); if(startConversionBtn)startConversionBtn.classList.add('hidden'); if(uploadArea)uploadArea.classList.remove('file-selected'); if(progressBar)progressBar.style.width='0%'; }

  // --- Conditional Options Logic ---
  function updateOptionsAvailability() { if (!modeSelect||!colormodeSelect||!paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); toggleOptionGroup(colorPrecisionGroup,false); /* Hidden group remains hidden */ }
  function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }

  // --- Option Reset ---
  function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { defaultOptions[key] = value; // Store raw form data including palette_selector
       } // Also ensure color_precision matches palette_selector in the defaults
      if (defaultOptions.hasOwnProperty('palette_selector')) { defaultOptions['color_precision'] = defaultOptions['palette_selector']; } // Assign collected defaults to the "Default" preset object
      const defaultPreset = presets.find(p => p.name === "Default"); if (defaultPreset) { defaultPreset.options = {...defaultOptions}; // Copy defaults
      } console.log("Stored defaults:", defaultOptions); }
  function handleResetOptions() { if (!optionsForm) return; // Reset using the stored defaultOptions object
       applyOptions(defaultOptions); // Use the applyOptions function
       updateStatus('Options reset to default.', 'success', 2000); resetPresetSelection(); }

  // --- NEW Preset Logic ---
  function populatePresetSelect() { if (!presetSelect) return; presetSelect.innerHTML = '<option value="" disabled selected>Load a Preset...</option>'; // Reset and add placeholder
       presets.forEach((preset, index) => { const option = document.createElement('option'); option.value = index.toString(); // Use index as value
           option.textContent = preset.name; presetSelect.appendChild(option); }); }
  function handlePresetChange(event) { const selectedIndex = event.target.value; if (selectedIndex === "" || !presets[selectedIndex]) return; const selectedPreset = presets[selectedIndex]; applyOptions(selectedPreset.options); updateStatus(`Preset "${selectedPreset.name}" loaded.`, 'info', 3000); }
  function resetPresetSelection() { if(presetSelect) presetSelect.value = ""; }

  // --- NEW Apply Options Logic (Used by Presets, Reset, and Load) ---
  function applyOptions(optionsToApply) { if (!optionsForm) return; console.log("Applying options:", optionsToApply); let needsUpdateAvailability = false; for (const key in optionsToApply) { const value = optionsToApply[key]; const element = optionsForm.elements[key]; if (element) { // Check if element exists
          if (element.type === 'radio' || element.type === 'checkbox') { // Handle radio/checkbox if they existed
              // Find the specific radio button by value if it's a group
              if (element.length > 0 && element[0].type === 'radio') { const targetRadio = Array.from(element).find(r => r.value === value); if (targetRadio) targetRadio.checked = true; } else { // Checkbox
                  element.checked = (value === 'true' || value === true); } } else { // Other elements (select, range, number, hidden)
              element.value = value; } // Manually trigger updates for sliders linked to number inputs
          if (element.type === 'range') { const numInputId = `${element.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { numInput.value = value; // Sync number input too
               } } // Set flag if mode or color mode changed
          if (key === 'mode' || key === 'color_mode' || key === 'palette_selector') { needsUpdateAvailability = true; } // Trigger a 'change' event on the element to ensure framework/other listeners react
          // (Using setTimeout 0 allows the value to be set before the event fires reliably)
          setTimeout(() => element.dispatchEvent(new Event('change', { bubbles: true })), 0); } else { console.warn(`Option key "${key}" with value "${value}" not found in form.`); } } // After loop, update availability if needed and enable button
       setTimeout(() => { if (needsUpdateAvailability) { updateOptionsAvailability(); } // Enable update button if an image is loaded
          if (currentFile && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }, 50); // Delay slightly to ensure all changes propagated
   }

  // --- NEW Save/Load Options Logic ---
  function handleSaveOptions() { if (!optionsForm || !downloadLink) return; const currentOptions = {}; const formData = new FormData(optionsForm); // Use defaultOptions keys as the canonical list of settings to save
       Object.keys(defaultOptions).forEach(key => { if (formData.has(key)) { currentOptions[key] = formData.get(key); } }); try { const jsonString = JSON.stringify(currentOptions, null, 2); // Pretty print
           const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' }); const url = URL.createObjectURL(blob); downloadLink.href = url; downloadLink.download = 'vectorise-options.json'; downloadLink.click(); URL.revokeObjectURL(url); updateStatus('Settings saved.', 'success', 2000); } catch (e) { console.error('Error saving options:', e); updateStatus('Error saving settings.', 'error'); } }
  function handleLoadOptionsFile(event) { if (!event.target.files || event.target.files.length === 0) return; const file = event.target.files[0]; if (file.type !== 'application/json') { updateStatus('Error: Please select a valid .json settings file.', 'error'); optionsFileInput.value = ''; // Reset file input
           return; } const reader = new FileReader(); reader.onload = (e) => { try { const loadedOptions = JSON.parse(e.target.result); // Validation: Check if it's an object
               if (typeof loadedOptions !== 'object' || loadedOptions === null || Array.isArray(loadedOptions)) { throw new Error("Invalid JSON structure. Expected an object."); } // Validation: Check if it contains *at least some* valid keys
               const knownKeys = Object.keys(defaultOptions); const loadedKeys = Object.keys(loadedOptions); const hasKnownKey = knownKeys.some(key => loadedKeys.includes(key)); if (!hasKnownKey) { throw new Error("JSON does not contain recognizable options."); } // Apply the loaded options
               applyOptions(loadedOptions); updateStatus('Settings loaded successfully.', 'success', 3000); resetPresetSelection(); // Deselect preset dropdown
            } catch (error) { console.error('Error loading options file:', error); updateStatus(`Error loading settings: ${error.message}`, 'error'); } finally { optionsFileInput.value = ''; // Reset file input regardless of success/failure
            } }; reader.onerror = () => { updateStatus('Error reading settings file.', 'error'); optionsFileInput.value = ''; // Reset file input
       }; reader.readAsText(file); }

  // --- Download Logic ---
  function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }
  // --- Copy Logic REMOVED ---

  // --- Utility Functions ---
  let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { const target = appView && !appView.classList.contains('hidden') ? statusArea : landingStatusArea; if(!target) return; clearTimeout(statusClearTimer); target.textContent = message; // Reset classes first
       target.className = `status-area ${appView && !appView.classList.contains('hidden') ? 'app-status' : 'landing-status'}`; // Add specific class for type if provided
       if (type) { target.classList.add(type); } if(type!=='error'&&clearDelay>0&&message!=='') { statusClearTimer=setTimeout(()=>{ // Check if the status message is still the one we set before clearing
           if(target.textContent===message) { target.textContent = ''; target.className = `status-area ${appView && !appView.classList.contains('hidden') ? 'app-status' : 'landing-status'}`; // Clear class too
            } }, clearDelay); } if(type === 'error'){ console.error("UI Status:", message); } }
  function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Error:", message); } }
  function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(clearStatusToo) updateStatus('', ''); }

  // --- Initial State Calls ---
  updateOptionsAvailability(); // Call before storing defaults to ensure disabled state is correct initially
  storeDefaultOptions(); // Store defaults *after* initial availability check
  populatePresetSelect();
  updateZoomButtons();
  console.log("vectorise.me script initialized (Presets Added).");

}); // End DOMContentLoaded