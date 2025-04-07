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
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, dropZone, comparisonContainer, comparisonOriginalImage, comparisonSvgLayer, svgOutputWrapper, comparisonSlider, modeSelect, colormodeSelect, resetOptionsBtn, comparisonContentWrapper, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null (likely missing ID='${key}' in HTML).`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");

    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};
    let currentImageDimensions = { width: 0, height: 0 };

    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if (!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider();

    // --- Comparison Image Load Listener ---
    safeAddListener(comparisonOriginalImage, 'load', () => {
        if (!comparisonOriginalImage) return;
        currentImageDimensions.width = comparisonOriginalImage.naturalWidth;
        currentImageDimensions.height = comparisonOriginalImage.naturalHeight;
        console.log("Original Dims Loaded:", currentImageDimensions);
        calculateAndApplyDimensions(); // Apply initial dimensions
    });
    safeAddListener(comparisonOriginalImage, 'error', () => { console.error("Failed to load original comparison image."); if (comparisonOriginalImage) comparisonOriginalImage.src = '#'; });

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
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); /* Slider value display updates */ optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); if (!valueDisplay || !slider) return; const updateDisplay = () => { let v=slider.value; switch(slider.id){ case 'optCornerThreshold': v+='°'; break; case 'optFilterSpeckle': v+=' px'; break; case 'optColorPrecision': v+=' bits'; break; case 'optPathPrecision': v+=' dec'; break; case 'optSpliceThreshold': v+='°'; break; case 'optSegmentLength': v=parseFloat(v).toFixed(1); break; case 'optGradientStep': v=parseFloat(v).toFixed(1); break; } if (valueDisplay) valueDisplay.textContent=v; }; updateDisplay(); safeAddListener(slider, 'input', updateDisplay); }); }
    // Window Resize Listener
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyDimensions, 150); });

    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) { if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const validationError = validateFile(file); if (validationError) { showLandingError(validationError); resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); currentImageDimensions = { width: 0, height: 0 }; if (comparisonOriginalImage) { comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height='';} if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; } currentFileObjectURL = URL.createObjectURL(file); if (comparisonOriginalImage) comparisonOriginalImage.src = currentFileObjectURL; if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected'); }
    function validateFile(file) { if (!file) return "No file."; if (file.size > 15 * 1024 * 1024) return 'Error: File > 15MB.'; if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) return `Error: Unsupported type (${file.type||'?'}).`; return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn || !uploadProgress || !fileInfoArea) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) { if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; copyBtn.disabled = true; if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`; const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null) formData.append(key, value); } } console.log("Sending data..."); try { const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error: ${res.status}`); if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent; updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (copyBtn) copyBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; } if (currentImageDimensions.width > 0) setTimeout(calculateAndApplyDimensions, 50); else console.warn("Cannot apply dims after convert, original dims missing."); resetComparisonSlider(); } else throw new Error("No SVG data."); } catch (error) { console.error('Conversion Failed:', error); updateStatus(`Error: ${error.message}`, 'error'); if(svgOutputDiv){ if(isInitial) resetResultArea(false); else svgOutputDiv.innerHTML = `<p class="placeholder-text" style="color:var(--danger-color);">Update Failed</p>`; } if (downloadBtn) downloadBtn.disabled = true; if (copyBtn) copyBtn.disabled = true; if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; } }
    function simulateUploadProgress(callback) { if (!uploadProgress || !progressBar ) return; let p = 0; progressBar.style.width = `0%`; const i = setInterval(() => { p += Math.random()*15+10; if (p>=100){ p=100; clearInterval(i); progressBar.style.width=`100%`; setTimeout(callback,200); } else progressBar.style.width=`${p}%`; }, 80); }

    // --- Dimension Calculation ---
    function calculateAndApplyDimensions() { if (!comparisonContainer || !comparisonOriginalImage || !svgOutputWrapper || !currentImageDimensions.width || currentImageDimensions.width <= 0 || !comparisonContentWrapper) return; const cw = comparisonContainer.clientWidth; const ch = comparisonContainer.clientHeight; if (cw <= 0 || ch <= 0) return; const imgRatio = currentImageDimensions.width / currentImageDimensions.height; const contRatio = cw / ch; let tw, th; if (imgRatio > contRatio) { tw = cw; th = tw / imgRatio; } else { th = ch; tw = th * imgRatio; } tw = Math.max(1, Math.floor(tw)); th = Math.max(1, Math.floor(th)); console.log(`Applying dimensions - W: ${tw}px, H: ${th}px`); if(comparisonOriginalImage) { comparisonOriginalImage.style.width = `${tw}px`; comparisonOriginalImage.style.height = `${th}px`; } if(svgOutputWrapper) { svgOutputWrapper.style.width = `${tw}px`; svgOutputWrapper.style.height = `${th}px`; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width = `${tw}px`; comparisonContentWrapper.style.height = `${th}px`; } }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() { if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) return; let isDragging = false; const moveSlider = (clientX) => { const rect = comparisonContainer.getBoundingClientRect(); const x = Math.max(0, Math.min(rect.width, clientX - rect.left)); let p = (x / rect.width) * 100; comparisonSlider.style.left = `${p}%`; comparisonSvgLayer.style.clipPath = `inset(0 ${100 - p}% 0 0)`; }; const onPointerDown = (e) => { if (e.button !== 0 && e.type !== 'touchstart') return; e.preventDefault(); e.stopPropagation(); isDragging = true; comparisonSlider.classList.add('dragging'); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); window.addEventListener('mousemove', onPointerMove); window.addEventListener('touchmove', onPointerMove, { passive: false }); window.addEventListener('mouseup', onPointerUp); window.addEventListener('touchend', onPointerUp); }; const onPointerMove = (e) => { if (!isDragging) return; e.preventDefault(); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); }; const onPointerUp = () => { if (!isDragging) return; isDragging = false; comparisonSlider.classList.remove('dragging'); window.removeEventListener('mousemove', onPointerMove); window.removeEventListener('touchmove', onPointerMove); window.removeEventListener('mouseup', onPointerUp); window.removeEventListener('touchend', onPointerUp); }; safeAddListener(comparisonSlider, 'mousedown', onPointerDown); safeAddListener(comparisonSlider, 'touchstart', onPointerDown, { passive: false }); }
    function resetComparisonSlider() { if (comparisonSlider) comparisonSlider.style.left = '50%'; if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)'; }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { const t=event.target; if(t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetComparisonSlider(); updateStatus('', ''); }
    function resetAppToLanding() { currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = ''; if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; } if(comparisonOriginalImage) { comparisonOriginalImage.src = '#'; comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height='';} if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; } currentImageDimensions = { width: 0, height: 0 }; showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = ''; resetComparisonSlider(); }
    function resetUploadAreaVisuals(){ if(dropZone) dropZone.style.display = 'flex'; if(fileInfoArea) fileInfoArea.classList.add('hidden'); if(uploadProgress) uploadProgress.classList.add('hidden'); if(startConversionBtn) startConversionBtn.classList.add('hidden'); if(uploadArea) uploadArea.classList.remove('file-selected'); if(progressBar) progressBar.style.width = '0%'; }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { if (!modeSelect || !colormodeSelect) return; const m=modeSelect.value; const c=colormodeSelect.value; const sp=m==='spline'; const px=m==='pixel'; const cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(colorPrecisionGroup,cl); }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }

    // --- Option Reset ---
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) defaultOptions[key] = value; console.log("Stored default options:", defaultOptions); }
    function handleResetOptions() { if (!optionsForm) return; console.log("Resetting options:", defaultOptions); for (const key in defaultOptions) { const el = optionsForm.elements[key]; if (el) { el.value = defaultOptions[key]; if (el.type==='range') el.dispatchEvent(new Event('input',{bubbles:true}));}} updateOptionsAvailability(); if(currentFile&&convertBtn){ convertBtn.disabled=false; convertBtn.textContent='Update Vectorization';} updateStatus('Options reset.', 'success', 2000); }

    // --- Download and Copy Logic ---
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }
    function handleCopy() { if (!svgCodeTextarea || !svgCodeTextarea.value || !copyBtn) return; navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{ const oT=copyBtn.textContent, oB=copyBtn.style.backgroundColor; copyBtn.textContent='Copied!'; copyBtn.style.backgroundColor='var(--success-color)'; copyBtn.style.color='white'; setTimeout(()=>{ copyBtn.textContent=oT; copyBtn.style.backgroundColor=oB; copyBtn.style.color=''; }, 1500); }).catch(e=>{ console.error('Failed to copy:',e); updateStatus('Failed to copy code','error'); }); }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) { const target = appView && !appView.classList.contains('hidden') ? statusArea : landingStatusArea; if(!target) return; clearTimeout(statusClearTimer); target.textContent = message; target.className = `status-area ${appView && !appView.classList.contains('hidden') ? 'app-status' : 'landing-status'} ${type}`; if(type!=='error'&&clearDelay>0&&message!=='') { statusClearTimer=setTimeout(()=>{ if(target.textContent===message) updateStatus('',''); }, clearDelay); } if(type === 'error'){ console.error("UI Status:", message); } }
    function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Error:", message); } }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true; if(clearStatusToo) updateStatus('', ''); resetComparisonSlider(); if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } if (comparisonContentWrapper) { comparisonContentWrapper.style.width=''; comparisonContentWrapper.style.height=''; } } // Clear explicit sizes


    // --- Initial State Calls ---
    updateOptionsAvailability();
    console.log("vectorise.me script initialized successfully.");

}); // End DOMContentLoaded