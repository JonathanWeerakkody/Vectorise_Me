// public/script.js - FINAL Stable Version (Side-by-Side, No Slider/OverlayFix/Zoom)

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
    const svgOutputDiv = document.getElementById('svgOutput'); // SVG injection target
    const previewOriginalImage = document.getElementById('previewOriginalImage'); // Original image element
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadLink = document.getElementById('downloadLink');

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
    // Simplified check list (removed comparison/zoom specific)
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, dropZone, previewOriginalImage, modeSelect, colormodeSelect, resetOptionsBtn, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error."); return; }
    console.log("Initial element checks passed.");

    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};
    // No dimension, slider, or zoom state needed

    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if (!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    // NO setupComparisonSlider or setupZoomPan calls needed

    // --- Original Preview Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { console.log("Original preview loaded."); });
    safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed to load original preview image."); if(previewOriginalImage) previewOriginalImage.src = '#'; });

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
    // Option form change listener
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); /* Slider display updates */ optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const vId=`${slider.id}Value`, vEl=document.getElementById(vId); if(!vEl||!slider)return; const uD=()=>{let v=slider.value; switch(slider.id){/*cases*/} if(vEl)vEl.textContent=v;}; uD(); safeAddListener(slider,'input',uD); }); }
    // NO Window Resize Listener needed

    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) { if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const validationError = validateFile(file); if (validationError) { showLandingError(validationError); resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { /* Error Handling */ resetAppToLanding(); return; } if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); }
    function validateFile(file) { if (!file) return "No file."; if (file.size > 15 * 1024 * 1024) return 'Error: File > 15MB.'; if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn || !uploadProgress || !fileInfoArea) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) { if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; copyBtn.disabled = true; if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`; const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null) formData.append(key, value); } } console.log("Sending data..."); try { const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error: ${res.status}`); if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent; updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (copyBtn) copyBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; } /* No Dimension Calculation */ /* No Slider Reset */ } else throw new Error("No SVG data."); } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error'); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (copyBtn) copyBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } }
    function simulateUploadProgress(callback) { if (!uploadProgress || !progressBar ) return; let p = 0; progressBar.style.width = `0%`; const i = setInterval(() => { p += Math.random()*15+10; if (p>=100){ p=100; clearInterval(i); progressBar.style.width=`100%`; setTimeout(callback,200); } else progressBar.style.width=`${p}%`; }, 80); }

    // --- Dimension Calculation REMOVED ---
    // --- Comparison Slider Logic REMOVED ---
    // --- Zoom and Pan Logic REMOVED ---

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { const t=event.target; if(t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); /* No Slider Reset */ updateStatus('', ''); }
    function resetAppToLanding() { currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = ''; if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; } if(previewOriginalImage) { previewOriginalImage.src = '#'; } /* No wrapper style resets */ showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = ''; }
    function resetUploadAreaVisuals(){ if(dropZone) dropZone.style.display = 'flex'; if(fileInfoArea) fileInfoArea.classList.add('hidden'); if(uploadProgress) uploadProgress.classList.add('hidden'); if(startConversionBtn) startConversionBtn.classList.add('hidden'); if(uploadArea) uploadArea.classList.remove('file-selected'); if(progressBar) progressBar.style.width = '0%'; }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { if (!modeSelect || !colormodeSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(colorPrecisionGroup,cl); }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }

    // --- Option Reset ---
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) defaultOptions[key] = value; console.log("Stored defaults:", defaultOptions); }
    function handleResetOptions() { if (!optionsForm) return; console.log("Resetting options:", defaultOptions); for (const key in defaultOptions) { const el = optionsForm.elements[key]; if (el) { el.value = defaultOptions[key]; if (el.type==='range') el.dispatchEvent(new Event('input',{bubbles:true}));}} updateOptionsAvailability(); if(currentFile&&convertBtn){ convertBtn.disabled=false; convertBtn.textContent='Update Vectorization';} updateStatus('Options reset.', 'success', 2000); }

    // --- Download and Copy Logic ---
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }
    function handleCopy() { if (!svgCodeTextarea || !svgCodeTextarea.value || !copyBtn) return; navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{ const oT=copyBtn.textContent,oB=copyBtn.style.backgroundColor; copyBtn.textContent='Copied!'; copyBtn.style.backgroundColor='var(--success-color)'; copyBtn.style.color='white'; setTimeout(()=>{ copyBtn.textContent=oT; copyBtn.style.backgroundColor=oB; copyBtn.style.color=''; }, 1500); }).catch(e=>{ console.error(e); updateStatus('Failed to copy','error'); }); }

    // --- Utility Functions ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { const target = appView && !appView.classList.contains('hidden') ? statusArea : landingStatusArea; if(!target) return; clearTimeout(statusClearTimer); target.textContent = message; target.className = `status-area ${appView && !appView.classList.contains('hidden') ? 'app-status' : 'landing-status'} ${type}`; if(type!=='error'&&clearDelay>0&&message!=='') { statusClearTimer=setTimeout(()=>{ if(target.textContent===message) updateStatus('',''); }, clearDelay); } if(type === 'error'){ console.error("UI Status:", message); } }
    function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Error:", message); } }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true; if(clearStatusToo) updateStatus('', ''); /* No wrapper style reset */ /* No slider reset */ }


    // --- Initial State Calls ---
    updateOptionsAvailability();
    console.log("vectorise.me script initialized successfully (Stable Side-by-Side).");

}); // End DOMContentLoaded