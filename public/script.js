// public/script.js - Updated with Comparison Slider, Scaling Fix, Reset Options

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
    const downloadLink = document.getElementById('downloadLink');

    // Comparison Slider Elements
    const comparisonContainer = document.getElementById('comparisonContainer');
    const comparisonOriginalImage = document.getElementById('comparisonOriginalImage'); // The <img> tag
    const comparisonSvgLayer = document.getElementById('comparisonSvgLayer'); // The div holding the SVG output
    const comparisonSlider = document.getElementById('comparisonSlider'); // The slider handle/line

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
    const defaultOptions = {}; // Store default values on load
    let isDraggingSlider = false;

    // --- Initial UI Setup ---
    showLandingView();
    storeDefaultOptions();
    updateOptionsAvailability();
    setupComparisonSlider(); // Setup listeners for the slider

    // --- Drag and Drop ---
    // ... (Keep exact same drag/drop handlers as previous version) ...
    if (dropZone) { /* ... listeners ... */ }

    // --- Event Listeners ---
    if (imageInput) imageInput.addEventListener('change', handleFileSelectChange);
    if (cancelUploadBtn) cancelUploadBtn.addEventListener('click', resetAppToLanding);
    if (startConversionBtn) startConversionBtn.addEventListener('click', triggerConversionFromLanding);
    if (convertBtn) convertBtn.addEventListener('click', () => handleConvert(false)); // Pass false for 'isInitial'
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
    }
     // Slider value display updates (Keep this logic)
     if (optionsForm) { /* ... same slider value display update code ... */ }


    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... same as before ... */ }
    function handleFile(file) {
        if (!file) { resetAppToLanding(); return; }
        landingStatusArea.textContent = '';

        const validationError = validateFile(file);
        if (validationError) { showLandingError(validationError); resetAppToLanding(); return; }

        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        // --- Preview Original Image & Setup for Comparison ---
        if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); // Revoke previous
        currentFileObjectURL = URL.createObjectURL(file); // Create URL for original image
        if (comparisonOriginalImage) {
            comparisonOriginalImage.src = currentFileObjectURL; // Set src for comparison background
        } else { console.error("Comparison original image element not found"); }

        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (fileInfoArea) fileInfoArea.classList.remove('hidden');
        if (dropZone) dropZone.style.display = 'none';
        if (uploadProgress) uploadProgress.classList.add('hidden');
        if (startConversionBtn) startConversionBtn.classList.remove('hidden');
        if (uploadArea) uploadArea.classList.add('file-selected');
    }
    function validateFile(file) { /* ... same as before ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() {
        if (!currentFile) return;
        if (uploadProgress) uploadProgress.classList.remove('hidden');
        if (startConversionBtn) startConversionBtn.classList.add('hidden');
        if (fileInfoArea) fileInfoArea.style.display = 'none';

        simulateUploadProgress(() => {
            showAppView();
            handleConvert(true); // Pass true for initial conversion
        });
    }
    async function handleConvert(isInitial = false) {
         // ... (Keep exact same FormData creation, option appending, fetch logic) ...
         // Ensure it checks element.disabled before appending options
          if (!currentFile || !convertBtn || !downloadBtn || !copyBtn) { return; }

          updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading');
          convertBtn.disabled = true; convertBtn.textContent = 'Working...';
          downloadBtn.disabled = true; copyBtn.disabled = true;
          if(!isInitial && svgOutputDiv) { // Only clear placeholder if updating
               svgOutputDiv.innerHTML = '<p class="placeholder-text">Updating preview...</p>';
          } else if (svgOutputDiv) {
              svgOutputDiv.innerHTML = '<p class="placeholder-text">Processing...</p>';
          }


          const formData = new FormData(); /* ... append file ... */
          // Append enabled options ...
          console.log("Sending data to backend /convert endpoint...");
          try {
              const response = await fetch('/convert', { method: 'POST', body: formData });
              const result = await response.json();
              if (!response.ok) { throw new Error(result.error || `Server error: ${response.status}`); }

              if (result.svg) {
                   currentSvgContent = result.svg;
                   if (svgOutputDiv) {
                        svgOutputDiv.innerHTML = currentSvgContent; // Update SVG preview
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
                   // Reset slider to center after conversion
                   resetComparisonSlider();
               } else { throw new Error("Server response ok but no SVG data."); }
           } catch (error) {
                console.error('Conversion Request Failed:', error);
                updateStatus(`Error: ${error.message}`, 'error');
                // Don't clear SVG on failed update, keep previous result? Or clear? Let's clear.
                resetResultArea(false);
                if(downloadBtn) downloadBtn.disabled = true;
                if(copyBtn) copyBtn.disabled = true;
                if(convertBtn) convertBtn.disabled = !currentFile;
                if(convertBtn) convertBtn.textContent = 'Update Vectorization';
           }
    }
    function simulateUploadProgress(callback) { /* ... same as before ... */ }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() {
        if (!comparisonSlider || !comparisonContainer || !comparisonSvgLayer) return;

        const moveSlider = (clientX) => {
            const rect = comparisonContainer.getBoundingClientRect();
            const x = clientX - rect.left; // X position within the container
            let percentage = (x / rect.width) * 100;

            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));

            comparisonSlider.style.left = `${percentage}%`;
            // Clip the SVG layer based on the slider percentage
            comparisonSvgLayer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        const onPointerDown = (e) => {
            e.preventDefault(); // Prevent text selection, etc.
            isDraggingSlider = true;
            comparisonSlider.classList.add('dragging'); // Optional: for styling
            moveSlider(e.clientX || e.touches[0].clientX); // Handle touch/mouse
            window.addEventListener('mousemove', onPointerMove);
            window.addEventListener('touchmove', onPointerMove);
            window.addEventListener('mouseup', onPointerUp);
            window.addEventListener('touchend', onPointerUp);
        };

        const onPointerMove = (e) => {
            if (!isDraggingSlider) return;
            e.preventDefault();
            moveSlider(e.clientX || e.touches[0].clientX);
        };

        const onPointerUp = () => {
            if (!isDraggingSlider) return;
            isDraggingSlider = false;
            comparisonSlider.classList.remove('dragging'); // Optional: remove style
            window.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('touchmove', onPointerMove);
            window.removeEventListener('mouseup', onPointerUp);
            window.removeEventListener('touchend', onPointerUp);
        };

        comparisonSlider.addEventListener('mousedown', onPointerDown);
        comparisonSlider.addEventListener('touchstart', onPointerDown, { passive: false }); // Need passive false to prevent scroll
    }

    function resetComparisonSlider() {
         if (comparisonSlider) comparisonSlider.style.left = '50%';
         if (comparisonSvgLayer) comparisonSvgLayer.style.clipPath = 'inset(0 50% 0 0)';
    }

    // --- UI State Management ---
    function showLandingView() { /* ... same as before ... */ }
    function showAppView() { /* ... same as before ... */ }
    function resetAppToLanding() {
         // ... (same as before) ...
         // Also revoke the object URL for the original image preview
         if (currentFileObjectURL) {
            URL.revokeObjectURL(currentFileObjectURL);
            currentFileObjectURL = null;
         }
          if(comparisonOriginalImage) comparisonOriginalImage.src = '#'; // Clear comparison image
          resetComparisonSlider();
     }
    function resetUploadAreaVisuals() { /* ... same as before ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { /* ... same as before ... */ }
    function toggleOptionGroup(groupElement, enable) { /* ... same as before ... */ }

    // --- Option Reset ---
    function storeDefaultOptions() { /* ... same as before ... */ }
    function handleResetOptions() {
         if (!optionsForm) return;
         console.log("Resetting options to:", defaultOptions);
         for (const key in defaultOptions) { /* ... same logic ... */ }
         updateOptionsAvailability();
         if(currentFile && convertBtn) {
             convertBtn.disabled = false;
             convertBtn.textContent = 'Update Vectorization'; // Enable update after reset
         }
         updateStatus('Options reset to default.', 'success', 2000);
     }

    // --- Download and Copy Logic ---
    function handleDownload() { /* ... same as before ... */ }
    function handleCopy() { /* ... same as before ... */ }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) { /* ... same as before ... */ }
    function showLandingError(message){ /* ... same as before ... */ }
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
         resetComparisonSlider(); // Reset slider when result clears
     }

    // --- Initial State Calls ---
    updateOptionsAvailability();

}); // End DOMContentLoaded