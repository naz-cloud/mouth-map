// script.js
document.addEventListener("DOMContentLoaded", () => {
  const areas = document.querySelectorAll("area");
  const printBtn = document.getElementById("print-btn");

  areas.forEach(area => {
    area.addEventListener("click", () => {
      const region = area.getAttribute("data-region");
      if (area.classList.contains("highlight")) {
        area.classList.remove("highlight");
        alert(`Deselected: ${region}`);
      } else {
        area.classList.add("highlight");
        alert(`Selected: ${region}`);
      }
    });
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });
});
