// public/script.js - Final version with JS Dimension Syncing

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // ... (Keep all element references as before) ...
    const comparisonContainer = document.getElementById('comparisonContainer');
    const comparisonOriginalImage = document.getElementById('comparisonOriginalImage');
    const comparisonSvgLayer = document.getElementById('comparisonSvgLayer');
    const svgOutputWrapper = document.getElementById('svgOutputWrapper'); // Get wrapper
    const svgOutputDiv = document.getElementById('svgOutput');
    // ...

    // --- State Variables ---
    // ... (Keep other state variables) ...
    let currentImageDimensions = { width: 0, height: 0 }; // Store original dimensions

    // --- Initial UI Setup ---
    // ... (Keep existing setup) ...

    // --- Comparison Image Load Listener ---
    // Setup listener to calculate dimensions ONCE the original image metadata is loaded
    if (comparisonOriginalImage) {
        comparisonOriginalImage.onload = () => {
            console.log("Original comparison image loaded metadata");
            // Store natural dimensions
            currentImageDimensions.width = comparisonOriginalImage.naturalWidth;
            currentImageDimensions.height = comparisonOriginalImage.naturalHeight;
            // Calculate and apply dimensions based on container
            calculateAndApplyDimensions();
        };
         comparisonOriginalImage.onerror = () => {
             console.error("Failed to load original image into comparison view.");
             // Maybe clear src or show an error placeholder in that layer
             comparisonOriginalImage.src = '#'; // Clear potentially broken src
         }
    }

    // --- Drag and Drop Handlers ---
    // ... (Keep existing handlers) ...

    // --- Event Listeners ---
    // ... (Keep existing listeners) ...

    // --- File Handling ---
    function handleFile(file) {
        // ... (Keep existing file validation) ...
        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        // Revoke previous URL first
        if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL);

        // Create URL and set src - the onload listener above will handle dimension calculation
        currentFileObjectURL = URL.createObjectURL(file);
        if (comparisonOriginalImage) {
            comparisonOriginalImage.src = currentFileObjectURL;
        } else { console.error("Comparison original image element not found"); }

        // ... (Keep rest of UI updates for file info/buttons) ...
    }
    function validateFile(file) { /* ... same ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... */ }
    async function handleConvert(isInitial = false) {
        // ... (Keep start of function: status, disable buttons, FormData) ...
        try {
            // ... (fetch logic) ...
            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) svgOutputDiv.innerHTML = currentSvgContent;
                if (svgCodeTextarea) svgCodeTextarea.value = currentSvgContent;
                updateStatus('Vectorization Complete!', 'success', 3000);
                if (downloadBtn) downloadBtn.disabled = false;
                if (copyBtn) copyBtn.disabled = false;
                if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; }

                // --- Crucial: Apply dimensions AFTER SVG is inserted ---
                // Use a small delay to allow the browser to render the SVG and get its potential size
                setTimeout(calculateAndApplyDimensions, 50); // 50ms delay might be enough

                resetComparisonSlider();
                resetZoomPan();
            } else { throw new Error("Server response ok but no SVG data."); }
        } catch (error) { /* ... error handling ... */ }
        finally { /* ... finally block ... */ }
    }
    function simulateUploadProgress(callback) { /* ... same ... */ }


    // --- ***** NEW: Dimension Calculation & Application ***** ---
    function calculateAndApplyDimensions() {
        if (!comparisonContainer || !comparisonOriginalImage || !svgOutputWrapper || !currentImageDimensions.width) {
            console.warn("Cannot calculate dimensions: Missing elements or original image dimensions.");
            return;
        }

        const containerWidth = comparisonContainer.clientWidth;
        const containerHeight = comparisonContainer.clientHeight;
        const imgRatio = currentImageDimensions.width / currentImageDimensions.height;
        const containerRatio = containerWidth / containerHeight;

        let targetWidth, targetHeight;

        // Determine the 'contain' dimensions based on aspect ratios
        if (imgRatio > containerRatio) {
            // Image is wider than container relative to height
            targetWidth = containerWidth;
            targetHeight = containerWidth / imgRatio;
        } else {
            // Image is taller than container relative to width
            targetHeight = containerHeight;
            targetWidth = containerHeight * imgRatio;
        }

        // Sanity check - ensure dimensions are positive
        targetWidth = Math.max(1, Math.floor(targetWidth));
        targetHeight = Math.max(1, Math.floor(targetHeight));

        console.log(`Applying dimensions - Target W: ${targetWidth}, Target H: ${targetHeight}`);

        // Apply calculated dimensions to both the image and the SVG wrapper
        comparisonOriginalImage.style.width = `${targetWidth}px`;
        comparisonOriginalImage.style.height = `${targetHeight}px`;

        svgOutputWrapper.style.width = `${targetWidth}px`;
        svgOutputWrapper.style.height = `${targetHeight}px`;

         // Optional: Apply to SVG directly too? Usually wrapper is enough.
         // const svgElement = svgOutputDiv?.querySelector('svg');
         // if (svgElement) {
         //     svgElement.style.width = `${targetWidth}px`;
         //     svgElement.style.height = `${targetHeight}px`;
         // }
    }

    // --- Comparison Slider Logic ---
    function setupComparisonSlider() { /* ... Keep exact same logic ... */ }
    function resetComparisonSlider() { /* ... Keep exact same logic ... */ }

    // --- Zoom and Pan Logic ---
    function setTransform() { /* ... Keep exact same logic ... */ }
    function setupZoomPan() { /* ... Keep exact same logic ... */ }
    function zoom(factor) { /* ... Keep exact same logic ... */ }
    function resetZoomPan() {
         scale = 1; pointX = 0; pointY = 0;
         setTransform();
         // Recalculate dimensions on zoom reset too, container might have resized
         calculateAndApplyDimensions();
     }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... Keep exact same logic ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... Keep exact same logic ... */ }
    function showAppView() { /* ... Keep exact same logic ... */ }
    function resetAppToLanding() {
         // ... (Keep existing reset logic) ...
         if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
         if(comparisonOriginalImage) { comparisonOriginalImage.src = '#'; comparisonOriginalImage.style.width=''; comparisonOriginalImage.style.height='';} // Clear styles
         if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; } // Clear styles
         currentImageDimensions = { width: 0, height: 0 }; // Reset stored dimensions
         resetZoomPan();
         resetComparisonSlider();
     }
    function resetUploadAreaVisuals(){ /* ... Keep exact same logic ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { /* ... Keep exact same logic ... */ }
    function toggleOptionGroup(groupElement, enable) { /* ... Keep exact same logic ... */ }

    // --- Option Reset ---
    function storeDefaultOptions() { /* ... Keep exact same logic ... */ }
    function handleResetOptions() { /* ... Keep exact same logic ... */ }

    // --- Download and Copy Logic ---
    function handleDownload() { /* ... Keep exact same logic ... */ }
    function handleCopy() { /* ... Keep exact same logic ... */ }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) { /* ... Keep exact same logic ... */ }
    function showLandingError(message){ /* ... Keep exact same logic ... */ }
    function resetResultArea(clearStatusToo = true) {
         if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); }
         if(svgCodeTextarea) svgCodeTextarea.value = ''; currentSvgContent = '';
         if(downloadBtn) downloadBtn.disabled = true; if(copyBtn) copyBtn.disabled = true;
         if(clearStatusToo) updateStatus('', '');
         resetComparisonSlider();
         // Don't reset zoom here, only on new image/reset button
         // Reset SVG wrapper size when clearing result
          if(svgOutputWrapper) { svgOutputWrapper.style.width=''; svgOutputWrapper.style.height=''; }
     }

    // --- Initial State Calls ---
    updateOptionsAvailability();

    // Add listener for window resize to recalculate dimensions
     let resizeTimeout;
     window.addEventListener('resize', () => {
         clearTimeout(resizeTimeout);
         // Debounce resize handler
         resizeTimeout = setTimeout(calculateAndApplyDimensions, 150);
     });


}); // End DOMContentLoaded