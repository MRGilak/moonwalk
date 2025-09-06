/* True proportional parallax: background aligns with full page height */
(function () {
  const bg = document.getElementById("parallax-bg");
  if (!bg) return;

  function updateBackground() {
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // progress = 0 at top, 1 at bottom
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Map progress to background position
    // "progress * 100%" means the background scrolls fully from top to bottom
    bg.style.backgroundPosition = `center ${progress * 100}%`;
  }

  // Initial call
  updateBackground();

  // Update on scroll + resize
  window.addEventListener("scroll", updateBackground, { passive: true });
  window.addEventListener("resize", updateBackground);
})();
