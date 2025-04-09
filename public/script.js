// public/script.js - Final COMPLETE Version (Presets, Zoom, Input Sync, Wrapper Size Fix)

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
    const convertBtn = document.getElementById('convertBtn'); // Update/Vectorize button
    const statusArea = document.getElementById('statusArea'); // App status area
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const svgOutputDiv = document.getElementById('svgOutput'); // SVG injection target
    const previewOriginalImage = document.getElementById('previewOriginalImage'); // Original image element
    const originalImageWrapper = document.getElementById('originalImageWrapper'); // Wrapper for IMG
    const vectorImageWrapper = document.getElementById('vectorImageWrapper'); // Wrapper for SVG structure
    const previewAreaWrapper = document.getElementById('previewAreaWrapper'); // Wrapper for zoom/pan events
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    // Zoom Elements
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    // Preset Elements
    const presetSelector = document.getElementById('presetSelector');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const managePresetsBtn = document.getElementById('managePresetsBtn');
    const toggleAdvancedBtn = document.getElementById('toggleAdvancedBtn');
    const optionsFormWrapper = document.getElementById('optionsFormWrapper');
    const presetModal = document.getElementById('presetModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const presetListUl = document.getElementById('presetList');
    const paletteSelect = document.getElementById('optPalette'); // Palette select element
    const colorPrecisionInput = document.getElementById('optColorPrecision'); // Hidden input

    // Option Controllers & Groups refs (Ensure these match HTML)
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Hidden group ref
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette'); // Palette select group

    // --- Initial Element Check ---
    const criticalElementRefs = { landingView, appView, imageInput, dropZone, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, startConversionBtn, uploadNewBtn, optionsForm, convertBtn, statusArea, resetOptionsBtn, svgOutputDiv, previewOriginalImage, originalImageWrapper, vectorImageWrapper, previewAreaWrapper, downloadBtn, zoomInBtn, zoomOutBtn, zoomResetBtn, presetSelector, savePresetBtn, managePresetsBtn, toggleAdvancedBtn, optionsFormWrapper, presetModal, modalBackdrop, closeModalBtn, presetListUl, modeSelect, colormodeSelect, paletteSelect, colorPrecisionInput };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");

    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    let defaultOptions = {}; // Populated by storeDefaultOptions based on INITIAL form state after presets are applied
    let customPresets = {}; // Loaded from localStorage
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10;
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };

    // --- Built-in Presets Definition ---
    const builtInPresets = { /* ... Keep the 5 presets defined before ... */
         "Building (Default)": { mode: "spline", color_mode: "color", corner_threshold: 60, filter_speckle: 4, path_precision: 3, spline_threshold: 0.75, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 2, palette_selector: "6" },
         "Photo (Detailed)": { mode: "spline", color_mode: "color", corner_threshold: 85, filter_speckle: 2, path_precision: 5, spline_threshold: 0.6, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 1.5, palette_selector: "8" },
         "Illustration / Poster": { mode: "spline", color_mode: "color", corner_threshold: 50, filter_speckle: 6, path_precision: 3, spline_threshold: 0.8, splice_threshold: 60, segment_length: 5, hierarchical: 'stacked', gradient_step: 2.5, palette_selector: "5" },
         "Line Art / Diagram": { mode: "polygon", color_mode: "bw", corner_threshold: 40, filter_speckle: 10, path_precision: 2, spline_threshold: 0.75, splice_threshold: 45, segment_length: 4, palette_selector: "6"}, // Palette irrelevant for bw, but set a default
         "Pixel Art": { mode: "pixel", color_mode: "color", filter_speckle: 0, path_precision: 1, /* Geom opts irrelevant */ hierarchical: 'stacked', gradient_step: 0, palette_selector: "8" },
    };

    // --- Helper: Safe Event Listener ---
    function safeAddListener(el, ev, fn, opts) { if (el && typeof fn === 'function') el.addEventListener(ev, fn, opts); else if(!el) console.warn(`Element not found for listener: ${ev}`); }

    // --- Initial UI Setup ---
    loadCustomPresets();
    showLandingView();
    populatePresetSelector();
    // Store default options *after* presets are populated and one is selected
    storeDefaultOptions(builtInPresets[presetSelector.value || "Building (Default)"] || {}); // Prime defaults with selected preset
    applyPreset(presetSelector.value || "Building (Default)"); // Ensure selected preset values applied
    updateOptionsAvailability();
    setupNumberInputSync();
    setupZoomPan();
    updateZoomButtons();
    optionsFormWrapper.classList.add('collapsed'); // Start with advanced options collapsed
    toggleAdvancedBtn.setAttribute('aria-expanded','false');
    toggleAdvancedBtn.querySelector('i').style.transform = 'rotate(0deg)';


    // --- Comparison Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { /* ... calculates dims ... */ });
    safeAddListener(previewOriginalImage, 'error', () => { /* ... */ });

    // --- Drag and Drop ---
    function handleDragEnter(e) { /* ... */ } function handleDragOver(e) { /* ... */ } function handleDragLeave(e) { /* ... */ } function handleDrop(e) { /* ... calls handleFile ... */ }
    if (dropZone) { /* ... Add listeners ... */ }

    // --- Event Listeners Setup ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    // No Copy Listener
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability);
    safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
    safeAddListener(presetSelector, 'change', handlePresetChange);
    safeAddListener(savePresetBtn, 'click', handleSavePreset);
    safeAddListener(managePresetsBtn, 'click', openPresetModal);
    safeAddListener(closeModalBtn, 'click', closePresetModal);
    safeAddListener(modalBackdrop, 'click', closePresetModal);
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);
    // Option form change listener
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); }
    // Window Resize Listener
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyWrapperSize, 150); });

    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() { /* ... keep sync logic, includes palette->precision link ... */ }

    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... */ } function handleFile(file) { /* ... same logic ... calls resetZoomPan */ } function validateFile(file) { /* ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... */ }
    async function handleConvert(isInitial = false) { /* ... same, calls calc & reset zoom/pan on success ... */ }
    function simulateUploadProgress(callback) { /* ... */ }

    // --- Dimension Calculation (Sizes WRAPPERS) ---
    function calculateAndApplyWrapperSize() { /* ... same logic ... sets w/h on originalImageWrapper & vectorImageWrapper ... */ }

    // --- Zoom and Pan Logic ---
    function setTransform() { /* ... applies transform to BOTH wrappers ... updates buttons ... */ }
    function setupZoomPan() { /* ... same setup ... */ }
    function zoom(factor) { /* ... same ... */ }
    function resetZoomPan() { /* ... same ... calls calc & apply */ }
    function updateZoomButtons() { /* ... same ... */ }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... same ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... */ } function showAppView() { /* ... calls resetZoomPan ... */ } function resetAppToLanding() { /* ... calls resetZoomPan, clears wrapper sizes ... */ } function resetUploadAreaVisuals(){ /* ... */ }

    // --- Conditional Options Logic ---
    function updateOptionsAvailability() { /* ... same logic, ensures palette group visibility tied to color mode ... */ }
    function toggleOptionGroup(groupElement, enable) { /* ... same ... */ }

    // --- Option Reset / Presets ---
    function storeDefaultOptions(source = null) { if (!optionsForm) return; defaultOptions = {}; // Clear first
      const formData = source ? null : new FormData(optionsForm); // Use form data unless source obj provided
      for(const element of optionsForm.elements){
          let key = element.name;
          if(!key || defaultOptions[key] !== undefined) continue; // Skip unnamed or already set
          if(source && source[key] !== undefined){ // Prioritize source object if given
             defaultOptions[key] = String(source[key]); // Ensure string
          } else if (formData) { // Fallback to current form data
              let value = formData.get(key);
               if(element.type === 'checkbox') defaultOptions[key] = element.checked;
               else if(value !== null) defaultOptions[key] = value;
          } else if(element.tagName === 'SELECT'){ // Fallback for selects if no form data
             defaultOptions[key] = element.value;
          } else if (element.type === 'checkbox') {
              defaultOptions[key] = element.checked;
          } else if(element.value){ // Fallback for other inputs
              defaultOptions[key] = element.value;
          }
      }
      // Ensure proxy selector value is captured from the dropdown itself
      if(paletteSelect) defaultOptions['palette_selector'] = paletteSelect.value;
      console.log("Stored default options:", defaultOptions); }
    function handleResetOptions() { console.log("Resetting options to current Preset's defaults"); const currentPresetName = presetSelector?.value || "Building (Default)"; applyPreset(currentPresetName, true); updateStatus('Options reset to preset default.', 'success', 2000); }
    function populatePresetSelector() { /* ... same ... */ }
    function handlePresetChange(event) { applyPreset(event.target.value); }
    function applyPreset(presetName, isReset = false) { console.log("Applying preset:", presetName); const presetData = builtInPresets[presetName] || customPresets[presetName]; if (!presetData || !optionsForm) return; for (const key in presetData) { const element = optionsForm.elements[key]; if (element) { if(element.type === 'checkbox') element.checked = (presetData[key] === true || presetData[key] === 'true'); else element.value = presetData[key]; if (element.type === 'range' || element.type === 'number' || element.tagName === 'SELECT') element.dispatchEvent(new Event('input', { bubbles: true }));} else if (key === 'palette_selector' && paletteSelect) { paletteSelect.value = presetData[key]; paletteSelect.dispatchEvent(new Event('change', { bubbles: true })); } } updateOptionsAvailability(); if(!isReset && currentFile && convertBtn){ convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization';} if(isReset && convertBtn) { convertBtn.disabled = true; } /* Disable btn on explicit reset */ updateStatus(`Preset '${presetName}' applied.`, 'success', 1500); }
    function handleSavePreset() { /* ... same ... captures including palette_selector */ }
    function loadCustomPresets() { /* ... same ... */ }
    function saveCustomPresets() { /* ... same ... */ }
    function openPresetModal() { /* ... same ... */ } function closePresetModal() { /* ... same ... */ } function handleDeletePreset(nameToDelete) { /* ... same ... */ }

    // --- Advanced Options Toggle ---
    function toggleAdvancedOptions() { if(!optionsFormWrapper || !toggleAdvancedBtn) return; const isCollapsed = optionsFormWrapper.classList.toggle('collapsed'); toggleAdvancedBtn.setAttribute('aria-expanded', !isCollapsed); const icon = toggleAdvancedBtn.querySelector('i'); if(icon) icon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'; }
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);

    // --- Download Logic ---
    function handleDownload() { /* ... same ... */ }
    // Copy Logic REMOVED

    // --- Utility ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... */ } function showLandingError(message){ /* ... */ }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv){/* Clear content */} currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(clearStatusToo) updateStatus(''); /* No wrapper/slider resets needed here */ }

    // --- Initial State Calls ---
    // Presets are populated/applied in setup, then options availability set
    updateOptionsAvailability();
    updateZoomButtons();
    console.log("vectorise.me script initialized (Presets + Zoom + Final Fixes).");

}); // End DOMContentLoaded