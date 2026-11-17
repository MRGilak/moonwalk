/* ============================================================
 * bundle-core.js — site-wide behaviors, single request.
 *
 * Concatenated (in this order) from:
 *   fenced-code.js, card-tilt.js, reading-progress.js,
 *   back-to-top.js, copy-citation.js, lazy-images.js, lazy-video.js
 *
 * Edit the individual source files, then re-run:
 *   bin/bundle_js.py
 * (Do not hand-edit this file — it is generated.)
 * ============================================================ */

/* ---------- fenced-code.js ---------- */
// Fenced-code fallback renderer.
// Converts literal ``` fences that survived Markdown processing into real
// <pre><code> blocks. Two passes are needed because a broken fence can live
// either fully inside one paragraph (same-element) or span several sibling
// elements (multi-element). Both are handled here, once per page.
(function () {
  'use strict';

  if (document.documentElement.getAttribute('data-fences-script') === 'true') return;
  document.documentElement.setAttribute('data-fences-script', 'true');

  function normalize(s) { return (s || '').replace(/\u00A0/g, ' '); }

  function parseInfoLang(line) {
    line = normalize(line);
    var m = line.match(/^\s*```(.*)$/);
    if (!m) return '';
    var info = (m[1] || '').trim();
    return (info.split(/\s+/)[0] || '').toLowerCase();
  }

  // Pass 1: fences fully contained within a single element (p, li, blockquote)
  function renderSingleElement(container) {
    var blocks = Array.prototype.slice.call(container.querySelectorAll('p, li, blockquote'));
    blocks.forEach(function (p) {
      var text = p.textContent || '';
      if (text.indexOf('```') === -1) return;

      var lines = text.split(/\r?\n/);
      var frag = document.createDocumentFragment();
      var inCode = false;
      var codeLang = '';
      var codeLines = [];
      var transformed = false;

      lines.forEach(function (line) {
        var fence = line.match(/^```(.*)$/);
        if (fence) {
          if (!inCode) {
            inCode = true;
            transformed = true;
            var info = (fence[1] || '').trim();
            codeLang = (info.split(/\s+/)[0] || '').toLowerCase();
            codeLines = [];
          } else {
            inCode = false;
            var pre = document.createElement('pre');
            pre.className = 'highlight';
            var code = document.createElement('code');
            code.className = (codeLang ? 'language-' + codeLang + ' ' : '') + 'highlighter-rouge';
            code.textContent = codeLines.join('\n');
            pre.appendChild(code);
            frag.appendChild(pre);
            codeLang = '';
            codeLines = [];
          }
          return;
        }

        if (inCode) {
          codeLines.push(line);
        } else {
          frag.appendChild(document.createTextNode(line));
          frag.appendChild(document.createElement('br'));
        }
      });

      if (transformed) {
        var wrapper = document.createElement('div');
        wrapper.appendChild(frag);
        p.parentNode.replaceChild(wrapper, p);
      }
    });
  }

  // Pass 2: fences whose opening and closing lines span multiple sibling elements
  function renderMultiElement(container) {
    var children = Array.prototype.slice.call(container.children);

    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (!(el instanceof HTMLElement)) continue;
      var text = el.textContent || '';
      if (text.indexOf('```') === -1) continue;

      var lines = text.split(/\r?\n/);
      var openLineIdx = -1;
      for (var li = 0; li < lines.length; li++) {
        if (/^\s*```/.test(normalize(lines[li]))) { openLineIdx = li; break; }
      }
      if (openLineIdx === -1) continue;

      var lang = parseInfoLang(lines[openLineIdx]);

      // Closing fence in the same element? handled by pass 1; skip here.
      var closeInSame = -1;
      for (li = openLineIdx + 1; li < lines.length; li++) {
        if (/^\s*```\s*$/.test(normalize(lines[li]))) { closeInSame = li; break; }
      }
      if (closeInSame !== -1) continue;

      // Find closing fence in subsequent siblings
      var endIdx = -1;
      var closeLineIdx = -1;
      var MAX_SIBLINGS = 12;
      for (var k = i + 1; k < children.length && k - i <= MAX_SIBLINGS; k++) {
        var elt = children[k];
        if (!(elt instanceof HTMLElement)) continue;
        var tn = (elt.tagName || '').toUpperCase();
        if (tn === 'H1' || tn === 'H2' || tn === 'H3' || tn === 'H4' || tn === 'H5' || tn === 'H6' || tn === 'HR' ||
            tn === 'BLOCKQUOTE' || tn === 'UL' || tn === 'OL' || tn === 'TABLE' || tn === 'FIGURE') {
          endIdx = -1; break;
        }
        if (tn === 'PRE' || elt.classList.contains('highlighter-rouge') || elt.classList.contains('highlight')) {
          endIdx = -1; break;
        }
        var t = elt.textContent || '';
        if (t.indexOf('```') === -1) continue;
        var ls = t.split(/\r?\n/);
        for (var cj = 0; cj < ls.length; cj++) {
          if (/^\s*```\s*$/.test(normalize(ls[cj]))) { endIdx = k; closeLineIdx = cj; break; }
        }
        if (endIdx !== -1) break;
      }

      if (endIdx === -1) continue;

      var codeParts = [];
      codeParts.push(lines.slice(openLineIdx + 1).map(normalize).join('\n'));
      for (var m = i + 1; m < endIdx; m++) {
        codeParts.push(normalize(children[m].textContent || ''));
      }
      var endLines = (children[endIdx].textContent || '').split(/\r?\n/).map(normalize);
      codeParts.push(endLines.slice(0, Math.max(0, closeLineIdx)).join('\n'));

      var pre = document.createElement('pre');
      pre.className = 'highlight';
      var code = document.createElement('code');
      code.className = (lang ? 'language-' + lang + ' ' : '') + 'highlighter-rouge';
      code.textContent = codeParts.join('\n');
      pre.appendChild(code);

      el.parentNode.insertBefore(pre, el);
      for (var r = i; r <= endIdx; r++) {
        if (children[r] && children[r].parentNode) children[r].parentNode.removeChild(children[r]);
      }

      var newChildren = Array.prototype.slice.call(container.children);
      i = newChildren.indexOf(pre);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.content');
    if (!content) return;
    if (content.getAttribute('data-fences-processed') === 'true') return;

    renderSingleElement(content);
    renderMultiElement(content);
    content.setAttribute('data-fences-processed', 'true');
  });
})();

/* ---------- card-tilt.js ---------- */
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

/* ---------- reading-progress.js ---------- */
// Reading Progress Bar
// Shows a progress indicator at the top of the page as you scroll

document.addEventListener('DOMContentLoaded', function() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.appendChild(progressBar);

  // Create progress fill element
  const progressFill = document.createElement('div');
  progressFill.className = 'reading-progress-fill';
  progressBar.appendChild(progressFill);

  // Update progress on scroll
  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate percentage scrolled
    const progress = (scrollTop / documentHeight) * 100;

    // Update progress bar width
    progressFill.style.width = Math.min(progress, 100) + '%';

    // Add 'started' class when user has scrolled a bit
    if (scrollTop > 50) {
      progressBar.classList.add('started');
    } else {
      progressBar.classList.remove('started');
    }

    // Add 'completed' class when reaching bottom
    if (progress >= 99) {
      progressBar.classList.add('completed');
    } else {
      progressBar.classList.remove('completed');
    }
  }

  // Listen to scroll events with throttling for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateProgress();

  // Update on resize
  window.addEventListener('resize', updateProgress);
});

/* ---------- back-to-top.js ---------- */
// Back to Top Button
(function() {
  'use strict';

  // Create button
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  backToTopButton.setAttribute('title', 'Back to top');
  document.body.appendChild(backToTopButton);

  // Show/hide button based on scroll position
  function toggleButtonVisibility() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  // Scroll to top smoothly
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', toggleButtonVisibility);
  backToTopButton.addEventListener('click', scrollToTop);

  // Initial check
  toggleButtonVisibility();
})();

/* ---------- copy-citation.js ---------- */
// Copy BibTeX button behavior for the Publications page.
// Local, dependency-free. Uses the modern clipboard API when available
// (secure contexts), otherwise falls back to a hidden textarea + execCommand.

(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand("copy")) {
          resolve();
        } else {
          reject(new Error("execCommand copy failed"));
        }
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".bibtex-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var entry = btn.closest(".publication");
        var pre = entry ? entry.querySelector(".bibtex-entry") : null;
        var text = (pre ? pre.textContent : btn.getAttribute("data-bib") || "").trim();
        if (!text) {
          return;
        }
        var label = btn.textContent;
        copyText(text)
          .then(function () {
            btn.textContent = "Copied!";
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.textContent = label;
              btn.classList.remove("is-copied");
            }, 1600);
          })
          .catch(function () {
            btn.textContent = "Copy failed";
            setTimeout(function () {
              btn.textContent = label;
            }, 1600);
          });
      });
    });
  });
})();

/* ---------- lazy-images.js ---------- */
// Defer offscreen images (markdown/HTML `<img>` without a loading attribute).
// Cards already carry explicit loading="lazy"; this covers content images.
// Kept deliberately minimal: native lazy-loading, no IntersectionObserver needed.

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("main img:not([loading])").forEach(function (img) {
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    });
  });
})();

/* ---------- lazy-video.js ---------- */
// Load + play silent looping videos only when they scroll into view.
//
// Cards and inline figures ship as <video class="lazy-video" data-src="...">
// with preload="none", so a page visit downloads only the poster JPEG. The
// real MP4 is attached when the element approaches the viewport, and paused
// again when it leaves, which keeps long pages from decoding offscreen video.

(function () {
  var videos = document.querySelectorAll("video.lazy-video");
  if (!videos.length) return;

  function load(video) {
    if (video.dataset.loaded === "true") return;
    video.dataset.loaded = "true";
    video.src = video.dataset.src;
    video.removeAttribute("data-src");
  }

  function play(video) {
    load(video);
    var p = video.play();
    // Autoplay can still be refused (battery saver, reduced data); the poster
    // stays visible in that case, so swallow the rejection quietly.
    if (p && typeof p.catch === "function") p.catch(function () {});
  }

  if (!("IntersectionObserver" in window)) {
    // No observer support: fall back to loading everything, still without
    // autoplaying offscreen elements.
    videos.forEach(function (v) {
      load(v);
      v.autoplay = true;
      play(v);
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          play(video);
        } else if (video.dataset.loaded === "true") {
          video.pause();
        }
      });
    },
    // Start fetching slightly before the element is visible so playback
    // begins as it scrolls in, rather than a beat later.
    { rootMargin: "200px 0px", threshold: 0.01 }
  );

  videos.forEach(function (video) {
    observer.observe(video);
  });
})();
