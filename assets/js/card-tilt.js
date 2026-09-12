// 3D Card Tilt Effect (subtle)
// Tunables: MAX_TILT (deg), LIFT (px), SCALE, SMOOTH (lerp 0-1)

document.addEventListener('DOMContentLoaded', function() {
  // Respect users who prefer no motion, and touch devices (no hover tilt)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const MAX_TILT = 5; // max ± degrees (was 10 — too twitchy)
  const LIFT = '-9px'; // was -12px
  const SCALE = 1.02; // was 1.02
  const SMOOTH = 0.15; // lower = smoother/slower, higher = snappier
  const EDGE_CLAMP = 1; // clamp normalized -1..1 so edges can't overshoot

  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let raf = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rect = null;

    const clamp01 = (v) => Math.max(-EDGE_CLAMP, Math.min(EDGE_CLAMP, v));

    function render() {
      // Lerp toward target — smooths mousemove jitter, kills edge vibration
      currentX += (targetX - currentX) * SMOOTH;
      currentY += (targetY - currentY) * SMOOTH;

      // Snap when close enough so rAF stops instead of micro-oscillating
      if (Math.abs(targetX - currentX) < 0.01) currentX = targetX;
      if (Math.abs(targetY - currentY) < 0.01) currentY = targetY;

      card.style.transform =
        `translateY(${LIFT}) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${SCALE})`;

      if (currentX !== targetX || currentY !== targetY) {
        raf = requestAnimationFrame(render);
      } else {
        raf = null;
      }
    }

    function requestRender() {
      if (raf === null) raf = requestAnimationFrame(render);
    }

    card.addEventListener('mouseenter', function(e) {
      // Cache rect ONCE on enter: getBoundingClientRect() shifts after we
      // apply translateY, so re-reading it every mousemove creates a
      // feedback loop (card moves -> rect moves -> rotation changes -> ...).
      // Caching breaks that loop and fixes the edge "vibration".
      rect = card.getBoundingClientRect();
      // No transform transition during tilt — rAF lerp already smooths.
      // Keeping a transform transition here fights mousemove and oscillates.
      card.style.transition = 'box-shadow 0.4s ease';
    });

    card.addEventListener('mousemove', function(e) {
      if (!rect) rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized -1..1, clamped so edges can't spike past MAX_TILT
      const normX = clamp01((x - centerX) / centerX);
      const normY = clamp01((y - centerY) / centerY);

      targetX = normY * -MAX_TILT;
      targetY = normX * MAX_TILT;

      requestRender();
    });

    card.addEventListener('mouseleave', function() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      rect = null;
      targetX = 0; targetY = 0; currentX = 0; currentY = 0;
      // Gentle ease-back (no bouncy overshoot — the old
      // cubic-bezier(...,1.275) overshoot could re-trigger hover wobble)
      card.style.transition = 'transform 0.5s ease, box-shadow 0.4s ease';
      card.style.transform = '';
    });
  });
  
  // Add perspective to container
  const cardLists = document.querySelectorAll('.horizontal-list');
  cardLists.forEach(list => {
    list.style.perspective = '1000px';
  });
});
