document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const imagePreviewArea = document.getElementById('imagePreviewArea');
    const imagePreview = document.getElementById('imagePreview');
    const convertBtn = document.getElementById('convertBtn');
    const resultContainer = document.getElementById('resultContainer');
    const controlsArea = document.getElementById('controlsArea');
    const svgColorInput = document.getElementById('svgColor');
    const resultArea = document.getElementById('resultArea');
    const svgOutputDiv = document.getElementById('svgOutput');
    const actionsArea = document.querySelector('.actions-area');
    const svgCodeTextarea = document.getElementById('svgCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadLink = document.getElementById('downloadLink');
    const statusArea = document.getElementById('statusArea');

    let originalSvgContent = ''; // Store the raw SVG from backend
    let currentFilenameBase = 'vectorise-me_output'; // Default filename base

    // --- Event Listeners ---

    // Handle file selection
    imageInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            resetResultAndStatus(); // Clear previous results

            // Basic File Validation (Client-Side) - enhance if needed
             if (selectedFile.size > 10 * 1024 * 1024) { // Check size (matches backend limit)
                 updateStatus('Error: File is too large (Max 10MB). Please choose a smaller image.', 'error');
                 imageInput.value = ''; // Clear the invalid file selection
                 fileNameDisplay.textContent = 'No file chosen';
                 convertBtn.disabled = true;
                 imagePreviewArea.style.display = 'none';
                 return; // Stop processing
             }

            if (!selectedFile.type.startsWith('image/')) {
                 updateStatus('Error: Invalid file type. Please select a JPG, PNG, or WEBP image.', 'error');
                  imageInput.value = '';
                  fileNameDisplay.textContent = 'No file chosen';
                 convertBtn.disabled = true;
                 imagePreviewArea.style.display = 'none';
                 return;
             }


            fileNameDisplay.textContent = selectedFile.name;
             // Set base for download filename, removing extension
            currentFilenameBase = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')) || selectedFile.name;

            convertBtn.disabled = false;

            // Show image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreviewArea.style.display = 'block';
            }
            reader.readAsDataURL(selectedFile);

        } else {
             resetResultAndStatus();
            fileNameDisplay.textContent = 'No file chosen';
             currentFilenameBase = 'vectorise-me_output';
            convertBtn.disabled = true;
            imagePreviewArea.style.display = 'none';
            imagePreview.src = '#';
        }
    });

    // Handle Convert button click
    convertBtn.addEventListener('click', async () => {
        const selectedFile = imageInput.files[0];
        if (!selectedFile) {
            updateStatus('Please choose an image file first.', 'error');
            return;
        }

        convertBtn.disabled = true;
        convertBtn.textContent = 'Vectorising...'; // Updated text
        updateStatus('Uploading and vectorising image...', 'loading'); // Updated text
        resetResultAndStatus();

        const formData = new FormData();
        formData.append('imageFile', selectedFile);

        try {
            const response = await fetch('/convert', { // Backend endpoint
                method: 'POST',
                body: formData
            });

            const result = await response.json(); // Expect {svg: '...'} or {error: '...'}

            if (!response.ok) {
                 // Use error from JSON body if available, otherwise use status text
                throw new Error(result.error || `Server error: ${response.status} - ${response.statusText}`);
            }
            if (result.error) { // Handle application errors sent in JSON body
                 throw new Error(result.error);
            }

            // --- Success ---
            originalSvgContent = result.svg;
            displaySvg(originalSvgContent);
            updateStatus('Vectorisation successful! Preview & customize below.', 'success'); // Updated text
            resultContainer.style.display = 'block'; // Show results section

        } catch (error) {
            console.error('Vectorisation Error:', error);
             // Display more specific error message from backend if available
            updateStatus(`Vectorisation failed: ${error.message}`, 'error');
             resetResultAndStatus();

        } finally {
            // Re-enable button (only if a file is still selected)
            convertBtn.disabled = !imageInput.files[0];
            convertBtn.textContent = 'Vectorise It!';
        }
    });

     // Handle SVG color change
     svgColorInput.addEventListener('input', () => {
        if (originalSvgContent) {
            applySvgCustomizations();
        }
     });


     // Handle Download button click
    downloadBtn.addEventListener('click', () => {
        const currentSvgPreviewHtml = svgOutputDiv.innerHTML;
        if (!currentSvgPreviewHtml || !currentSvgPreviewHtml.includes('<svg')) return;

        const svgBlob = new Blob([currentSvgPreviewHtml], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);

        downloadLink.href = url;
        // Use the stored base filename + suffix
        downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
        downloadLink.click();

        URL.revokeObjectURL(url);
    });

     // Handle Copy button click
    copyBtn.addEventListener('click', () => {
        if (!svgCodeTextarea.value) return;
        navigator.clipboard.writeText(svgCodeTextarea.value).then(() => {
             copyBtn.textContent = 'Copied!';
             copyBtn.style.backgroundColor = '#28a745'; // Success green feedback
             setTimeout(() => {
                 copyBtn.textContent = 'Copy SVG Code';
                 copyBtn.style.backgroundColor = ''; // Reset color
             }, 1500);
        }).catch(err => {
            console.error('Failed to copy:', err);
            updateStatus('Failed to copy code. Check browser permissions or copy manually.', 'error');
             setTimeout(() => clearStatus(), 3000);
        });
    });


    // --- Helper Functions ---

    function updateStatus(message, type) {
        statusArea.textContent = message;
        statusArea.className = `status-area ${type}`; // CSS class controls style
        statusArea.style.display = 'block'; // Make it visible
        // Scroll to status message if it's an error for visibility
         if(type === 'error' || type === 'success') {
             statusArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
         }
    }

    function clearStatus() {
         statusArea.textContent = '';
         statusArea.style.display = 'none'; // Hide it
    }

    function resetResultAndStatus() {
         svgOutputDiv.innerHTML = '';
         svgCodeTextarea.value = '';
         resultContainer.style.display = 'none'; // Hide results block
         originalSvgContent = '';
         svgColorInput.value = '#000000'; // Reset color picker
         clearStatus();
    }

    // Display Initial SVG content and apply default customizations
    function displaySvg(svgString) {
        svgOutputDiv.innerHTML = svgString; // Render in preview div
        applySvgCustomizations(); // Apply default/current color and update textarea
         // Optional: scroll to preview
         // resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Apply customizations (color) AND update the textarea
    function applySvgCustomizations() {
         const svgElement = svgOutputDiv.querySelector('svg');
         if (!svgElement) return;

         const color = svgColorInput.value;

         const paths = svgElement.querySelectorAll('path');
         paths.forEach(path => {
             path.setAttribute('fill', color);
             path.setAttribute('stroke', 'none'); // Ensure fill is visible
         });

         // Update the code textarea with the modified SVG code
         // Prettify slightly? Basic indentation for readability.
         const formattedSvg = svgElement.outerHTML.replace(/></g, '>\n  <');
         svgCodeTextarea.value = formattedSvg;
    }

}); // End DOMContentLoaded
