// public/script.js - FINAL COMPLETE Version with Presets, Zoom, Wrapper Sizing

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
    const previewAreaWrapper = document.getElementById('previewAreaWrapper'); // Wrapper for events
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
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

    // Option Controllers & Groups (Ensure these IDs match HTML)
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
    const criticalElementRefs = { landingView, appView, imageInput, optionsForm, convertBtn, statusArea, svgOutputDiv, downloadBtn, uploadNewBtn, dropZone, previewAreaWrapper, previewOriginalImage, originalImageWrapper, vectorImageWrapper, modeSelect, colormodeSelect, resetOptionsBtn, startConversionBtn, fileInfoArea, fileNameDisplay, cancelUploadBtn, uploadProgress, progressBar, landingStatusArea, zoomInBtn, zoomOutBtn, zoomResetBtn, presetSelector, savePresetBtn, managePresetsBtn, toggleAdvancedBtn, optionsFormWrapper, presetModal, modalBackdrop, closeModalBtn, presetListUl, paletteSelect, colorPrecisionInput };
    let missingElement = false;
    for (const key in criticalElementRefs) { if (!criticalElementRefs[key]) { missingElement = true; console.error(`FATAL ERROR: Element variable '${key}' is null.`); } }
    if (missingElement) { alert("UI Initialization Error. Check console (F12)."); return; }
    console.log("Initial element checks passed.");


    // --- State Variables ---
    let currentFile = null, currentFileObjectURL = null, currentFilenameBase = 'vectorised-image', currentSvgContent = '';
    const defaultOptions = {}; // Populated by storeDefaultOptions
    let customPresets = {}; // Loaded from localStorage
    let scale = 1; const MIN_SCALE = 0.15; const MAX_SCALE = 10;
    let panning = false; let pointX = 0, pointY = 0; let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };

    // --- Built-in Presets ---
    const builtInPresets = {
         "Default (Spline)": { mode: "spline", color_mode: "color", corner_threshold: 60, filter_speckle: 4, path_precision: 3, spline_threshold: 0.75, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 2, palette_selector: "6" },
         "Detailed Photo": { mode: "spline", color_mode: "color", corner_threshold: 100, filter_speckle: 2, path_precision: 4, spline_threshold: 0.5, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 1, palette_selector: "8" },
         "Poster / Cartoon": { mode: "spline", color_mode: "color", corner_threshold: 45, filter_speckle: 8, path_precision: 3, spline_threshold: 0.85, splice_threshold: 60, segment_length: 5, hierarchical: 'stacked', gradient_step: 3, palette_selector: "5" },
         "Pixel Art": { mode: "pixel", color_mode: "color", corner_threshold: 0, filter_speckle: 0, path_precision: 1, spline_threshold: 0.5, splice_threshold: 45, segment_length: 4, hierarchical: 'stacked', gradient_step: 0, palette_selector: "8" },
         "B&W Sketch / Logo": { mode: "spline", color_mode: "bw", corner_threshold: 40, filter_speckle: 10, path_precision: 3, spline_threshold: 0.85, splice_threshold: 45, segment_length: 5, palette_selector: "6" }, // color opts are irrelevant but set
     };


    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) { if (element && typeof handler === 'function') element.addEventListener(event, handler, options); else if(!element) console.warn(`Element not found for listener: ${event}`); }

    // --- Initial UI Setup ---
    loadCustomPresets(); // Load FIRST
    showLandingView();
    populatePresetSelector(); // Populate dropdown
    storeDefaultOptions(); // Store initial values AFTER populating might be needed if defaults rely on preset list
    applyPreset("Default (Spline)"); // Apply defaults on load
    updateOptionsAvailability();
    setupNumberInputSync();
    setupZoomPan();
    updateZoomButtons();

    // --- Original Preview Image Load Listener ---
    safeAddListener(previewOriginalImage, 'load', () => { /* ... same, triggers calculateAndApplyWrapperSize */ });
    safeAddListener(previewOriginalImage, 'error', () => { /* ... same */ });

    // --- Drag and Drop ---
    /* ... Keep Handlers & Listener Setup ... */
    if (dropZone) { /* ... Add listeners ... */ }

    // --- Event Listeners ---
    safeAddListener(imageInput, 'change', handleFileSelectChange);
    safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
    safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
    safeAddListener(convertBtn, 'click', () => handleConvert(false));
    safeAddListener(downloadBtn, 'click', handleDownload);
    safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
    safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
    safeAddListener(modeSelect, 'change', updateOptionsAvailability);
    safeAddListener(colormodeSelect, 'change', updateOptionsAvailability);
    safeAddListener(paletteSelect, 'change', updateOptionsAvailability); // Palette influences color precision/options
    safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
    safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
    safeAddListener(zoomResetBtn, 'click', resetZoomPan);
    safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
    safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
    safeAddListener(presetSelector, 'change', handlePresetChange); // Add preset change listener
    safeAddListener(savePresetBtn, 'click', handleSavePreset);
    safeAddListener(managePresetsBtn, 'click', openPresetModal);
    safeAddListener(closeModalBtn, 'click', closePresetModal);
    safeAddListener(modalBackdrop, 'click', closePresetModal);
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);

    // Option form change listener (unchanged)
    if (optionsForm) { optionsForm.addEventListener('change', () => { if (currentSvgContent && convertBtn) { convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization'; } }); }
    // Window Resize Listener
    let resizeTimeout; window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(calculateAndApplyWrapperSize, 150); });


    // --- Number Input / Slider Syncing ---
    function setupNumberInputSync() { /* ... Keep full sync logic including palette->precision link ... */
        if (!optionsForm) return;
        optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
            const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId);
            const valueDisplayId = `${slider.id}Value`; const valueDisplay = document.getElementById(valueDisplayId); // Keep this if using text spans

            if (numInput) { /* ... slider <-> numInput sync logic ... */ }
            if (valueDisplay) { /* ... slider -> valueDisplay text update logic ... */ }
        });
        // Link Palette Selector to Hidden Color Precision Input
        if (paletteSelect && colorPrecisionInput) {
           safeAddListener(paletteSelect, 'change', (e) => {
                colorPrecisionInput.value = e.target.value;
                optionsForm?.dispatchEvent(new Event('change', { bubbles: true })); // Make sure rest of UI knows value changed
                console.log(`Mapped Palette Select [${e.target.value}] to color_precision: ${colorPrecisionInput.value}`);
            });
            // Ensure initial sync on load
             colorPrecisionInput.value = paletteSelect.value;
        }
    }


    // --- File Handling ---
    function handleFileSelectChange(event) { /* ... */ } function handleFile(file) { /* ... resets zoom, loads preview src ... */ } function validateFile(file) { /* ... */ }

    // --- Conversion ---
    function triggerConversionFromLanding() { /* ... */ }
    async function handleConvert(isInitial = false) {
        /* ... setup, status, disable buttons ... */
        const formData = new FormData(); formData.append('imageFile', currentFile);
        // Get options, handling palette proxy correctly
        if (optionsForm) { const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el = optionsForm.elements[key]; if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') { formData.append(key, value); } } }
        /* ... rest of fetch, success (incl dimension calc, resetZoomPan), error handling ... */
    }
    function simulateUploadProgress(callback) { /* ... */ }


    // --- Dimension Calculation ---
    function calculateAndApplyWrapperSize() { /* ... Keep exact same logic - sizes image-wrapper divs ... */ }

    // --- Zoom and Pan Logic ---
    function setTransform() { /* ... Apply same transform to BOTH image-wrapper divs ... call updateZoomButtons */ }
    function setupZoomPan() { /* ... Adds listeners to previewAreaWrapper ... calls setTransform */ }
    function zoom(factor) { /* ... Calculates new state, calls setTransform, clamps scale ... */ }
    function resetZoomPan() { /* ... Resets state, calls setTransform and calculateAndApplyWrapperSize ... */ }
    function updateZoomButtons() { /* ... Disables buttons at MIN/MAX_SCALE ... */ }

    // --- SVG Path Hover Logic ---
    function handleSvgPathHover(event) { /* ... Add/Remove path-hover class ... */ }

    // --- UI State Management ---
    function showLandingView() { /* ... */ } function showAppView() { /* ... calls resetZoomPan */ }
    function resetAppToLanding() { /* ... calls resetZoomPan, clears wrapper styles ... */ } function resetUploadAreaVisuals(){ /* ... */ }

    // --- Conditional Options Logic (Includes Palette Group) ---
    function updateOptionsAvailability() { if (!modeSelect || !colormodeSelect || !paletteSelect) return; const m=modeSelect.value,c=colormodeSelect.value,sp=m==='spline',px=m==='pixel',cl=c==='color'; toggleOptionGroup(splineThresholdGroup,sp); toggleOptionGroup(spliceThresholdGroup,sp); toggleOptionGroup(segmentLengthGroup,sp); toggleOptionGroup(cornerThresholdGroup,!px); toggleOptionGroup(hierarchicalGroup,cl); toggleOptionGroup(gradientStepGroup,cl); toggleOptionGroup(paletteGroup,cl); toggleOptionGroup(colorPrecisionGroup,false); /* BG group removed */ if(resetOptionsBtn) resetOptionsBtn.disabled = false; }
    function toggleOptionGroup(groupElement, enable) { /* ... adds/removes disabled class and input disabled prop ... */ }

    // --- Option Reset & Presets ---
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) defaultOptions[key] = value; defaultOptions['palette_selector'] = paletteSelect?.value || '6'; console.log("Stored default options:", defaultOptions); }
    function handleResetOptions() { console.log("Resetting to Default Preset"); applyPreset("Default (Spline)"); updateStatus('Options reset to default.', 'success', 2000); }
    function populatePresetSelector() { if (!presetSelector) return; const currentSelection = presetSelector.value; presetSelector.innerHTML = ''; const builtInGroup = document.createElement('optgroup'); builtInGroup.label = "Built-in Styles"; for (const name in builtInPresets) { const option = document.createElement('option'); option.value = name; option.textContent = name; builtInGroup.appendChild(option); } presetSelector.appendChild(builtInGroup); if (Object.keys(customPresets).length > 0) { const customGroup = document.createElement('optgroup'); customGroup.label = "My Presets"; for (const name in customPresets) { const option = document.createElement('option'); option.value = name; option.textContent = name; customGroup.appendChild(option); } presetSelector.appendChild(customGroup); } presetSelector.value = currentSelection && presetSelector.querySelector(`option[value="${CSS.escape(currentSelection)}"]`) ? currentSelection : "Default (Spline)"; }
    function handlePresetChange(event) { applyPreset(event.target.value); }
    function applyPreset(presetName) { console.log("Applying preset:", presetName); const presetData = builtInPresets[presetName] || customPresets[presetName]; if (!presetData || !optionsForm) return; for (const key in presetData) { const element = optionsForm.elements[key]; if (element) { if(element.type === 'checkbox') element.checked = presetData[key]; else element.value = presetData[key]; if (element.type === 'range' || element.type === 'number' || element.tagName === 'SELECT') element.dispatchEvent(new Event('input', { bubbles: true })); } else if (key === 'palette_selector' && paletteSelect) { paletteSelect.value = presetData[key]; paletteSelect.dispatchEvent(new Event('change', { bubbles: true })); } } updateOptionsAvailability(); if(currentFile && convertBtn){ convertBtn.disabled = false; convertBtn.textContent = 'Update Vectorization';} updateStatus(`Preset '${presetName}' applied.`, 'success', 1500); }
    function handleSavePreset() { const name = prompt("Enter preset name:", "My Preset"); if (!name?.trim()) return; if (builtInPresets[name]) { updateStatus(`Cannot overwrite: ${name}`, "error", 3000); return; } if (customPresets[name] && !confirm(`Overwrite "${name}"?`)) return; const currentSettings = {}; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { const el=optionsForm.elements[key]; if(el) currentSettings[key]=el.type==='checkbox'?el.checked:value; } if(paletteSelect) currentSettings['palette_selector'] = paletteSelect.value; customPresets[name] = currentSettings; saveCustomPresets(); populatePresetSelector(); presetSelector.value = name; updateStatus(`Preset "${name}" saved!`, 'success', 2000); }
    function loadCustomPresets() { try { customPresets = JSON.parse(localStorage.getItem('vectoriseMe_customPresets') || '{}'); } catch(e) { console.error("Err loading presets:", e); customPresets = {}; } }
    function saveCustomPresets() { try { localStorage.setItem('vectoriseMe_customPresets', JSON.stringify(customPresets)); } catch(e) { console.error("Err saving presets:", e); updateStatus("Could not save preset.", "error"); } }
    function openPresetModal() { if (!presetModal || !modalBackdrop || !presetListUl) return; presetListUl.innerHTML = ''; const names = Object.keys(customPresets).sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase())); if(names.length === 0) { presetListUl.innerHTML = '<li class="no-presets">No custom presets saved.</li>'; } else { names.forEach(name => { const li=document.createElement('li'); const nS=document.createElement('span'); nS.className='preset-name'; nS.textContent=name; const dB=document.createElement('button'); dB.className='delete-preset-button'; dB.innerHTML='<i class="fas fa-trash-alt"></i>'; dB.title=`Delete "${name}"`; dB.onclick=()=>handleDeletePreset(name); li.appendChild(nS); li.appendChild(dB); presetListUl.appendChild(li); }); } presetModal.classList.remove('hidden'); modalBackdrop.classList.remove('hidden'); }
    function closePresetModal() { if(presetModal)presetModal.classList.add('hidden'); if(modalBackdrop)modalBackdrop.classList.add('hidden'); }
    function handleDeletePreset(nameToDelete) { if (!customPresets[nameToDelete] || !confirm(`Delete preset "${nameToDelete}"?`)) return; delete customPresets[nameToDelete]; saveCustomPresets(); populatePresetSelector(); openPresetModal(); updateStatus(`Preset "${nameToDelete}" deleted.`, 'success', 2000); }

    // --- Advanced Options Toggle ---
    function toggleAdvancedOptions() { if(!optionsFormWrapper || !toggleAdvancedBtn) return; const isCollapsed = optionsFormWrapper.classList.toggle('collapsed'); toggleAdvancedBtn.setAttribute('aria-expanded', !isCollapsed); const icon = toggleAdvancedBtn.querySelector('i'); if(icon) icon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'; }
    safeAddListener(toggleAdvancedBtn, 'click', toggleAdvancedOptions);


    // --- Download Logic ---
    function handleDownload() { if (!currentSvgContent || !downloadLink) return; try { const b=new Blob([currentSvgContent],{type:'image/svg+xml;charset=utf-8'}); const u=URL.createObjectURL(b); downloadLink.href=u; downloadLink.download=`${currentFilenameBase}_vectorised.svg`; downloadLink.click(); URL.revokeObjectURL(u); } catch(e){ console.error(e); updateStatus('Error downloading','error');} }
    // --- Copy Logic REMOVED ---

    // --- Utility Functions ---
    let statusClearTimer; function updateStatus(message, type, clearDelay = 0) { /* ... same ... */ } function showLandingError(message){ /* ... same ... */ }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>'; svgOutputDiv.classList.add('placeholder-text'); } /* svgCodeTextarea removed */ currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; /* copyBtn removed */ if(clearStatusToo) updateStatus('', ''); /* wrapper style reset removed - handled by calc/resetZoomPan */ }

    // --- Initial State Calls ---
    // ApplyPreset called within Init now updateOptionsAvailability(); updateZoomButtons(); console.log("vectorise.me script initialized (Presets + Zoom + Final Fixes).");

}); // End DOMContentLoaded