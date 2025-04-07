// public/script.js - Final COMPLETE version for Backend Processing + Modern UI + All Features

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements (Comprehensive List) ---
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName'); // In file info area
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const appHeader = document.querySelector('.app-header');
    const uploadNewBtn = document.getElementById('uploadNewBtn'); // In app header

    // App View Elements
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn'); // Now "Update Vectorization"
    const statusArea = document.getElementById('statusArea'); // App status
    const resetOptionsBtn = document.getElementById('resetOptionsBtn'); // Reset button

    // Result Panel Elements
    const svgOutputDiv = document.getElementById('svgOutput'); // Where SVG string is put
    const svgCodeTextarea = document.getElementById('svgCode'); // Hidden for copy
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Comparison Slider Elements
    const comparisonContainer = document.getElementById('comparisonContainer');
    const comparisonOriginalImage = document.getElementById('comparisonOriginalImage');
    const comparisonSvgLayer = document.getElementById('comparisonSvgLayer');
    const svgOutputWrapper = document.getElementById('svgOutputWrapper'); // Wrapper for SVG scaling/positioning
    const comparisonSlider = document.getElementById('comparisonSlider');

    // Zoom Elements
     const zoomPanContainer = document.getElementById('zoomPanContainer');
     const zoomInBtn = document.getElementById('zoomInBtn');
     const zoomOutBtn = document.getElementById('zoomOutBtn');
     const zoomResetBtn = document.getElementById('zoomResetBtn');

    // Other Elements
    const downloadLink = document.getElementById('downloadLink'); // Hidden link

    // Option Controllers & Groups (Ensure these IDs match HTML)
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    // Add other group refs if needed


    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {}; // Store default values on load
    let isDraggingSlider = false;
    // Zoom/Pan State
    let scale = 1;
    let panning = false;
    let pointX = 0; let pointY = 0;
    let start = { x: 0, y: 0 };
    let currentImageDimensions = { width: 0, height: 0 }; // For dimension sync


    // --- Initial UI Setup ---
    if (!landingView || !appView || !optionsForm || !comparisonContainer || !zoomPanContainer) {
        console.error("Fatal Error: Essential page structure elements missing!");
        alert("Error initializing the application UI. Please try refreshing.");
        return; // Stop script execution if critical elements are missing
    }
    showLandingView();
    storeDefaultOptions(); // Store initial values from the form
    updateOptionsAvailability(); // Set initial disabled/enabled states
    setupComparisonSlider(); // Setup comparison slider listeners
    setupZoomPan(); // Setup zoom/pan listeners

    // --- Comparison Image Load Listener ---
    if (comparisonOriginalImage) {
        comparisonOriginalImage.onload = () => {
            console.log("Original comparison image loaded metadata");
            currentImageDimensions.width = comparisonOriginalImage.naturalWidth;
            currentImageDimensions.height = comparisonOriginalImage.naturalHeight;
            // Calculate and apply dimensions based on container AFTER image info is known
            calculateAndApplyDimensions();
        };
        comparisonOriginalImage.onerror = () => {
             console.error("Failed to load original image into comparison view.");
             comparisonOriginalImage.src = '#'; // Clear broken src
        }
    } else { console.error("Comparison original image element not found"); }


    // --- Drag and Drop ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); /* Needed */ dropZone?.classList.add('dragover'); }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) {
        e.preventDefault(); e.stopPropagation();
        dropZone?.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    }
    if (dropZone) {
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
        // Click on zone (but not button inside) triggers file input
        dropZone.addEventListener('click', (e) => {
             if (e.target !== imageInput && !e.target.closest('button, label')) {
                 imageInput?.click();
             }
        });
    } else { console.error("Drop zone not found"); }

    // --- Event Listeners Setup (with null checks) ---
    function safeAddListener(element, event, handler, options) {
         if (element) element.addEventListener(event, handler, options);
         else console.warn(`Element not found for listener: ${element?.id || 'unknown'} on event '${event}'`);
    }

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
    safeAddListener(zoomInBtn, 'click', () => zoom(1.2));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.2));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);

    // Option form change listener (for enabling update button)
    if (optionsForm) {
        optionsForm.addEventListener('change', () => {
            if (currentSvgContent && convertBtn) {
                convertBtn.disabled = false;
                convertBtn.textContent = 'Update Vectorization';
            }
        });
        // Slider value display updates
        optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplayId = `${slider.id}Value`;
            const valueDisplay = document.getElementById(valueDisplayId);
            if (!valueDisplay || !slider) return;
            const updateDisplay = () => {
                let displayValue = slider.value;
                 switch (slider.id) {
                    case 'optCornerThreshold': displayValue += '°'; break;
                    case 'optFilterSpeckle': displayValue += ' px'; break;
                    case 'optColorPrecision': displayValue += ' bits'; break;
                    case 'optPathPrecision': displayValue += ' dec'; break;
                    case 'optSpliceThreshold': displayValue += '°'; break;
                    case 'optSegmentLength': displayValue = parseFloat(displayValue).toFixed(1); break;
                    case 'optGradientStep': displayValue = parseFloat(displayValue).toFixed(1); break;
                 }
                valueDisplay.textContent = displayValue;
            };
            updateDisplay();
            safeAddListener(slider, 'input', updateDisplay);
        });
    }

    // SVG Path Hover Listener
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

    // Window Resize Listener
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(calculateAndApplyDimensions, 150); // Debounced
    });


    // --- File Handling ---
    function handleFileSelectChange(event) {
        if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]);
        else resetAppToLanding();
    }
    function handleFile(file) {
        if (!file) { resetAppToLanding(); return; }
        if(landingStatusArea) landingStatusArea.textContent = '';

        const validationError = validateFile(file);
        if (validationError) { showLandingError(validationError); resetAppToLanding(); return; }

        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL);
        currentFileObjectURL = URL.createObjectURL(file);
        if (comparisonOriginalImage) comparisonOriginalImage.src = currentFileObjectURL;
        else console.error("Comparison original image element not found");

        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (fileInfoArea) fileInfoArea.classList.remove('hidden');
        if (dropZone) dropZone.style.display = 'none';
        if (uploadProgress) uploadProgress.classList.add('hidden'); // Hide progress until start clicked
        if (startConversionBtn) startConversionBtn.classList.remove('hidden');
        if (uploadArea) uploadArea.classList.add('file-selected');
    }
    function validateFile(file) {
        if (!file) return "No file provided.";
        if (file.size > 15 * 1024 * 1024) return 'Error: File exceeds 15MB limit.';
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
            return `Error: Unsupported type (${file.type||'?'}). Use JPG, PNG, WEBP, BMP.`;
        }
        return null;
    }

    // --- Conversion ---
    function triggerConversionFromLanding() {
        if (!currentFile || !startConversionBtn || !uploadProgress || !fileInfoArea) return;
        startConversionBtn.classList.add('hidden');
        fileInfoArea.style.display = 'none';
        uploadProgress.classList.remove('hidden');
        simulateUploadProgress(() => {
            showAppView();
            handleConvert(true);
        });
    }
    async function handleConvert(isInitial = false) {
        if (!currentFile) { updateStatus('No file selected.', 'error'); return; }
        if (!convertBtn || !downloadBtn || !copyBtn) { console.error("Conversion buttons not found"); return; }

        updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading');
        convertBtn.disabled = true; convertBtn.textContent = 'Working...';
        downloadBtn.disabled = true; copyBtn.disabled = true;
        // Set placeholder text based on action
        if(svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;


        const formData = new FormData();
        formData.append('imageFile', currentFile);
        if (optionsForm) {
             const optionsData = new FormData(optionsForm);
             for (let [key, value] of optionsData.entries()) {
                 const element = optionsForm.elements[key];
                 if (element && !element.disabled && value !== '' && value !== null) {
                     formData.append(key, value);
                 }
             }
         }

        console.log("Sending data to /convert...");
        try {
            const response = await fetch('/convert', { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || `Server error: ${response.status}`);
            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) {
                     svgOutputDiv.innerHTML = currentSvgContent; // Display SVG
                     svgOutputDiv.classList.remove('placeholder-text');
                 }
                if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent; // For copy
                updateStatus('Vectorization Complete!', 'success', 3000);
                if (downloadBtn) downloadBtn.disabled = false;
                if (copyBtn) copyBtn.disabled = false;
                if (convertBtn) {
                    convertBtn.textContent = 'Update Vectorization';
                    convertBtn.disabled = true; // Disable until option changes
                }
                 // Apply dimensions AFTER new SVG is in the DOM
                 setTimeout(calculateAndApplyDimensions, 50);
                 resetComparisonSlider();
                 resetZoomPan(); // Reset zoom/pan too
             } else throw new Error("Server response ok but no SVG data.");
        } catch (error) {
            console.error('Conversion Request Failed:', error);
            updateStatus(`Error: ${error.message}`, 'error');
             if (svgOutputDiv) { // Show error in preview area
                  svgOutputDiv.innerHTML = `<p class="placeholder-text" style="color:var(--danger-color);">${error.message || 'Conversion Failed'}</p>`;
                  svgOutputDiv.classList.add('placeholder-text');
             }
            if (downloadBtn) downloadBtn.disabled = true;
            if (copyBtn) copyBtn.disabled = true;
            if (convertBtn) convertBtn.disabled = !currentFile;
            if (convertBtn) convertBtn.textContent = 'Update Vectorization';
        }
    }
    function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar ) return;
        let progress = 0;
        progressBar.style.width = `0%`;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 10;
            if (progress >= 100) {
                progress = 100; clearInterval(interval);
                progressBar.style.width = `100%`;
                setTimeout(callback, 200);
            } else progressBar.style.width = `${progress}%`;
        }, 80);
    }

    // --- Dimension Calculation ---
    function calculateAndApplyDimensions() {
        if (!comparisonContainer || !comparisonOriginalImage || !svgOutputWrapper || !currentImageDimensions.width || currentImageDimensions.width <= 0) {
            // console.warn("Cannot calculate dimensions: Missing elements or original image dimensions not loaded.");
            return; // Exit if prerequisites not met
        }
        const containerWidth = comparisonContainer.clientWidth;
        const containerHeight = comparisonContainer.clientHeight;
        if (containerWidth <= 0 || containerHeight <= 0) return; // Skip if container hidden/zero size

        const imgRatio = currentImageDimensions.width / currentImageDimensions.height;
        const containerRatio = containerWidth / containerHeight;
        let targetWidth, targetHeight;

        if (imgRatio > containerRatio) { targetWidth = containerWidth; targetHeight = containerWidth / imgRatio; }
        else { targetHeight = containerHeight; targetWidth = containerHeight * imgRatio; }

        targetWidth = Math.max(1, Math.floor(targetWidth));
        targetHeight = Math.max(1, Math.floor(targetHeight));

        // Apply dimensions to force overlay alignment
        comparisonOriginalImage.style.width = `${targetWidth}px`;
        comparisonOriginalImage.style.height = `${targetHeight}px`;
        svgOutputWrapper.style.width = `${targetWidth}px`;
        svgOutputWrapper.style.height = `${targetHeight}px`;
    }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() {
        if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) return;
        let isDragging = false; // Use local variable for slider drag state
        const moveSlider = (clientX) => {
            const rect = comparisonContainer.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
            let percentage = (x / rect.width) * 100;
            comparisonSlider.style.left = `${percentage}%`;
            comparisonSvgLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };
        const onPointerDown = (e) => {
            if (e.button !== 0 && e.type !== 'touchstart') return;
            e.preventDefault(); isDragging = true;
            comparisonSlider.classList.add('dragging'); comparisonContainer.style.cursor = 'ew-resize';
            moveSlider(e.clientX ?? e.touches?.[0]?.clientX);
            window.addEventListener('mousemove', onPointerMove); window.addEventListener('touchmove', onPointerMove, { passive: false });
            window.addEventListener('mouseup', onPointerUp); window.addEventListener('touchend', onPointerUp);
        };
        const onPointerMove = (e) => { if (!isDragging) return; e.preventDefault(); moveSlider(e.clientX ?? e.touches?.[0]?.clientX); };
        const onPointerUp = () => {
            if (!isDragging) return; isDragging = false;
            comparisonSlider.classList.remove('dragging'); comparisonContainer.style.cursor = 'default';
            window.removeEventListener('mousemove', onPointerMove); window.removeEventListener('touchmove', onPointerMove);
            window.removeEventListener('mouseup', onPointerUp); window.removeEventListener('touchend', onPointerUp);
        };
        comparisonContainer.addEventListener('mousedown', onPointerDown);
        comparisonContainer.addEventListener('touchstart', onPointerDown, { passive: false });
    }
    function resetComparisonSlider() {
        if (comparisonSlider) comparisonSlider.style.left = '50%';
        if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)';
    }

    // --- Zoom and Pan Logic ---
    function setTransform() { if (comparisonContainer) comparisonContainer.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`; }
    function setupZoomPan() {
        if (!zoomPanContainer || !comparisonContainer) return;
        const startPan = (e) => { if (e.button !== 0 && e.type !== 'touchstart') return; e.preventDefault(); panning = true; start = { x: (e.clientX ?? e.touches[0].clientX) - pointX, y: (e.clientY ?? e.touches[0].clientY) - pointY }; zoomPanContainer.classList.add('grabbing'); window.addEventListener('mousemove', panMove); window.addEventListener('touchmove', panMove, { passive: false }); window.addEventListener('mouseup', endPan); window.addEventListener('touchend', endPan); };
        const panMove = (e) => { if (!panning) return; e.preventDefault(); const currentX = e.clientX ?? e.touches[0].clientX; const currentY = e.clientY ?? e.touches[0].clientY; pointX = currentX - start.x; pointY = currentY - start.y; setTransform(); };
        const endPan = () => { if (!panning) return; panning = false; zoomPanContainer.classList.remove('grabbing'); window.removeEventListener('mousemove', panMove); window.removeEventListener('touchmove', panMove); window.removeEventListener('mouseup', endPan); window.removeEventListener('touchend', endPan); };
        zoomPanContainer.addEventListener('wheel', (e) => { e.preventDefault(); const xs = (e.clientX - pointX) / scale; const ys = (e.clientY - pointY) / scale; const delta = -e.deltaY; const zoomFactor = 1.1; let newScale = (delta > 0) ? scale * zoomFactor : scale / zoomFactor; newScale = Math.max(0.2, Math.min(10, newScale)); pointX = e.clientX - xs * newScale; pointY = e.clientY - ys * newScale; scale = newScale; setTransform(); });
        zoomPanContainer.addEventListener('mousedown', startPan);
        zoomPanContainer.addEventListener('touchstart', startPan, { passive: false });
    }
    function zoom(factor) {
        if (!comparisonContainer || !zoomPanContainer) return;
        const rect = zoomPanContainer.getBoundingClientRect(); const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2;
        const xs = (centerX - pointX) / scale; const ys = (centerY - pointY) / scale;
        const newScale = Math.max(0.2, Math.min(10, scale * factor));
        pointX = centerX - xs * newScale; pointY = centerY - ys * newScale; scale = newScale; setTransform();
    }
    function resetZoomPan() { scale = 1; pointX = 0; pointY = 0; setTransform(); calculateAndApplyDimensions(); }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) {
        const target = event.target;
        if (target.tagName === 'path' && target.closest('svg')) {
            if (event.type === 'mouseover') target.classList.add('path-hover');
            else if (event.type === 'mouseout') target.classList.remove('path-hover');
        }
    }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); resetComparisonSlider(); resetZoomPan(); updateStatus('', ''); }
    function resetAppToLanding() {
        currentFile = null; currentSvgContent = '';
        if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = '';
        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        if (comparisonOriginalImage) { comparisonOriginalImage.src = '#'; comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height=''; }
        if (svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; }
        currentImageDimensions = { width: 0, height: 0 };
        showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = '';
        resetComparisonSlider(); resetZoomPan();
    }
    function resetUploadAreaVisuals(){ if(dropZone) dropZone.style.display = 'flex'; if(fileInfoArea) fileInfoArea.classList.add('hidden'); if(uploadProgress) uploadProgress.classList.add('hidden'); if(startConversionBtn) startConversionBtn.classList.add('hidden'); if(uploadArea) uploadArea.classList.remove('file-selected'); if(progressBar) progressBar.style.width = '0%'; }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() {
        if (!modeSelect || !colormodeSelect) return;
        const currentMode = modeSelect.value; const currentColorMode = colormodeSelect.value;
        const isSpline = currentMode === 'spline'; const isPixel = currentMode === 'pixel'; const isColor = currentColorMode === 'color';
        toggleOptionGroup(splineThresholdGroup, isSpline); toggleOptionGroup(spliceThresholdGroup, isSpline);
        toggleOptionGroup(segmentLengthGroup, isSpline); toggleOptionGroup(cornerThresholdGroup, !isPixel);
        toggleOptionGroup(hierarchicalGroup, isColor); toggleOptionGroup(gradientStepGroup, isColor);
        toggleOptionGroup(colorPrecisionGroup, isColor);
    }
    function toggleOptionGroup(groupElement, enable) {
        if (!groupElement) return;
        const controls = groupElement.querySelectorAll('input, select');
        if (enable) { groupElement.classList.remove('disabled'); controls.forEach(control => { if(control) control.disabled = false; }); }
        else { groupElement.classList.add('disabled'); controls.forEach(control => { if(control) control.disabled = true; }); }
    }

    // --- Option Reset ---
    function storeDefaultOptions() {
        if (!optionsForm) return;
        const formData = new FormData(optionsForm);
        for (let [key, value] of formData.entries()) defaultOptions[key] = value;
        console.log("Stored default options:", defaultOptions);
    }
    function handleResetOptions() {
        if (!optionsForm) return;
        console.log("Resetting options to:", defaultOptions);
        for (const key in defaultOptions) {
            const element = optionsForm.elements[key];
            if (element) {
                 element.value = defaultOptions[key];
                 if (element.type === 'range') element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        updateOptionsAvailability(); // Re-apply conditional disabling
        if(currentFile && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; }
        updateStatus('Options reset to default.', 'success', 2000);
    }

    // --- Download and Copy Logic ---
    function handleDownload() {
         if (!currentSvgContent || !downloadLink) return;
         try {
             const svgBlob = new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(svgBlob);
             downloadLink.href=url; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(url);
         } catch(e){ console.error("Download failed:", e); updateStatus('Error downloading','error');}
    }
    function handleCopy() {
         if (!svgCodeTextarea || !svgCodeTextarea.value || !copyBtn) return;
         navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{
             const originalText = copyBtn.textContent; const originalBg = copyBtn.style.backgroundColor;
             copyBtn.textContent='Copied!'; copyBtn.style.backgroundColor='var(--success-color)'; copyBtn.style.color='white'; // Use CSS var
             setTimeout(()=>{ copyBtn.textContent=originalText; copyBtn.style.backgroundColor=''; copyBtn.style.color=''; }, 1500);
         }).catch(e=>{ console.error('Failed to copy:',e); updateStatus('Failed to copy code','error'); });
    }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
        const targetStatusArea = appView.classList.contains('hidden') ? landingStatusArea : statusArea;
        if(!targetStatusArea) { console.error("Status area not found for message:", message); return; }
        clearTimeout(statusClearTimer); targetStatusArea.textContent = message;
        targetStatusArea.className = `status-area ${appView.classList.contains('hidden') ? 'landing-status' : 'app-status'} ${type}`; // Base class + view + type
        if (type !== 'error' && clearDelay > 0 && message !== '') { statusClearTimer = setTimeout(() => { if (targetStatusArea.textContent === message) updateStatus('', ''); }, clearDelay); }
        if(type === 'error'){ console.error("UI Status:", message); }
    }
    function showLandingError(message) {
        if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; }
        else { console.error("Landing Status Error:", message); }
    }
    function resetResultArea(clearStatusToo = true) {
        if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); }
        if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = '';
        if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true;
        if(clearStatusToo) updateStatus('', '');
        resetComparisonSlider();
        if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } // Clear explicit size
    }

    // --- Initial State Calls ---
    updateOptionsAvailability(); // Set initial option disabled states based on defaults

}); // End DOMContentLoaded