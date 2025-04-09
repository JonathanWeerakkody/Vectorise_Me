// public/script.js - FINAL STABLE VERSION (Presets added, Side-by-Side, No Slider/OverlayFix/Zoom/Copy)

document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // ... (Get ALL standard elements: landingView, appView, imageInput, dropZone, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, startConversionBtn, uploadNewBtn, optionsForm, convertBtn, statusArea, resetOptionsBtn, svgOutputDiv, previewOriginalImage, downloadBtn, downloadLink) ...
    // ... (Get Option elements: modeSelect, colormodeSelect, paletteSelect, colorPrecisionInput) ...
    // ... (Get Preset UI elements: presetSelector, savePresetBtn, managePresetsBtn, toggleAdvancedBtn, optionsFormWrapper, presetModal, modalBackdrop, closeModalBtn, presetListUl) ...
     // Remove refs no longer needed: svgOutputWrapper, originalImageWrapper, vectorImageWrapper, comparisonContainer, comparisonSlider, comparisonContentWrapper, zoom buttons

    // --- Initial Element Check ---
     // Simplified list for this version
     const criticalElementRefs = { landingView, appView, imageInput, dropZone, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, uploadNewBtn, resetOptionsBtn, modeSelect, colormodeSelect, paletteSelect, colorPrecisionInput, presetSelector, savePresetBtn, managePresetsBtn, toggleAdvancedBtn, optionsFormWrapper, previewOriginalImage };
     let missingElement = false; for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } } if (missingElement) { alert("UI Initialization Error."); return; } console.log("Initial element checks passed.");


    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    let defaultOptions = {}; // Stores initial form values AFTER preset is applied
    let customPresets = {}; // Loaded from localStorage
    // Zoom/Pan and Dimension states REMOVED

    // --- Built-in Presets Definition ---
     const builtInPresets = {
         "Default Building": { mode: "spline", color_mode: "color", corner_threshold: 60, filter_speckle: 4, path_precision: 3, spline_threshold: 0.75, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 2, palette_selector: "6" },
         "Photo (Detailed)": { mode: "spline", color_mode: "color", corner_threshold: 85, filter_speckle: 2, path_precision: 5, spline_threshold: 0.6, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 1.5, palette_selector: "8" },
         "Illustration / Poster": { mode: "spline", color_mode: "color", corner_threshold: 50, filter_speckle: 6, path_precision: 3, spline_threshold: 0.8, splice_threshold: 60, segment_length: 5, hierarchical: 'stacked', gradient_step: 2.5, palette_selector: "5" },
         "Line Art / Diagram": { mode: "polygon", color_mode: "bw", corner_threshold: 40, filter_speckle: 10, path_precision: 2, /* Others irrelevant */ palette_selector: "6"},
         "Pixel Art": { mode: "pixel", color_mode: "color", filter_speckle: 0, path_precision: 1, /* Others irrelevant */ hierarchical: 'stacked', gradient_step: 0, palette_selector: "8" },
     };


    // --- Helper: Safe Event Listener ---
    function safeAddListener(el, ev, fn, opts) { if (el && typeof fn === 'function') el.addEventListener(ev, fn, opts); else if(!el) console.warn(`Element not found for listener: ${ev}`); }

    // --- Initial UI Setup ---
    loadCustomPresets();
    showLandingView();
    populatePresetSelector();
    storeDefaultOptions(builtInPresets[presetSelector.value || "Default Building"] || {});
    applyPreset(presetSelector.value || "Default Building");
    updateOptionsAvailability();
    setupNumberInputSync();
    // NO Zoom/Pan setup
    // Collapse advanced options initially
    optionsFormWrapper.classList.add('collapsed'); toggleAdvancedBtn.setAttribute('aria-expanded','false'); toggleAdvancedBtn.querySelector('i').style.transform = 'rotate(0deg)';

    // --- Original Preview Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { console.log("Original preview loaded."); });
    safeAddListener(previewOriginalImage, 'error', () => { console.error("Failed to load preview."); if(previewOriginalImage) previewOriginalImage.src = '#'; });


    // --- Drag and Drop ---
    /* ... Keep handleDragEnter, handleDragOver, handleDragLeave, handleDrop, and dropZone listeners ... */

    // --- Event Listeners Setup ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
    safeAddListener(presetSelector, 'change', handlePresetChange);
    safeAddListener(savePresetBtn, 'click', handleSavePreset);
    safeAddListener(managePresetsBtn, 'click', openPresetModal);
    safeAddListener(closeModalBtn, 'click', closePresetModal);
    safeAddListener(modalBackdrop, 'click', closePresetModal);
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); }
    // NO Window Resize Listener needed


    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() { /* ... Keep full function including palette->precision link */ }

    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... same ... */ }
    function handleFile(file) {
         if (!file) { resetAppToLanding(); return; } if(landingStatusArea) landingStatusArea.textContent = ''; const vError = validateFile(file); if (vError) { showLandingError(vError); resetAppToLanding(); return; } currentFile = file; currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL);
         try { currentFileObjectURL = URL.createObjectURL(file); if (previewOriginalImage) previewOriginalImage.src = currentFileObjectURL; } catch(e) { /* error */ } /* Update UI */ if (fileNameDisplay) fileNameDisplay.textContent = file.name; if (fileInfoArea) fileInfoArea.classList.remove('hidden'); if (dropZone) dropZone.style.display = 'none'; if (uploadProgress) uploadProgress.classList.add('hidden'); if (startConversionBtn) startConversionBtn.classList.remove('hidden'); if (uploadArea) uploadArea.classList.add('file-selected');
         // No Zoom reset
     }
    function validateFile(file) { /* ... same ... */ return null; }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... same ... calls handleConvert(true) */ }
    async function handleConvert(isInitial = false) {
        if (!currentFile) return; updateStatus(isInitial ? 'Vectorizing...' : 'Updating...', 'loading'); if(convertBtn){ convertBtn.disabled=true; convertBtn.textContent='Working...'; } if(downloadBtn) downloadBtn.disabled=true;
        if (svgOutputDiv) svgOutputDiv.innerHTML = `<p class="placeholder-text">${isInitial ? 'Processing...' : 'Updating preview...'}</p>`;
        const formData = new FormData(); formData.append('imageFile', currentFile);
        // Logic to add ENABLED options, handling palette proxy -> color_precision
        if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') { formData.append(key, value); } } }
        console.log("Sending data...");
        try {
            const res = await fetch('/convert', { method: 'POST', body: formData }); const result = await res.json(); if (!res.ok) throw new Error(result.error || `Server error ${res.status}`);
            if (result.svg) { currentSvgContent = result.svg; if (svgOutputDiv) { svgOutputDiv.innerHTML = currentSvgContent; svgOutputDiv.classList.remove('placeholder-text'); } updateStatus('Complete!', 'success', 3000); if (downloadBtn) downloadBtn.disabled = false; if (convertBtn) { convertBtn.textContent = 'Update Vectorization'; convertBtn.disabled = true; }
                // NO Dimension calc call needed
                // NO Zoom reset call needed
             } else throw new Error("No SVG data.");
        } catch (error) { /* ... Error handling ... */ updateStatus(`Error: ${error.message}`, 'error'); if (isInitial) resetResultArea(false); }
        finally { if (convertBtn) convertBtn.disabled = !currentFile; if (convertBtn) convertBtn.textContent = 'Update Vectorization'; }
    }
    function simulateUploadProgress(callback) { /* ... same ... */ }

    // --- Dimension Calculation REMOVED ---
    // --- Comparison Slider Logic REMOVED ---
    // --- Zoom and Pan Logic REMOVED ---

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... same ... */ }

    // --- UI State Management ---
    function showLandingView() { if(landingView) landingView.classList.remove('hidden'); if(appView) appView.classList.add('hidden'); if(uploadNewBtn) uploadNewBtn.classList.add('hidden'); resetUploadAreaVisuals(); }
    function showAppView() { if(landingView) landingView.classList.add('hidden'); if(appView) appView.classList.remove('hidden'); if(uploadNewBtn) uploadNewBtn.classList.remove('hidden'); updateOptionsAvailability(); resetResultArea(); updateStatus('', ''); }
    function resetAppToLanding() { currentFile = null; currentSvgContent = ''; if (imageInput) imageInput.value = ''; if (fileNameDisplay) fileNameDisplay.textContent = ''; if (currentFileObjectURL) URL.revokeObjectURL(currentFileObjectURL); if(previewOriginalImage){previewOriginalImage.src='#';} showLandingView(); updateStatus('', ''); if (landingStatusArea) landingStatusArea.textContent = ''; }
    function resetUploadAreaVisuals(){ /* ... same ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { if (!modeSelect||!colormodeSelect||!paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); toggleOptionGroup(colorPrecisionGroup,false); if(resetOptionsBtn) resetOptionsBtn.disabled = false; }
    function toggleOptionGroup(groupElement, enable) { /* ... same ... */ }

    // --- Option Reset / Presets ---
    function storeDefaultOptions(source=null) { /* ... same logic ... captures form, includes palette_selector */ }
    function handleResetOptions() { /* ... same, uses applyPreset with current selector value */ }
    function populatePresetSelector() { /* ... same ... populates from builtInPresets and customPresets */ }
    function handlePresetChange(event) { applyPreset(event.target.value); }
    function applyPreset(presetName, isReset = false) { /* ... same logic to set form values from presets... */ }
    function handleSavePreset() { /* ... same logic to save to customPresets and localStorage */ }
    function loadCustomPresets() { /* ... same ... loads from localStorage */ }
    function saveCustomPresets() { /* ... same ... */ }
    function openPresetModal() { /* ... same ... builds modal list */ }
    function closePresetModal() { /* ... same ... hides modal/backdrop */ }
    function handleDeletePreset(nameToDelete) { /* ... same ... deletes and updates UI */ }

    // --- Advanced Options Toggle ---
    function toggleAdvancedOptions() { if(!optionsFormWrapper || !toggleAdvancedBtn) return; const isCollapsed = optionsFormWrapper.classList.toggle('collapsed'); toggleAdvancedBtn.setAttribute('aria-expanded', !isCollapsed); const icon = toggleAdvancedBtn.querySelector('i'); if(icon) icon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'; }
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);

    // --- Download Logic ---
    function handleDownload() { /* ... same ... */ }
    // --- Copy Logic REMOVED ---

    // --- Utility Functions ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... same ... */ }
    function showLandingError(message){ /* ... same ... */ }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv){/* clear */} currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(clearStatusToo) updateStatus(''); /* No wrapper style resets */ }

    // --- Initial State Calls ---
    updateOptionsAvailability();
    // No zoom button update needed
    console.log("vectorise.me script initialized (Presets FINAL STABLE).");

}); // End DOMContentLoaded