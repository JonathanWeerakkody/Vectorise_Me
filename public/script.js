// public/script.js - Updated with Conditional Options & Null Checks

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // Landing Section
    const landingSection = document.getElementById('landingSection');
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName'); // Also used for progress bar name
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // App Section
    const appSection = document.getElementById('appSection');
    const optionsForm = document.getElementById('optionsForm');
    const statusArea = document.getElementById('statusArea');
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    const convertBtn = document.getElementById('convertBtn'); // "Update SVG" button

    // Controlling option elements
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');

    // Dependent option group elements
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');

    // Other Elements
    const downloadLink = document.getElementById('downloadLink'); // Hidden link


    // --- Error Check: Verify Critical Elements Exist ---
    const criticalElements = { dropZone, imageInput, convertBtn, downloadBtn, copyBtn, uploadNewBtn, modeSelect, colormodeSelect, optionsForm };
    for(const key in criticalElements) {
        if (!criticalElements[key]) {
            console.error(`FATAL ERROR: Element with ID '${key}' not found in HTML. Script cannot function correctly.`);
            // Optionally display an error to the user on the page
            if(statusArea) statusArea.textContent = `Error: UI element '${key}' missing.`;
            if(landingStatusArea) landingStatusArea.textContent = `Error: UI element '${key}' missing.`;
            return; // Stop script execution if critical elements are missing
        }
    }


    // --- State Variables ---
    let currentFile = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';

    // --- Initial UI Setup ---
    showLandingView();
    updateOptionsAvailability(); // Set initial disabled state

    // --- Drag and Drop Event Listeners ---
    if(dropZone){
        dropZone.addEventListener('dragenter', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) handleFile(files[0]);
        });
        // Allow clicking dropzone to trigger file input
         dropZone.addEventListener('click', (e) => {
             if (e.target.id !== 'imageInput' && e.target.tagName !== 'LABEL' && imageInput) {
                imageInput.click();
            }
        });
    }

    // --- Standard File Input Listener ---
    if(imageInput){
        imageInput.addEventListener('change', (event) => {
            if (event.target.files && event.target.files.length > 0) {
                handleFile(event.target.files[0]);
            } else {
                 resetAppToLanding(); // Handle clearing file input
            }
        });
    }

    // --- Control Button Listeners (with null checks) ---
    if(convertBtn) convertBtn.addEventListener('click', handleConvert);
    if(downloadBtn) downloadBtn.addEventListener('click', handleDownload);
    if(copyBtn) copyBtn.addEventListener('click', handleCopy);
    if(uploadNewBtn) uploadNewBtn.addEventListener('click', resetAppToLanding);

    // --- Option Change Listeners (with null checks) ---
    if (modeSelect) modeSelect.addEventListener('change', updateOptionsAvailability);
    if (colormodeSelect) colormodeSelect.addEventListener('change', updateOptionsAvailability);

    // Add listener to option changes to re-enable 'Update SVG' button
     if(optionsForm){
        optionsForm.querySelectorAll('input[type="range"], select').forEach(input => {
             if (input) { // Null check inside loop
                 input.addEventListener('change', () => {
                      if (currentFile && convertBtn) { // Only enable update if there's a processed image
                         convertBtn.disabled = false;
                         convertBtn.textContent = 'Update SVG';
                     }
                 });
             }
        });
    }

     // --- Slider Value Display Updates (with null checks) ---
     if(optionsForm){
         optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplayId = `${slider.id}Value`;
            const valueDisplay = document.getElementById(valueDisplayId);
            if (!valueDisplay || !slider) return; // Check both exist

            const updateDisplay = () => { /* ... same formatting logic ... */ };

            updateDisplay();
            if(slider) slider.addEventListener('input', updateDisplay); // Null check
        });
    }


    // --- Core Functions ---

    function handleFile(file) {
        if (!file) { resetAppToLanding(); return; }
        currentFile = file;
        resetResultArea();
        landingStatusArea.textContent = '';

        // Validation
        if (file.size > 15 * 1024 * 1024) { showLandingError('Error: File exceeds 15MB limit.'); resetAppToLanding(); return; }
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) { showLandingError(`Error: Unsupported file type (${file.type||'?'}).`); resetAppToLanding(); return; }

        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (fileNameProgress) fileNameProgress.textContent = file.name;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        if (dropZone) dropZone.style.display = 'none';
        if (uploadProgress) uploadProgress.style.display = 'block';

        simulateUploadProgress(() => {
            showAppView();
            handleConvert(); // Trigger initial conversion
        });
    }

    function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar || !progressText) return; // Check elements exist
        let progress = 0;
        progressBar.style.setProperty('--progress', `0%`);
        progressText.textContent = `Processing... 0%`;

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                 progressText.textContent = `Processing... 100%`;
                 progressBar.style.setProperty('--progress', `100%`);
                 setTimeout(callback, 300);
            } else {
                 progressText.textContent = `Processing... ${Math.round(progress)}%`;
                 progressBar.style.setProperty('--progress', `${progress}%`);
            }
        }, 100);
    }

    async function handleConvert() {
        // ... (Keep exact same FormData creation, option appending, fetch logic as the PREVIOUS working version) ...
        // Ensure it uses the check 'element && !element.disabled' before appending options
        if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) { /* Check critical elements */ return; }

        updateStatus('Vectorizing your image...', 'loading');
        convertBtn.disabled = true; convertBtn.textContent = 'Working...';
        downloadBtn.disabled = true; copyBtn.disabled = true;
        resetResultArea(false);

        const formData = new FormData();
        formData.append('imageFile', currentFile);

        const optionsData = new FormData(optionsForm);
         for (let [key, value] of optionsData.entries()) {
              const element = optionsForm.elements[key];
               if (element && !element.disabled && value !== '' && value !== null) {
                  formData.append(key, value);
                   console.log(`Appending option: ${key} = ${value}`);
              } else if (element && element.disabled){
                   console.log(`Skipping disabled option: ${key}`);
              }
         }

        console.log("Sending data to backend /convert endpoint...");
        try {
             const response = await fetch('/convert', { method: 'POST', body: formData });
             const result = await response.json();
             if (!response.ok) { throw new Error(result.error || `Server error: ${response.status}`); }
             if (result.svg) {
                  // Success Handling... (same as before)
                   currentSvgContent = result.svg;
                   if (svgOutputDiv) {
                     svgOutputDiv.innerHTML = currentSvgContent;
                     svgOutputDiv.classList.remove('placeholder-text');
                   }
                   if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent;
                  updateStatus('Vectorization Complete!', 'success', 3000);
                  if(downloadBtn) downloadBtn.disabled = false;
                  if(copyBtn) copyBtn.disabled = false;
                  if(convertBtn){
                       convertBtn.textContent = 'Update SVG';
                       convertBtn.disabled = true; // Disable until option changes
                   }
              } else { throw new Error("Server response ok but no SVG data."); }
          } catch (error) {
               // Error Handling... (same as before)
               console.error('Conversion Request Failed:', error);
               updateStatus(`Error: ${error.message}`, 'error');
               resetResultArea(false);
               if(downloadBtn) downloadBtn.disabled = true;
               if(copyBtn) copyBtn.disabled = true;
               if(convertBtn) convertBtn.disabled = !currentFile; // Allow retry if file still there
          }
    }

    // --- UI State Changes ---
    function showLandingView() {
        if(landingSection) landingSection.classList.remove('hidden');
        if(appSection) appSection.classList.add('hidden');
        resetUploadArea();
    }
    function showAppView() {
        if(landingSection) landingSection.classList.add('hidden');
        if(appSection) appSection.classList.remove('hidden');
        updateOptionsAvailability();
        resetResultArea();
        updateStatus('', ''); // Clear app status
    }
    function resetAppToLanding() {
        currentFile = null; currentSvgContent = '';
        if (imageInput) imageInput.value = '';
        if (fileNameDisplay) fileNameDisplay.textContent = 'No file chosen';
        showLandingView();
        updateStatus('', '');
        if (landingStatusArea) landingStatusArea.textContent = '';
    }
    function resetUploadArea(){
       if(dropZone) dropZone.style.display = 'block';
       if(uploadProgress) uploadProgress.style.display = 'none';
       if(progressBar) progressBar.style.setProperty('--progress', `0%`);
       if(progressText) progressText.textContent = 'Processing... 0%';
       if(fileNameProgress) fileNameProgress.textContent = '';
   }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() {
        if (!modeSelect || !colormodeSelect) return; // Need controllers
        const currentMode = modeSelect.value;
        const currentColorMode = colormodeSelect.value;
        console.log(`Updating options for Mode: ${currentMode}, Color Mode: ${currentColorMode}`);
        const isSpline = currentMode === 'spline';
        const isPixel = currentMode === 'pixel';
        const isColor = currentColorMode === 'color';

        toggleOptionGroup(splineThresholdGroup, isSpline);
        toggleOptionGroup(spliceThresholdGroup, isSpline);
        toggleOptionGroup(segmentLengthGroup, isSpline);
        toggleOptionGroup(cornerThresholdGroup, !isPixel); // Disable for pixel
        toggleOptionGroup(hierarchicalGroup, isColor);
        toggleOptionGroup(gradientStepGroup, isColor);
        toggleOptionGroup(colorPrecisionGroup, isColor);
    }
    function toggleOptionGroup(groupElement, enable) {
        if (!groupElement) return;
        const controls = groupElement.querySelectorAll('input, select');
        if (enable) {
            groupElement.classList.remove('disabled');
            controls.forEach(control => { if(control) control.disabled = false; }); // Null check
        } else {
            groupElement.classList.add('disabled');
            controls.forEach(control => { if(control) control.disabled = true; }); // Null check
        }
    }

    // --- Download and Copy Logic ---
    function handleDownload() { /* ... same as before ... */ }
    function handleCopy() { /* ... same as before ... */ }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) { /* ... same as before, using statusArea ... */ }
    function showLandingError(message){
        if (landingStatusArea) {
             landingStatusArea.textContent = message;
             landingStatusArea.className = 'status-area landing-status error';
        } else { console.error("Landing Status Error:", message); } // Fallback
    }
    function resetResultArea(clearStatusToo = true) { /* ... same as before, using svgOutputDiv ... */ }

    // --- Initial State Call ---
    updateOptionsAvailability(); // Set initial state on load

}); // End DOMContentLoaded
