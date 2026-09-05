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