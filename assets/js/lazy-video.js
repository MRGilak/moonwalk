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
