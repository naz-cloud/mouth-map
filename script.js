// script.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("paintCanvas");
  const ctx = canvas.getContext("2d");
  const clearBtn = document.getElementById("clearCanvas");
  const printBtn = document.getElementById("printCanvas");

  // Set canvas size to match the background image
  const img = new Image();
  img.src = "mouth-diagram.png"; // Your mouth diagram
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  let painting = false;

  // Start drawing
  function startPosition(e) {
    painting = true;
    draw(e);
  }

  // Stop drawing
  function endPosition() {
    painting = false;
    ctx.beginPath(); // Reset the path
  }

  // Draw on the canvas
  function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 10; // Brush size
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)"; // Red semi-transparent

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  // Clear the canvas
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0); // Redraw the background image
  });

  // Print the canvas
  printBtn.addEventListener("click", () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<img src="${canvas.toDataURL()}" />`);
    printWindow.document.close();
    printWindow.print();
  });

  // Add event listeners for painting
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});

  printBtn.addEventListener("click", () => {
    window.print();
  });
});
