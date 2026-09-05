// AI Summary button + header smooth-scroll for note pages.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Smooth-scroll from header note to AI summary section
    var jumpLink = document.querySelector('.ai-summary-note a');
    if (jumpLink) {
      jumpLink.addEventListener('click', function (e) {
        var target = document.getElementById('ai-summary-section');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    var btn = document.getElementById('ai-summary-btn');
    var resultDiv = document.getElementById('ai-summary-result');
    if (!btn || !resultDiv) return;

    btn.addEventListener('click', async function () {
      btn.disabled = true;
      var originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Generating...</span>';
      resultDiv.textContent = '';
      resultDiv.classList.remove('loaded');

      try {
        var base = window.NETLIFY_FUNCTIONS_BASE || '';
        var fnUrl = (base ? base.replace(/\/$/, '') : '') + '/.netlify/functions/summarize';

        var response = await fetch(fnUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: document.querySelector('.content').innerText
          })
        });

        var data = await response.json();

        if (response.ok && data.summary) {
          resultDiv.innerHTML = '';
          var firstImg = document.querySelector('.content img');
          if (firstImg) {
            try {
              var clone = firstImg.cloneNode(true);
              clone.loading = 'lazy';
              clone.decoding = 'async';
              clone.style.marginBottom = '0.5rem';
              resultDiv.appendChild(clone);
            } catch (e) { /* ignore */ }
          }
          var textEl = document.createElement('div');
          textEl.textContent = data.summary;
          resultDiv.appendChild(textEl);
          setTimeout(function () { resultDiv.classList.add('loaded'); }, 10);
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([resultDiv]).catch(function (e) { console.error('MathJax typeset error', e); });
          }
        } else {
          resultDiv.textContent = 'Error generating summary: ' + (data.error || 'Unknown');
          console.error('AI summary error', { status: response.status, data: data });
        }
      } catch (err) {
        console.error(err);
        resultDiv.textContent = 'Error generating summary.';
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
      }
    });
  });
})();
