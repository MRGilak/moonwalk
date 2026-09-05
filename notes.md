---
layout: default
title: My Notes
permalink: /notes/
---

<a href="{{ "/" | relative_url }}">{{ site.theme_config.back_home_text }}</a>

<h2>All Notes</h2>

<div class="notes-search-box" data-notes-search data-index="{{ '/notes-search.json' | relative_url }}">
  <input
    type="search"
    placeholder="Search {{ site.notes | size }} notes…"
    aria-label="Search notes"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false" />
  <ul class="search-results" data-search-results aria-live="polite"></ul>
</div>

<p class="search-note-tip">Search across all notes — or use the <a href="{{ '/notes/search/' | relative_url }}">dedicated search page</a>.</p>

> **Note:** The excerpts displayed in this page are generated using AI and may contain inaccuracies or errors. Please refer to the full notes for more accurate information.

> Click [here]({{ '/notes/graph.html' | relative_url }}) to see a graph view of the notes (experimental).

{% include structured_notes_list.html %}

<script src="{{ '/assets/js/notes-search.js' | relative_url }}"></script>
