document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("paintCanvas");
  const ctx = canvas.getContext("2d");
  const clearBtn = document.getElementById("clearCanvas");
  const printBtn = document.getElementById("printCanvas");

  const img = new Image();
  img.src = "Mouth-diagram .png"; // Correct path for your image
  img.onload = () => {
    // Set canvas size to match the image
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  let painting = false;

  // Helper function to get mouse position on the canvas
  function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Start drawing
  canvas.addEventListener("mousedown", (e) => {
    painting = true;
    const { x, y } = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y); // Start the path at the mouse position
  });

  // Stop drawing
  canvas.addEventListener("mouseup", () => {
    painting = false;
    ctx.beginPath(); // Reset the path for the next stroke
  });

  // Draw on the canvas
  canvas.addEventListener("mousemove", (e) => {
    if (!painting) return; // If not holding the mouse button, don’t draw

    const { x, y } = getMousePos(e);
    ctx.lineWidth = 10; // Brush size
    ctx.lineCap = "round"; // Smooth edges
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)"; // Red semi-transparent color

    ctx.lineTo(x, y); // Draw a line to the current mouse position
    ctx.stroke(); // Render the stroke
    ctx.beginPath(); // Reset the path
    ctx.moveTo(x, y); // Start a new path from the current position
  });

  // Clear the canvas and redraw the image
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear everything
    ctx.drawImage(img, 0, 0); // Redraw the image
  });

  // Print the canvas content
  printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<img src="${canvas.toDataURL()}" />`);
    printWindow.document.close();
    printWindow.print();
  });
});

  printBtn.addEventListener("click", () => {
    window.print();
  });
});
