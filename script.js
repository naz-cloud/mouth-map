window.onload = function () {
    const canvas = document.getElementById("highlightCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Load the image
    img.src = "Mouth-diagram .png"; // Image is in the main directory
    img.onload = function () {
        // Set canvas size to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);
    };

    let isDrawing = false;

    // Start drawing when the user clicks down
    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    // Draw as the user drags the mouse
    canvas.addEventListener("mousemove", (e) => {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"; // Red highlight
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    });

    // Stop drawing when the user releases the mouse
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    // Reset button to clear the canvas
    document.getElementById("resetButton").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0); // Redraw the image
    });

    // Print button
    document.getElementById("printButton").addEventListener("click", () => {
    const dataUrl = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");

    // Ensure the image is fully loaded before printing
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Canvas</title>
        </head>
        <body>
            <img src="${dataUrl}" style="max-width: 100%; height: auto;" onload="window.print(); window.close();">
        </body>
        </html>
    `);
    printWindow.document.close();
});
