// Client-side full-text search for the notes collection.
// Depends on notes-search.json (generated at build time).
// Any number of "scopes" — elements with [data-notes-search] — get wired:
//   <div data-notes-search data-index="/notes-search.json">
//     <input type="search">
//     <ul class="search-results"></ul>
//   </div>
// Scoring: title match weights highest, then tags, then body text.

(function () {
  var state = null; // { index, byId } shared across scopes

  function tokenize(text) {
    return (text.toLowerCase().match(/[a-z0-9]+/g) || []);
  }

  function buildIndex(docs) {
    var byId = {};
    var index = {};
    docs.forEach(function (doc, id) {
      doc._id = id;
      byId[id] = doc;
      var fields = {
        title: tokenize(doc.title).join(" "),
        tags: (doc.tags || []).join(" ").toLowerCase(),
        body: tokenize(doc.title + " " + doc.excerpt + " " + doc.content).join(" ")
      };
      doc._index = fields;
      Object.keys(fields).forEach(function (field) {
        var text = fields[field];
        var seen = {};
        (text.match(/[a-z0-9]+/g) || []).forEach(function (word) {
          if (seen[word]) return;
          seen[word] = true;
          index[word] = index[word] || [];
          index[word].push({ id: id, field: field });
        });
      });
    });
    return { index: index, byId: byId };
  }

  function scoreResults(query) {
    if (!state) return [];
    var terms = tokenize(query);
    if (!terms.length) return [];

    var weights = { title: 5, tags: 3, body: 1 };
    var scores = {};

    terms.forEach(function (term) {
      var hits = state.index[term] || [];
      hits.forEach(function (hit) {
        var id = hit.id;
        scores[id] = (scores[id] || 0) + weights[hit.field];
      });
    });

    var ranked = Object.keys(scores)
      .map(function (id) { return { id: Number(id), score: scores[id] }; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 25);

    var normalized = terms.length;
    ranked.forEach(function (r) { r.score = r.score / normalized; });
    return ranked;
  }

  function render(scope, query) {
    var resultsEl = scope.querySelector("[data-search-results]");
    if (!resultsEl) return;
    resultsEl.innerHTML = "";
    resultsEl.classList.remove("has-results", "no-results", "empty");

    var q = (query || "").trim();
    if (!q) {
      resultsEl.classList.add("empty");
      return;
    }

    var ranked = scoreResults(q);
    if (!ranked.length) {
      resultsEl.classList.add("no-results");
      var none = document.createElement("li");
      none.textContent = "No notes found for \u201C" + q + "\u201D.";
      resultsEl.appendChild(none);
      return;
    }

    resultsEl.classList.add("has-results");
    var count = document.createElement("li");
    count.className = "search-count";
    count.textContent = ranked.length + " result" + (ranked.length === 1 ? "" : "s");
    resultsEl.appendChild(count);

    ranked.forEach(function (r) {
      var doc = state.byId[r.id];
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = doc.url;
      a.textContent = doc.title;
      li.appendChild(a);

      var meta = document.createElement("span");
      meta.className = "search-meta";
      var bits = [];
      if (doc.date) bits.push(doc.date);
      if (doc.tags && doc.tags.length) bits.push(doc.tags.slice(0, 3).join(" \u00B7 "));
      meta.textContent = bits.join(" \u2014 ");
      li.appendChild(meta);

      if (doc.excerpt) {
        var ex = document.createElement("p");
        ex.className = "search-excerpt";
        ex.textContent = doc.excerpt;
        li.appendChild(ex);
      }

      resultsEl.appendChild(li);
    });
  }

  function wireScope(scope) {
    var input = scope.querySelector("input[type=search]");
    if (!input) return;
    var lastQ = "";
    input.addEventListener("input", function () {
      var q = input.value;
      if (q === lastQ) return;
      lastQ = q;
      clearTimeout(scope._timer);
      scope._timer = setTimeout(function () { render(scope, q); }, 120);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        input.value = "";
        lastQ = "";
        render(scope, "");
        input.blur();
      }
    });
  }

  function boot() {
    var scopes = Array.prototype.slice.call(document.querySelectorAll("[data-notes-search]"));
    if (!scopes.length) return;
    var indexUrl = scopes[0].getAttribute("data-index") || "/notes-search.json";

    fetch(indexUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("index fetch failed: " + res.status);
        return res.json();
      })
      .then(function (docs) {
        state = buildIndex(docs);
        scopes.forEach(wireScope);
      })
      .catch(function (err) {
        console.error("[notes-search]", err.message);
        scopes.forEach(function (scope) {
          scope.querySelector("[data-search-results]").classList.add("empty");
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();