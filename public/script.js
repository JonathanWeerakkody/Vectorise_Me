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
    const svgCodeTextarea = document.getElementById('svgCode'); // Hidden textarea
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadLink = document.getElementById('downloadLink'); // Hidden link

    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = ''; // Store the latest valid SVG result

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
              }
             valueDisplay.textContent = displayValue;
         };
         updateDisplay(); // Initial value
         slider.addEventListener('input', updateDisplay); // Update on drag
     });

    // --- Event Listeners ---

    // Handle File Selection
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        resetResultArea(); // Clear previous results

        if (file) {
             // Basic Validation
             if (file.size > 15 * 1024 * 1024) { // Match server limit
                 updateStatus('Error: File exceeds 15MB limit.', 'error');
                 resetFileSelection();
                 return;
             }
             if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
                 updateStatus(`Error: Unsupported file type (${file.type || 'unknown'}).`, 'error');
                 resetFileSelection();
                 return;
             }

            fileNameDisplay.textContent = file.name;
            currentFilenameBase = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            convertBtn.disabled = false; // Enable convert button

            // Show image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreviewArea.style.display = 'block';
            };
            reader.onerror = () => {
                 updateStatus('Error reading image preview.', 'error');
                 resetFileSelection();
            }
            reader.readAsDataURL(file);

        } else {
            resetFileSelection();
        }
    });

    // Handle Convert Button Click
    convertBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (!file) {
            updateStatus('Please select an image first.', 'error');
            return;
        }

        updateStatus('Uploading and converting...', 'loading');
        convertBtn.disabled = true;
        convertBtn.textContent = 'Converting...';
        resetResultArea(false); // Clear previous SVG but keep status

        // Create FormData
        const formData = new FormData();
        formData.append('imageFile', file);

        // Append options from the form
        const optionsData = new FormData(optionsForm);
         for(let [key, value] of optionsData.entries()) {
              if (value !== '' && value !== null) { // Only send non-empty options
                 formData.append(key, value);
              }
         }

        console.log("Sending data to /convert...");

        try {
            const response = await fetch('/convert', {
                method: 'POST',
                body: formData
                // Headers are automatically set for FormData
            });

            const result = await response.json(); // Expecting {svg: '...'} or {error: '...'}

            if (!response.ok) {
                // Throw error with message from server's JSON response if possible
                throw new Error(result.error || `Server error: ${response.status} ${response.statusText}`);
            }

            // Success
            currentSvgContent = result.svg; // Store result
            svgOutputDiv.innerHTML = currentSvgContent; // Display SVG
             svgCodeTextarea.value = currentSvgContent; // Set hidden textarea for copy
            svgOutputDiv.classList.remove('placeholder-text');
            updateStatus('Conversion successful!', 'success', 3000); // Clear after 3s
            downloadBtn.disabled = false;
            copyBtn.disabled = false;

        } catch (error) {
            console.error('Conversion Fetch Error:', error);
            updateStatus(`Error: ${error.message}`, 'error');
            resetResultArea(false); // Clear SVG on error
             // Keep buttons disabled on error
             downloadBtn.disabled = true;
             copyBtn.disabled = true;

        } finally {
            // Re-enable convert button if a file is still selected
            convertBtn.disabled = !imageInput.files[0];
             convertBtn.textContent = 'Convert to SVG';
        }
    });

    // Handle Download Button
    downloadBtn.addEventListener('click', () => {
        if (!currentSvgContent) return;
        try {
             const svgBlob = new Blob([currentSvgContent], { type: 'image/svg+xml;charset=utf-8' });
             const url = URL.createObjectURL(svgBlob);
             downloadLink.href = url;
             downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
             downloadLink.click();
             URL.revokeObjectURL(url);
        } catch (error) {
              console.error("Download failed:", error);
              updateStatus('Error creating download link.', 'error');
        }
    });

    // Handle Copy Button
    copyBtn.addEventListener('click', () => {
         if (!svgCodeTextarea.value) return;
         navigator.clipboard.writeText(svgCodeTextarea.value).then(() => {
             copyBtn.textContent = 'Copied!';
             copyBtn.style.backgroundColor = '#28a745'; // Visual feedback
             setTimeout(() => {
                 copyBtn.textContent = 'Copy SVG Code';
                 copyBtn.style.backgroundColor = ''; // Reset style
             }, 1500);
         }).catch(err => {
             console.error('Failed to copy SVG code:', err);
             updateStatus('Failed to copy code. Browser permissions?', 'error');
         });
     });


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
    }

    function resetFileSelection() {
         imageInput.value = ''; // Clear the file input visually
         fileNameDisplay.textContent = 'No file chosen';
         imagePreviewArea.style.display = 'none';
         imagePreview.src = '#';
         convertBtn.disabled = true;
          resetResultArea(); // Also clear results when file selection is reset
    }

    function resetResultArea(clearStatusToo = true) {
        svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>';
        svgOutputDiv.classList.add('placeholder-text'); // Ensure placeholder class is present
         svgCodeTextarea.value = '';
        currentSvgContent = '';
        downloadBtn.disabled = true;
        copyBtn.disabled = true;
         if(clearStatusToo) {
             updateStatus('', ''); // Clear status messages
         }
    }

    // Initial state
    resetFileSelection();

}); // End DOMContentLoaded
