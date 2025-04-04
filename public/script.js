// public/script.js - For Backend Processing Model

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
    const downloadLink = document.getElementById('downloadLink'); // Hidden link for downloads

    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = ''; // Store the latest valid SVG result from backend

    // --- Slider Value Display Updates ---
    // Find all range inputs within the options form
    optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplayId = `${slider.id}Value`; // Assumes matching ID convention (e.g., optCornerThresholdValue)
        const valueDisplay = document.getElementById(valueDisplayId);
        if (!valueDisplay) {
             console.warn("Missing value display for slider:", slider.id);
             return; // Skip if no display element found
        }

        // Function to format the display value based on slider ID
        const updateDisplay = () => {
            let displayValue = slider.value;
             switch (slider.id) {
                 case 'optCornerThreshold': displayValue += '°'; break;
                 case 'optFilterSpeckle': displayValue += ' px'; break;
                 case 'optColorPrecision': displayValue += ' bits'; break;
                 case 'optPathPrecision': displayValue += ' dec'; break;
                 // Add cases for other sliders if needed
             }
            valueDisplay.textContent = displayValue;
        };

        updateDisplay(); // Set initial value on page load
        slider.addEventListener('input', updateDisplay); // Update continuously as slider moves
    });

    // --- Event Listeners ---

    // Handle File Selection Change
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        resetResultArea(); // Clear previous results and status when a new file is chosen/cleared

        if (file) {
            // --- Client-Side File Validation ---
            if (file.size > 15 * 1024 * 1024) { // Match server limit (e.g., 15MB)
                updateStatus('Error: File exceeds 15MB limit.', 'error');
                resetFileSelection(); // Clear the invalid selection
                return;
            }
            // Allow common image types (can be refined)
            if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
                updateStatus(`Error: Unsupported file type (${file.type || 'unknown'}). Use JPG, PNG, WEBP, BMP.`, 'error');
                resetFileSelection();
                return;
            }

            fileNameDisplay.textContent = file.name;
            // Extract filename without extension for download suggestion
            currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;
            convertBtn.disabled = false; // Enable the convert button

            // --- Show Image Preview ---
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreviewArea.style.display = 'block'; // Show preview area
            };
            reader.onerror = () => {
                 updateStatus('Error reading image preview.', 'error');
                 resetFileSelection(); // Clear selection on reader error
            }
            reader.readAsDataURL(file);

        } else {
            // No file selected or selection cleared
            resetFileSelection();
        }
    });

    // Handle "Convert to SVG" Button Click
    convertBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (!file) {
            updateStatus('Please select an image first.', 'error');
            return; // Should not happen if button is disabled correctly, but good check
        }

        // --- UI Updates for Processing ---
        updateStatus('Uploading and converting...', 'loading');
        convertBtn.disabled = true;
        convertBtn.textContent = 'Converting...';
        resetResultArea(false); // Clear previous SVG output but keep status message

        // --- Prepare Data for Server ---
        const formData = new FormData();
        formData.append('imageFile', file); // The image itself

        // Append selected options from the form
        const optionsData = new FormData(optionsForm);
        for (let [key, value] of optionsData.entries()) {
             // Only send options that have a value
             if (value !== '' && value !== null) {
                formData.append(key, value);
                console.log(`Appending option: ${key} = ${value}`); // Debug log
             }
        }

        console.log("Sending data to backend /convert endpoint...");

        // --- Send Request to Backend ---
        try {
            const response = await fetch('/convert', { // Fetch the backend endpoint
                method: 'POST',
                body: formData // FormData sets headers automatically
            });

            // Attempt to parse response as JSON regardless of status code for error messages
            const result = await response.json();

            if (!response.ok) {
                // If response status is not 2xx, throw an error using the message from the JSON body
                throw new Error(result.error || `Server error: ${response.status} ${response.statusText}`);
            }

            // --- Handle Successful Response ---
            if (result.svg) {
                currentSvgContent = result.svg; // Store the valid SVG content
                svgOutputDiv.innerHTML = currentSvgContent; // Display the SVG in the preview div
                svgCodeTextarea.value = currentSvgContent; // Update hidden textarea for copy functionality
                svgOutputDiv.classList.remove('placeholder-text'); // Ensure placeholder is not shown
                updateStatus('Conversion successful!', 'success', 3000); // Show success message, clear after 3 secs
                downloadBtn.disabled = false; // Enable download
                copyBtn.disabled = false; // Enable copy
            } else {
                 // Should not happen if response.ok is true, but handle just in case
                 throw new Error("Server response was successful but contained no SVG data.");
            }

        } catch (error) {
            // --- Handle Fetch Errors or Server Errors ---
            console.error('Conversion Request Failed:', error);
            updateStatus(`Error: ${error.message}`, 'error'); // Display the error message from backend or fetch
            resetResultArea(false); // Clear potentially broken SVG preview
             // Keep result buttons disabled on error
            downloadBtn.disabled = true;
            copyBtn.disabled = true;

        } finally {
            // --- UI Cleanup After Request ---
            // Re-enable convert button ONLY if a file is still selected
            convertBtn.disabled = !imageInput.files[0];
            convertBtn.textContent = 'Convert to SVG'; // Reset button text
        }
    });

    // --- Handle Download Button Click ---
    downloadBtn.addEventListener('click', () => {
        if (!currentSvgContent) {
            console.warn("Download skipped: No SVG content available.");
            return;
        }
        try {
             // Create a Blob from the SVG string
             const svgBlob = new Blob([currentSvgContent], { type: 'image/svg+xml;charset=utf-8' });
             // Create a temporary URL for the Blob
             const url = URL.createObjectURL(svgBlob);

             // Configure and trigger the hidden download link
             downloadLink.href = url;
             downloadLink.download = `${currentFilenameBase}_vectorised.svg`; // Suggest filename
             downloadLink.click(); // Simulate click to start download

             // Release the temporary URL
             URL.revokeObjectURL(url);
             console.log("SVG Download Triggered");
        } catch (error) {
              console.error("Download failed:", error);
              updateStatus('Error preparing download link.', 'error');
        }
    });

    // --- Handle Copy SVG Code Button Click ---
    copyBtn.addEventListener('click', () => {
         if (!svgCodeTextarea.value) {
              console.warn("Copy skipped: No SVG code available.");
             return;
         }

         navigator.clipboard.writeText(svgCodeTextarea.value).then(() => {
             // Success feedback on the button
             const originalText = copyBtn.textContent;
             const originalBg = copyBtn.style.backgroundColor;
             copyBtn.textContent = 'Copied!';
             copyBtn.style.backgroundColor = '#28a745'; // Green feedback
             copyBtn.style.color = 'white';

             // Reset button after a short delay
             setTimeout(() => {
                 copyBtn.textContent = originalText;
                 copyBtn.style.backgroundColor = originalBg;
                 copyBtn.style.color = ''; // Reset color if needed
             }, 1500);
         }).catch(err => {
             // Handle potential clipboard errors (e.g., browser permissions)
             console.error('Failed to copy SVG code to clipboard:', err);
             updateStatus('Failed to copy code. Check browser permissions or copy manually.', 'error');
         });
     });


    // --- Utility Functions ---

    let statusClearTimer; // Timer for clearing non-error status messages

    // Updates the status message area
    function updateStatus(message, type, clearDelay = 0) {
        clearTimeout(statusClearTimer); // Clear existing timeout if any
        statusArea.textContent = message;
        // Set class for styling (e.g., 'loading', 'success', 'error')
        statusArea.className = `status-area ${type}`;

        // Automatically clear non-error messages after a delay
        if (type !== 'error' && clearDelay > 0 && message !== '') {
            statusClearTimer = setTimeout(() => {
                // Check if the message is still the same before clearing
                if (statusArea.textContent === message) {
                    updateStatus('', ''); // Clear the status
                }
            }, clearDelay);
        }
        // Log errors for easier debugging
        if (type === 'error') {
           console.error("UI Status Update (Error):", message);
        }
    }

    // Resets the file input elements and associated state
    function resetFileSelection() {
        imageInput.value = ''; // Clears the selected file in the input element
        fileNameDisplay.textContent = 'No file chosen';
        imagePreviewArea.style.display = 'none'; // Hide preview area
        imagePreview.src = '#'; // Reset preview image source
        convertBtn.disabled = true; // Disable convert button
        resetResultArea(); // Also clear any previous conversion results
    }

    // Resets the SVG result/output area
    function resetResultArea(clearStatusToo = true) {
        // Restore placeholder text
        svgOutputDiv.innerHTML = '<p class="placeholder-text">SVG result will appear here</p>';
        svgOutputDiv.classList.add('placeholder-text'); // Ensure class is set for styling
        svgCodeTextarea.value = ''; // Clear hidden textarea
        currentSvgContent = ''; // Clear stored SVG
        downloadBtn.disabled = true; // Disable download button
        copyBtn.disabled = true; // Disable copy button

        // Optionally clear status messages as well
        if (clearStatusToo) {
            updateStatus('', '');
        }
    }

    // --- Initial State Setup ---
    // Ensure the app starts in a clean state when the page loads
    resetFileSelection();

}); // End DOMContentLoaded
