/* True parallax: background moves slower than the foreground */
(function () {
  const speed = 0.4; // 0 = fixed, 1 = same as scroll. Try 0.2–0.5.
  const bg = document.getElementById('parallax-bg');
  if (!bg) return;

  let latestY = 0, ticking = false;

  function onScroll() {
    latestY = window.scrollY || window.pageYOffset || 0;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    // Move the background up more slowly than the scroll
    const y = Math.round(latestY * speed);
    bg.style.backgroundPosition = `center ${-y}px`;
    ticking = false;
  }

  // Kick off
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
