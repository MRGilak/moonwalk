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