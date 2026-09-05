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
