// public/script.js - Updated with Conditional Options

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const imagePreviewArea = document.getElementById('imagePreviewArea');
    const imagePreview = document.getElementById('imagePreview');
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');
    const statusArea = document.getElementById('statusArea');
    const svgOutputDiv = document.getElementById('svgOutput');
    const svgCodeTextarea = document.getElementById('svgCode'); // Hidden
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadLink = document.getElementById('downloadLink'); // Hidden

    // -- Get CONTROLLING elements --
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');

    // -- Get PARENT GROUP elements of conditional options --
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    // Add others here if needed (like corner threshold if we disable for pixel)
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');


    // --- State Variables ---
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';

    // --- Slider Value Display Updates ---
    optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplayId = `${slider.id}Value`;
        const valueDisplay = document.getElementById(valueDisplayId);
        if (!valueDisplay) return;
        const updateDisplay = () => {
            let displayValue = slider.value;
             switch (slider.id) {
                case 'optCornerThreshold': displayValue += '°'; break;
                case 'optFilterSpeckle': displayValue += ' px'; break;
                case 'optColorPrecision': displayValue += ' bits'; break;
                case 'optPathPrecision': displayValue += ' dec'; break;
                case 'optSpliceThreshold': displayValue += '°'; break;
                case 'optSegmentLength': displayValue = parseFloat(displayValue).toFixed(1); break; // Ensure one decimal
                case 'optGradientStep': displayValue = parseFloat(displayValue).toFixed(1); break; // Ensure one decimal
             }
            valueDisplay.textContent = displayValue;
        };
        updateDisplay();
        slider.addEventListener('input', updateDisplay);
    });

    // --- Function to Update Conditional Options Visibility/Disabled State ---
    function updateOptionsAvailability() {
        const currentMode = modeSelect.value; // spline, polygon, pixel
        const currentColorMode = colormodeSelect.value; // color, bw

        console.log(`Updating options for Mode: ${currentMode}, Color Mode: ${currentColorMode}`);

        // --- Logic based on vtracer options ---
        const isSpline = currentMode === 'spline';
        const isPixel = currentMode === 'pixel';
        const isColor = currentColorMode === 'color';

        // Spline Threshold: Only for spline
        toggleOptionGroup(splineThresholdGroup, isSpline);

        // Splice Threshold: Only for spline
        toggleOptionGroup(spliceThresholdGroup, isSpline);

        // Segment Length: Primarily for spline
        toggleOptionGroup(segmentLengthGroup, isSpline);

        // Corner Threshold: Not needed for pixel mode
        toggleOptionGroup(cornerThresholdGroup, !isPixel);

        // Hierarchical: Only for color mode
        toggleOptionGroup(hierarchicalGroup, isColor);

        // Gradient Step: Only for color mode
        toggleOptionGroup(gradientStepGroup, isColor);

        // Color Precision: Only for color mode
        toggleOptionGroup(colorPrecisionGroup, isColor);

        // Add logic for other options if needed
    }

    // Helper function to enable/disable a group and its controls
    function toggleOptionGroup(groupElement, enable) {
        if (!groupElement) return; // Skip if element not found

        const controls = groupElement.querySelectorAll('input, select');

        if (enable) {
            groupElement.classList.remove('disabled');
            controls.forEach(control => control.disabled = false);
        } else {
            groupElement.classList.add('disabled');
            controls.forEach(control => control.disabled = true);
        }
    }


    // --- Event Listeners ---
    imageInput.addEventListener('change', handleImageUpload);
    convertBtn.addEventListener('click', handleConvert);
    downloadBtn.addEventListener('click', handleDownload);
    copyBtn.addEventListener('click', handleCopy);

    // --- Add Listeners to Controlling Selects ---
    modeSelect.addEventListener('change', updateOptionsAvailability);
    colormodeSelect.addEventListener('change', updateOptionsAvailability);


    // --- Core Functions ---

    function handleImageUpload(event) {
        const file = event.target.files[0];
        resetResultArea(); // Clear results first
        if (file) {
             if (file.size > 15 * 1024 * 1024) { updateStatus('Error: File exceeds 15MB limit.', 'error'); resetFileSelection(); return; }
             if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) { updateStatus(`Error: Unsupported file type (${file.type||'?'}).`, 'error'); resetFileSelection(); return; }

            fileNameDisplay.textContent = file.name;
            currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;
            convertBtn.disabled = false;
            const reader = new FileReader();
            reader.onload = (e) => { imagePreview.src = e.target.result; imagePreviewArea.style.display = 'block'; };
            reader.onerror = () => { updateStatus('Error reading preview.', 'error'); resetFileSelection(); }
            reader.readAsDataURL(file);
        } else {
            resetFileSelection();
        }
        updateOptionsAvailability(); // Update options based on default selects after handling file change
    }

    async function handleConvert() {
        const file = imageInput.files[0];
        if (!file) { updateStatus('Please select an image first.', 'error'); return; }

        updateStatus('Uploading and converting...', 'loading');
        convertBtn.disabled = true; convertBtn.textContent = 'Converting...';
        resetResultArea(false);

        const formData = new FormData();
        formData.append('imageFile', file);

        // Append ONLY ENABLED options
        const optionsData = new FormData(optionsForm);
        for (let [key, value] of optionsData.entries()) {
             const element = optionsForm.elements[key];
             // Check element exists and is not disabled within its group
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
                currentSvgContent = result.svg;
                svgOutputDiv.innerHTML = currentSvgContent;
                svgCodeTextarea.value = currentSvgContent;
                svgOutputDiv.classList.remove('placeholder-text');
                updateStatus('Conversion successful!', 'success', 3000);
                downloadBtn.disabled = false; copyBtn.disabled = false;
            } else { throw new Error("Server response ok but no SVG data."); }

        } catch (error) {
            console.error('Conversion Request Failed:', error);
            updateStatus(`Error: ${error.message}`, 'error');
            resetResultArea(false); downloadBtn.disabled = true; copyBtn.disabled = true;
        } finally {
            convertBtn.disabled = !imageInput.files[0]; convertBtn.textContent = 'Convert to SVG';
        }
    }

    function handleDownload() {
        if (!currentSvgContent) return;
        try {
            const svgBlob = new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'});
            const url=URL.createObjectURL(svgBlob);
            downloadLink.href=url; downloadLink.download=`${currentFilenameBase}_vectorised.svg`;
            downloadLink.click(); URL.revokeObjectURL(url);
        } catch(e){console.error("Download failed:", e); updateStatus('Error downloading','error');}
    }

    function handleCopy() {
        if (!svgCodeTextarea.value) return;
        navigator.clipboard.writeText(svgCodeTextarea.value).then(()=>{
            const originalText = copyBtn.textContent;
            const originalBg = copyBtn.style.backgroundColor;
            copyBtn.textContent='Copied!'; copyBtn.style.backgroundColor='#28a745'; copyBtn.style.color='white';
            setTimeout(()=>{ copyBtn.textContent=originalText; copyBtn.style.backgroundColor=originalBg; copyBtn.style.color=''; }, 1500);
        }).catch(e=>{ console.error('Failed to copy:',e); updateStatus('Failed to copy code','error'); });
    }

    // --- Utility Functions ---
    let statusClearTimer;
    function updateStatus(message, type, clearDelay = 0) {
        clearTimeout(statusClearTimer);
        statusArea.textContent = message;
        statusArea.className = `status-area ${type}`;
        if (type !== 'error' && clearDelay > 0 && message !== '') {
            statusClearTimer = setTimeout(() => {
                if (statusArea.textContent === message) updateStatus('', '');
            }, clearDelay);
        }
        if(type === 'error'){ console.error("UI Status:", message); }
    }

    function resetFileSelection() {
        imageInput.value = ''; fileNameDisplay.textContent = 'No file chosen';
        imagePreviewArea.style.display = 'none'; imagePreview.src = '#';
        convertBtn.disabled = true;
        resetResultArea();
        updateOptionsAvailability(); // Reset options enabled state too
    }

    function resetResultArea(clearStatusToo = true) {
        svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>';
        svgOutputDiv.classList.add('placeholder-text');
        svgCodeTextarea.value = ''; currentSvgContent = '';
        downloadBtn.disabled = true; copyBtn.disabled = true;
        if (clearStatusToo) updateStatus('', '');
    }

    // --- Initial State Setup ---
    resetFileSelection(); // Reset form/results
    updateOptionsAvailability(); // Set initial enabled/disabled state for options

}); // End DOMContentLoaded
