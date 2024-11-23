// script.js
document.addEventListener("DOMContentLoaded", () => {
  const areas = document.querySelectorAll("area");
  const image = document.getElementById("mouth-image");
  const printBtn = document.getElementById("print-btn");

  areas.forEach(area => {
    area.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default action
      const region = area.getAttribute("data-region");
      
      // Check if there's already a highlight for this region
      const existingHighlight = document.querySelector(`.highlight[data-region="${region}"]`);
      if (existingHighlight) {
        existingHighlight.remove(); // Remove highlight if it exists
      } else {
        // Create a new highlight
        const coords = area.getAttribute("coords").split(",");
        const highlight = document.createElement("div");

        highlight.classList.add("highlight");
        highlight.dataset.region = region;
        highlight.style.left = `${coords[0]}px`;
        highlight.style.top = `${coords[1]}px`;
        highlight.style.width = `${coords[2] - coords[0]}px`;
        highlight.style.height = `${coords[3] - coords[1]}px`;

        image.parentElement.appendChild(highlight); // Add highlight to the map container
      }
    });
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });
});
