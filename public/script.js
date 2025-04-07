// public/script.js - Final version for Backend Processing + Modern UI + Comparison Slider

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
    const appHeader = document.querySelector('.app-header');
    const uploadNewBtn = document.getElementById('uploadNewBtn');

    // App View Elements
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');
    const statusArea = document.getElementById('statusArea'); // App status
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');

    // Result Panel Elements
    const svgOutputDiv = document.getElementById('svgOutput'); // Where SVG string is put
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Comparison Slider Elements
    const comparisonContainer = document.getElementById('comparisonContainer');
    const comparisonOriginalImage = document.getElementById('comparisonOriginalImage');
    const comparisonSvgLayer = document.getElementById('comparisonSvgLayer');
    const comparisonSlider = document.getElementById('comparisonSlider');

    // Other Elements
    const downloadLink = document.getElementById('downloadLink');

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
    let currentFileObjectURL = null; // Store URL for original image preview
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {};
    let isDraggingSlider = false;

    // --- Initial UI Setup ---
    if (!landingView || !appView) {
        console.error("Fatal Error: Landing or App view containers not found!");
        return; // Stop if essential layout parts are missing
    }
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider();

    // --- Drag and Drop ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); /* Needed to allow drop */ dropZone?.classList.add('dragover'); }
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
        dropZone.addEventListener('click', () => imageInput?.click());
    } else { console.error("Drop zone not found"); }

    // --- Event Listeners ---
    if (imageInput) imageInput.addEventListener('change', handleFileSelectChange);
    if (cancelUploadBtn) cancelUploadBtn.addEventListener('click', resetAppToLanding);
    if (startConversionBtn) startConversionBtn.addEventListener('click', triggerConversionFromLanding);
    if (convertBtn) convertBtn.addEventListener('click', () => handleConvert(false));
    if (downloadBtn) downloadBtn.addEventListener('click', handleDownload);
    if (copyBtn) copyBtn.addEventListener('click', handleCopy);
    if (uploadNewBtn) uploadNewBtn.addEventListener('click', resetAppToLanding);
    if (resetOptionsBtn) resetOptionsBtn.addEventListener('click', handleResetOptions);

    // Option change listeners
    if (modeSelect) modeSelect.addEventListener('change', updateOptionsAvailability);
    if (colormodeSelect) colormodeSelect.addEventListener('change', updateOptionsAvailability);
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
            slider.addEventListener('input', updateDisplay);
        });
    }


    // --- File Handling ---
    function handleFileSelectChange(event) {
         if (event.target.files && event.target.files.length > 0) handleFile(event.target.files[0]);
         else resetAppToLanding(); // Handle clearing file input selection
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
        if (uploadProgress) uploadProgress.classList.add('hidden');
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
        fileInfoArea.style.display = 'none'; // Hide file info line during progress
        uploadProgress.classList.remove('hidden');
        simulateUploadProgress(() => {
            showAppView();
            handleConvert(true); // Pass true for initial conversion
        });
    }
    async function handleConvert(isInitial = false) {
        if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) { return; }

        updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading');
        convertBtn.disabled = true; convertBtn.textContent = 'Working...';
        downloadBtn.disabled = true; copyBtn.disabled = true;
        if (!isInitial && svgOutputDiv) {
             svgOutputDiv.innerHTML = '<p class="placeholder-text">Updating preview...</p>';
         } else if (svgOutputDiv) {
             svgOutputDiv.innerHTML = '<p class="placeholder-text">Processing...</p>';
         }

        const formData = new FormData();
        formData.append('imageFile', currentFile);
        const optionsData = new FormData(optionsForm);
        for (let [key, value] of optionsData.entries()) {
            const element = optionsForm.elements[key];
            if (element && !element.disabled && value !== '' && value !== null) formData.append(key, value);
        }

        console.log("Sending data to /convert...");
        try {
            const response = await fetch('/convert', { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || `Server error: ${response.status}`);
            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) {
                     svgOutputDiv.innerHTML = currentSvgContent;
                     svgOutputDiv.classList.remove('placeholder-text');
                 }
                if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent;
                updateStatus('Vectorization Complete!', 'success', 3000);
                if (downloadBtn) downloadBtn.disabled = false;
                if (copyBtn) copyBtn.disabled = false;
                if (convertBtn) {
                    convertBtn.textContent = 'Update Vectorization';
                    convertBtn.disabled = true; // Disable until option changes
                }
                resetComparisonSlider(); // Reset slider after new SVG loads
            } else throw new Error("Server response ok but no SVG data.");
        } catch (error) {
            console.error('Conversion Request Failed:', error);
            updateStatus(`Error: ${error.message}`, 'error');
            if (svgOutputDiv && !isInitial) { // Only clear on update if failed
                svgOutputDiv.innerHTML = '<p class="placeholder-text" style="color:red;">Update Failed</p>';
             } else if (svgOutputDiv) { // Clear on initial failure
                  resetResultArea(false);
             }
            if (downloadBtn) downloadBtn.disabled = true;
            if (copyBtn) copyBtn.disabled = true;
            if (convertBtn) convertBtn.disabled = !currentFile; // Allow retry
            if (convertBtn) convertBtn.textContent = 'Update Vectorization';
        }
    }
    function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar) return;
        let progress = 0;
        progressBar.style.width = `0%`;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 10; // Faster simulation
            if (progress >= 100) {
                progress = 100; clearInterval(interval);
                progressBar.style.width = `100%`;
                setTimeout(callback, 200);
            } else progressBar.style.width = `${progress}%`;
        }, 80);
    }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() {
        if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) {
             console.warn("Comparison slider elements not found, slider disabled.");
             return;
        }

        let isDragging = false;
        const moveSlider = (clientX) => {
            const rect = comparisonContainer.getBoundingClientRect();
            // Calculate x relative to the container, clamping between 0 and rect.width
            const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
            let percentage = (x / rect.width) * 100;

            comparisonSlider.style.left = `${percentage}%`;
            comparisonSvgLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        const onPointerDown = (e) => {
            // Only react to left mouse button or touch
            if (e.button !== 0 && e.type !== 'touchstart') return;
            e.preventDefault();
            isDragging = true;
            comparisonSlider.classList.add('dragging');
            comparisonContainer.style.cursor = 'ew-resize'; // Change container cursor
            moveSlider(e.clientX ?? e.touches?.[0]?.clientX); // Use nullish coalescing
            window.addEventListener('mousemove', onPointerMove);
            window.addEventListener('touchmove', onPointerMove, { passive: false }); // Need passive false for touchmove preventDefault
            window.addEventListener('mouseup', onPointerUp);
            window.addEventListener('touchend', onPointerUp);
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent page scrolling on touch
            moveSlider(e.clientX ?? e.touches?.[0]?.clientX);
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            comparisonSlider.classList.remove('dragging');
            comparisonContainer.style.cursor = 'default'; // Restore default cursor
            window.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('touchmove', onPointerMove);
            window.removeEventListener('mouseup', onPointerUp);
            window.removeEventListener('touchend', onPointerUp);
        };

        // Attach listeners to the CONTAINER for better drag initiation area
        comparisonContainer.addEventListener('mousedown', onPointerDown);
        comparisonContainer.addEventListener('touchstart', onPointerDown, { passive: false });
    }

    function resetComparisonSlider() {
        if (comparisonSlider) comparisonSlider.style.left = '50%';
        if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)';
    }

    // --- UI State Management ---
    function showLandingView() {
        if(landingView) landingView.classList.remove('hidden');
        if(appView) appView.classList.add('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.add('hidden');
        resetUploadAreaVisuals();
    }
    function showAppView() {
        if(landingView) landingView.classList.add('hidden');
        if(appView) appView.classList.remove('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.remove('hidden');
        updateOptionsAvailability();
        resetResultArea(); // Start with placeholder in result area
        resetComparisonSlider();
        updateStatus('', '');
    }
    function resetAppToLanding() {
        currentFile = null; currentSvgContent = '';
        if (imageInput) imageInput.value = '';
        if (fileNameDisplay) fileNameDisplay.textContent = '';
        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        if (comparisonOriginalImage) comparisonOriginalImage.src = '#';
        showLandingView();
        updateStatus('', '');
        if (landingStatusArea) landingStatusArea.textContent = '';
        resetComparisonSlider();
    }
    function resetUploadAreaVisuals(){
        if(dropZone) dropZone.style.display = 'flex';
        if(fileInfoArea) fileInfoArea.classList.add('hidden');
        if(uploadProgress) uploadProgress.classList.add('hidden');
        if(startConversionBtn) startConversionBtn.classList.add('hidden');
        if(uploadArea) uploadArea.classList.remove('file-selected');
        if(progressBar) progressBar.style.width = '0%';
    }

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
    function toggleOptionGroup(groupElement, enable) { /* ... same as before ... */ }

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
        updateOptionsAvailability();
        if(currentFile && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; }
        updateStatus('Options reset to default.', 'success', 2000);
    }

    // --- Download and Copy Logic ---
    function handleDownload() {
        if (!currentSvgContent) return;
        try {
            const svgBlob = new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'});
            const url=URL.createObjectURL(svgBlob);
            if (!downloadLink) return;
            downloadLink.href=url; downloadLink.download=`${currentFilenameBase}_vectorised.svg`;
            downloadLink.click(); URL.revokeObjectURL(url);
        } catch(e){ console.error("Download failed:", e); updateStatus('Error downloading','error');}
    }
    function handleCopy() {
         if (!svgCodeTextarea || !svgCodeTextarea.value) return; // Check textarea too
         navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{
             const originalText = copyBtn.textContent; /* ... feedback logic ... */
             setTimeout(()=>{ copyBtn.textContent=originalText; /*...*/ }, 1500);
         }).catch(e=>{ console.error('Failed to copy:',e); updateStatus('Failed to copy code','error'); });
    }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
         const targetStatusArea = appView.classList.contains('hidden') ? landingStatusArea : statusArea;
         if(!targetStatusArea) return;
         clearTimeout(statusClearTimer); targetStatusArea.textContent = message;
         targetStatusArea.className = `status-area ${appView.classList.contains('hidden') ? 'landing-status' : 'app-status'} ${type}`;
         if (type !== 'error' && clearDelay > 0 && message !== '') { statusClearTimer = setTimeout(() => { if (targetStatusArea.textContent === message) updateStatus('', ''); }, clearDelay); }
         if(type === 'error'){ console.error("UI Status:", message); }
     }
     function showLandingError(message) { if(landingStatusArea){ landingStatusArea.textContent = message; landingStatusArea.className = 'status-area landing-status error'; } else { console.error("Landing Status Error:", message); } }
     function resetResultArea(clearStatusToo = true) {
         if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); }
         if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = '';
         if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true;
         if(clearStatusToo) updateStatus('', '');
         resetComparisonSlider();
     }

    // --- Initial State Calls ---
    updateOptionsAvailability(); // Set initial option disabled states

}); // End DOMContentLoaded