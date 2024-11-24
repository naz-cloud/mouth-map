window.onload = function () {
    const canvas = document.getElementById("highlightCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Load the image
    img.src = "mouth-diagram.png"; // Ensure the image path is correct
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0); // Draw the image onto the canvas
    };

    let isDrawing = false;

    // Start drawing
    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    // Draw on mouse move
    canvas.addEventListener("mousemove", (e) => {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    });

    // Stop drawing
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    // Reset button
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
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Canvas</title>
            </head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
                <img src="${dataUrl}" style="max-width:100%; height:auto;" onload="window.print(); window.close();">
            </body>
            </html>
        `);

        printWindow.document.close();
    });
}; // This closes the window.onload function
