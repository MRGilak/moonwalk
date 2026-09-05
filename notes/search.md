---
layout: page
title: Search Notes
permalink: /notes/search/
---

<p>Search across all {{ site.notes | size }} notes — titles, tags, and body text.</p>

<div class="notes-search-box" data-notes-search data-index="{{ '/notes-search.json' | relative_url }}">
  <input
    type="search"
    placeholder="Search notes…"
    aria-label="Search notes"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false" />
  <ul class="search-results" data-search-results aria-live="polite"></ul>
</div>

<script src="{{ '/assets/js/notes-search.js' | relative_url }}"></script>