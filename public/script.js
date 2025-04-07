// public/script.js - Simplified for Side-by-Side Preview

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
    const statusArea = document.getElementById('statusArea'); // App status area
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const svgOutputDiv = document.getElementById('svgOutput'); // SVG preview injection target
    const previewOriginalImage = document.getElementById('previewOriginalImage'); // IMG tag for original
    const svgCodeTextarea = document.getElementById('svgCode'); // Hidden
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

    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null; // URL for original preview <img>
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};

    // --- Initial UI Setup ---
    // Simplified Element Check
    const criticalElementRefs = { landingView, appView, imageInput, dropZone, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, copyBtn, uploadNewBtn, resetOptionsBtn, modeSelect, colormodeSelect, previewOriginalImage };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error."); return; }
    console.log("Initial element checks passed.");

    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    // NO setupComparisonSlider call needed

    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { /* ... same ... */ }

    // --- Drag and Drop (Keep Same) ---
    function handleDragEnter(e) { /* ... */ } function handleDragOver(e) { /* ... */ } function handleDragLeave(e) { /* ... */ } function handleDrop(e) { /* ... */ }
    if (dropZone) { /* ... listeners ... */ }

    // --- Event Listeners Setup ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false)); // "Update" button
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(copyBtn, 'click', handleCopy);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover); // Keep hover effect
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

    // Option form change listener (enables Update button)
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); /* Slider value display updates */ optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const vId=`${slider.id}Value`, vEl=document.getElementById(vId); if(!vEl||!slider)return; const uD=()=>{let v=slider.value; switch(slider.id){/*cases*/} if(vEl)vEl.textContent=v;}; uD(); safeAddListener(slider,'input',uD); }); }
    // Window Resize Listener (No longer needed for dimension sync) REMOVED

    // --- File Handling ---
    function handleFileSelectChange(event) { if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]); else resetAppToLanding(); }
    function handleFile(file) {
        if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const validationError = validateFile(file); if (validationError) { showLandingError(validationError); resetAppToLanding(); return; }
        currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL);
        // --- Set src for the original image preview ---
        try {
            currentFileObjectURL = URL.createObjectURL(file);
             if (previewOriginalImage) {
                previewOriginalImage.src = currentFileObjectURL;
                 console.log("Set previewOriginalImage src");
            } else { console.error("previewOriginalImage missing"); }
        } catch(e) { console.error("Error creating Object URL:", e); showLandingError("Error processing file preview."); resetAppToLanding(); return; }
        // --- Update Landing UI ---
        if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected');
    }
    function validateFile(file) { /* ... same validation logic ... */ return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { if (!currentFile || !startConversionBtn || !uploadProgress || !fileInfoArea) return; startConversionBtn.classList.add('hidden'); if (fileInfoArea) fileInfoArea.style.display = 'none'; uploadProgress.classList.remove('hidden'); simulateUploadProgress(() => { showAppView(); handleConvert(true); }); }
    async function handleConvert(isInitial = false) {
        if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) return;
        updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); convertBtn.disabled = true; convertBtn.textContent = 'Working...'; downloadBtn.disabled = true; copyBtn.disabled = true; if(svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;
        const formData = new FormData(); formData.append('imageFile', currentFile); if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null) formData.append(key, value); } }
        console.log("Sending data...");
        try {
            const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error: ${res.status}`);
            if (result.svg) {
                 currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent; updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (copyBtn) copyBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; }
                // NO dimension calculation needed here
             } else throw new Error("No SVG data.");
        } catch (error) { /* ... same error handling ... */ }
        finally { /* ... same finally block ... */ }
    }
    function simulateUploadProgress(callback) { /* ... same ... */ }

    // --- Dimension Calculation (REMOVED) ---
    // function calculateAndApplyDimensions() {} // REMOVED

    // --- Comparison Slider Logic (REMOVED) ---
    // function setupComparisonSlider() {} // REMOVED
    // function resetComparisonSlider() {} // REMOVED

    // --- SVG Path Hover Logic (Keep) ---
    function handleSvgPathHover(event) { const t=event.target; if(t.tagName==='path'&&t.closest('svg')){ if(event.type==='mouseover')t.classList.add('path-hover'); else if(event.type==='mouseout')t.classList.remove('path-hover'); } }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); /* No Slider Reset */ updateStatus('', ''); }
    function resetAppToLanding() { currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = ''; if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; } if(previewOriginalImage) { previewOriginalImage.src = '#'; } if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } // Still clear wrapper just in case
      showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = ''; }
    function resetUploadAreaVisuals(){ if(dropZone) dropZone.style.display = 'flex'; if(fileInfoArea) fileInfoArea.classList.add('hidden'); if(uploadProgress) uploadProgress.classList.add('hidden'); if(startConversionBtn) startConversionBtn.classList.add('hidden'); if(uploadArea) uploadArea.classList.remove('file-selected'); if(progressBar) progressBar.style.width = '0%'; }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { if (!modeSelect || !colormodeSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(colorPrecisionGroup,cl); }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); if(enable){ groupElement.classList.remove('disabled'); controls.forEach(c=>{if(c) c.disabled=false;}); } else { groupElement.classList.add('disabled'); controls.forEach(c=>{if(c) c.disabled=true;}); } }

    // --- Option Reset ---
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) defaultOptions[key] = value; console.log("Stored defaults:", defaultOptions); }
    function handleResetOptions() { if (!optionsForm) return; for (const key in defaultOptions) { const el = optionsForm.elements[key]; if (el) { el.value = defaultOptions[key]; if (el.type==='range') el.dispatchEvent(new Event('input',{bubbles:true}));}} updateOptionsAvailability(); if(currentFile&&convertBtn){ convertBtn.disabled=false; convertBtn.textContent='Update Vectorization';} updateStatus('Options reset.', 'success', 2000); }

    // --- Download and Copy Logic ---
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }
    function handleCopy() { if (!svgCodeTextarea || !svgCodeTextarea.value || !copyBtn) return; navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{ const oT=copyBtn.textContent,oB=copyBtn.style.backgroundColor; copyBtn.textContent='Copied!'; copyBtn.style.backgroundColor='var(--success-color)'; copyBtn.style.color='white'; setTimeout(()=>{ copyBtn.textContent=oT; copyBtn.style.backgroundColor=oB; copyBtn.style.color=''; }, 1500); }).catch(e=>{ console.error(e); updateStatus('Failed to copy','error'); }); }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) { const target = appView && !appView.classList.contains('hidden') ? statusArea : landingStatusArea; if(!target) return; clearTimeout(statusClearTimer); target.textContent = message; target.className = `status-area ${appView && !appView.classList.contains('hidden') ? 'app-status' : 'landing-status'} ${type}`; if(type!=='error'&&clearDelay>0&&message!=='') { statusClearTimer=setTimeout(()=>{ if(target.textContent===message) updateStatus('',''); }, clearDelay); } if(type === 'error'){ console.error("UI Status:", message); } }
    function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Error:", message); } }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true; if(clearStatusToo) updateStatus('', ''); /* No Slider Reset */ if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } /* No Content Wrapper Reset */ }

    // --- Initial State Calls ---
    updateOptionsAvailability();
    console.log("vectorise.me script initialized successfully (Stable Version).");

}); // End DOMContentLoaded