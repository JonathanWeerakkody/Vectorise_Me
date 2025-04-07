// public/script.js - Revised for New UI/UX with Backend Processing

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName'); // In file info area
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone');
    const fileInfoArea = document.getElementById('fileInfoArea'); // Area to show file name/cancel
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const appHeader = document.querySelector('.app-header'); // Get header for potential height calculations

    // App View Elements
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn'); // Now "Update Vectorization"
    const statusArea = document.getElementById('statusArea'); // App status
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn'); // In app header
    const resetOptionsBtn = document.getElementById('resetOptionsBtn'); // New reset button

    // Option Controllers & Groups (Keep references from previous script)
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');

    // Other Elements
    const downloadLink = document.getElementById('downloadLink');

    // --- State Variables ---
    let currentFile = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {}; // Store default values on load

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions(); // Store initial form values
    updateOptionsAvailability();

    // --- Drag and Drop ---
    if (dropZone) {
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('click', () => imageInput?.click()); // Click triggers file input
    } else { console.error("Drop zone not found"); }

    // --- Event Listeners ---
    if (imageInput) imageInput.addEventListener('change', handleFileSelectChange);
    if (cancelUploadBtn) cancelUploadBtn.addEventListener('click', resetAppToLanding);
    if (startConversionBtn) startConversionBtn.addEventListener('click', triggerConversionFromLanding);
    if (convertBtn) convertBtn.addEventListener('click', handleConvert); // Update button
    if (downloadBtn) downloadBtn.addEventListener('click', handleDownload);
    if (copyBtn) copyBtn.addEventListener('click', handleCopy);
    if (uploadNewBtn) uploadNewBtn.addEventListener('click', resetAppToLanding);
    if (resetOptionsBtn) resetOptionsBtn.addEventListener('click', handleResetOptions);

    // Option change listeners
    if (modeSelect) modeSelect.addEventListener('change', updateOptionsAvailability);
    if (colormodeSelect) colormodeSelect.addEventListener('change', updateOptionsAvailability);
    // Any option change should ideally enable the 'Update' button if SVG exists
    if (optionsForm) {
        optionsForm.addEventListener('change', () => {
            if (currentSvgContent && convertBtn) {
                 convertBtn.disabled = false;
                 convertBtn.textContent = 'Update Vectorization';
            }
        });
    }

    // Slider value display updates (Keep this logic)
    if (optionsForm) {
        optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplayId = `${slider.id}Value`;
            const valueDisplay = document.getElementById(valueDisplayId);
            if (!valueDisplay || !slider) return;
            const updateDisplay = () => { /* ... same formatting logic ... */ };
            updateDisplay();
            slider.addEventListener('input', updateDisplay);
        });
    }


    // --- Drag/Drop Handlers ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) {
        e.preventDefault(); e.stopPropagation();
        dropZone?.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    }

    // --- File Handling ---
    function handleFileSelectChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            handleFile(event.target.files[0]);
        }
    }

    function handleFile(file) {
        if (!file) { resetAppToLanding(); return; }
        landingStatusArea.textContent = ''; // Clear previous errors

        const validationError = validateFile(file);
        if (validationError) {
            showLandingError(validationError);
            resetAppToLanding(); return;
        }

        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        // Update UI for selected file
        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (fileInfoArea) fileInfoArea.classList.remove('hidden');
        if (dropZone) dropZone.style.display = 'none'; // Hide drop zone
        if (uploadProgress) uploadProgress.classList.add('hidden'); // Hide progress bar initially
        if (startConversionBtn) startConversionBtn.classList.remove('hidden'); // Show Vectorize button
        if (uploadArea) uploadArea.classList.add('file-selected'); // Optional: style parent
    }

    function validateFile(file) {
        if (!file) return "No file provided.";
        if (file.size > 15 * 1024 * 1024) return 'Error: File exceeds 15MB limit.';
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
            return `Error: Unsupported type (${file.type||'?'}). Use JPG, PNG, WEBP, BMP.`;
        }
        return null; // No error
    }

    // --- Conversion ---
    function triggerConversionFromLanding() {
        if (!currentFile) return;
        if (uploadProgress) uploadProgress.classList.remove('hidden'); // Show progress bar
        if (startConversionBtn) startConversionBtn.classList.add('hidden'); // Hide start button
        if (fileInfoArea) fileInfoArea.style.display = 'none'; // Hide file info during progress

        simulateUploadProgress(() => {
            showAppView();
            handleConvert(true); // Pass flag indicating initial conversion
        });
    }

    async function handleConvert(isInitial = false) {
        if (!currentFile) { updateStatus('No file selected.', 'error'); return; }

        updateStatus(isInitial ? 'Vectorizing...' : 'Updating vectorization...', 'loading');
        if(convertBtn) { convertBtn.disabled = true; convertBtn.textContent = 'Working...'; }
        if(downloadBtn) downloadBtn.disabled = true;
        if(copyBtn) copyBtn.disabled = true;
        if(!isInitial) resetResultArea(false); // Clear previous SVG if updating

        const formData = new FormData();
        formData.append('imageFile', currentFile);

        const optionsData = new FormData(optionsForm);
        for (let [key, value] of optionsData.entries()) {
            const element = optionsForm.elements[key];
            if (element && !element.disabled && value !== '' && value !== null) {
                formData.append(key, value);
            }
        }

        console.log("Sending data to /convert...");
        try {
            const response = await fetch('/convert', { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) { throw new Error(result.error || `Server error: ${response.status}`); }

            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) {
                     svgOutputDiv.innerHTML = currentSvgContent;
                     svgOutputDiv.classList.remove('placeholder-text');
                }
                 if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent;
                updateStatus('Vectorization Complete!', 'success', 3000);
                if(downloadBtn) downloadBtn.disabled = false;
                if(copyBtn) copyBtn.disabled = false;
                if(convertBtn) {
                    convertBtn.textContent = 'Update Vectorization';
                    // Keep it disabled after update until options change again
                     convertBtn.disabled = true;
                }
            } else { throw new Error("Server response ok but no SVG data."); }

        } catch (error) {
            console.error('Conversion Request Failed:', error);
            updateStatus(`Error: ${error.message}`, 'error');
            resetResultArea(false);
            if(downloadBtn) downloadBtn.disabled = true;
            if(copyBtn) copyBtn.disabled = true;
            // Decide if convert button should be re-enabled on error
             if(convertBtn) convertBtn.disabled = false; // Allow retry
             if(convertBtn) convertBtn.textContent = isInitial ? 'Convert to SVG' : 'Update Vectorization';

        }
    }

     // Simulate upload progress
     function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar ) return;
        let progress = 0;
        progressBar.style.width = `0%`; // Use width directly

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                 progressBar.style.width = `100%`;
                 setTimeout(callback, 250); // Callback after progress hits 100%
            } else {
                 progressBar.style.width = `${progress}%`;
            }
        }, 120);
    }

    // --- UI State Management ---
    function showLandingView() {
        if(landingView) landingView.classList.remove('hidden');
        if(appView) appView.classList.add('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); // Hide "Upload New" on landing
        resetUploadAreaVisuals();
    }
    function showAppView() {
        if(landingView) landingView.classList.add('hidden');
        if(appView) appView.classList.remove('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); // Show "Upload New" in app
        updateOptionsAvailability(); // Ensure options are correct
        resetResultArea();
        updateStatus('', ''); // Clear app status
    }
    function resetAppToLanding() {
        currentFile = null; currentSvgContent = '';
        if (imageInput) imageInput.value = '';
        if (fileNameDisplay) fileNameDisplay.textContent = ''; // Clear file name display
        showLandingView();
        updateStatus('', '');
        if (landingStatusArea) landingStatusArea.textContent = '';
    }
     function resetUploadAreaVisuals(){ // Only resets visuals of upload area
         if(dropZone) dropZone.style.display = 'flex'; // Back to flex
         if(fileInfoArea) fileInfoArea.classList.add('hidden');
         if(uploadProgress) uploadProgress.classList.add('hidden');
         if(startConversionBtn) startConversionBtn.classList.add('hidden');
         if (uploadArea) uploadArea.classList.remove('file-selected');
     }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() {
        if (!modeSelect || !colormodeSelect) return;
        const currentMode = modeSelect.value;
        const currentColorMode = colormodeSelect.value;
        const isSpline = currentMode === 'spline';
        const isPixel = currentMode === 'pixel';
        const isColor = currentColorMode === 'color';

        toggleOptionGroup(splineThresholdGroup, isSpline);
        toggleOptionGroup(spliceThresholdGroup, isSpline);
        toggleOptionGroup(segmentLengthGroup, isSpline);
        toggleOptionGroup(cornerThresholdGroup, !isPixel);
        toggleOptionGroup(hierarchicalGroup, isColor);
        toggleOptionGroup(gradientStepGroup, isColor);
        toggleOptionGroup(colorPrecisionGroup, isColor);
    }
    function toggleOptionGroup(groupElement, enable) {
        if (!groupElement) return;
        const controls = groupElement.querySelectorAll('input, select');
        if (enable) {
            groupElement.classList.remove('disabled');
            controls.forEach(control => { if(control) control.disabled = false; });
        } else {
            groupElement.classList.add('disabled');
            controls.forEach(control => { if(control) control.disabled = true; });
        }
    }

    // --- Option Reset ---
     function storeDefaultOptions() {
         if (!optionsForm) return;
         const formData = new FormData(optionsForm);
          for (let [key, value] of formData.entries()) {
               defaultOptions[key] = value;
           }
         console.log("Stored default options:", defaultOptions);
     }

     function handleResetOptions() {
         if (!optionsForm) return;
         console.log("Resetting options to:", defaultOptions);
          for (const key in defaultOptions) {
               const element = optionsForm.elements[key];
               if (element) {
                  element.value = defaultOptions[key];
                  // Trigger input event for sliders to update their value display
                   if (element.type === 'range') {
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                    }
              }
          }
          updateOptionsAvailability(); // Re-apply conditional disabling
          // Trigger conversion automatically after reset? Or just enable button?
           if(currentFile && convertBtn) {
               convertBtn.disabled = false; // Enable button after reset
               convertBtn.textContent = 'Update Vectorization';
            }
          updateStatus('Options reset to default.', 'success', 2000);
      }

    // --- Download and Copy Logic ---
    function handleDownload() { /* ... same logic ... */ }
    function handleCopy() { /* ... same logic ... */ }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
         const targetStatusArea = appView.classList.contains('hidden') ? landingStatusArea : statusArea;
         if(!targetStatusArea) { console.error("Status area not found"); return; }
         clearTimeout(statusClearTimer);
         targetStatusArea.textContent = message;
         targetStatusArea.className = `status-area ${appView.classList.contains('hidden') ? 'landing-status' : 'app-status'} ${type}`;
         if (type !== 'error' && clearDelay > 0 && message !== '') { /* ... timeout logic ... */ }
         if(type === 'error'){ console.error("UI Status:", message); }
     }
     function showLandingError(message) { // Specific helper for landing view
         if(landingStatusArea){
             landingStatusArea.textContent = message;
             landingStatusArea.className = 'status-area landing-status error';
         } else { console.error("Landing Status Error:", message); }
     }
     function resetFileSelection() {
          if(imageInput) imageInput.value = '';
          if(fileNameDisplay) fileNameDisplay.textContent = ''; // Clear file info name too
          currentFile = null;
          resetResultArea();
          resetUploadAreaVisuals(); // Make sure upload area looks reset
          if(convertBtn) convertBtn.disabled = true;
      }
     function resetResultArea(clearStatusToo = true) {
          if(svgOutputDiv) {
               svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>';
               svgOutputDiv.classList.add('placeholder-text');
          }
          if(svgCodeTextarea) svgCodeTextarea.value = '';
          currentSvgContent = '';
          if(downloadBtn) downloadBtn.disabled = true;
          if(copyBtn) copyBtn.disabled = true;
          if(clearStatusToo) updateStatus('', '');
     }

    // --- Initial State Calls ---
    updateOptionsAvailability(); // Set initial option states
    // resetAppToLanding(); // Start clean

}); // End DOMContentLoaded