#!/usr/bin/env python3
"""Auto-tag the notes collection.

First-pass tagging from structure:
  * top-level discipline folder (e.g. Control, Robotics)
  * every intermediate folder on the path (e.g. Adaptive Control, MFAC)
  * leading hashtag lines already in the content (#Control #SignalControlSystems)

Writes a `tags:` list into each note's front matter (idempotent: existing
`tags:` blocks are replaced) and regenerates notes/tag/<slug>.md — a page per
tag — so Jekyll publishes /notes/tag/<slug>/.

NOTE: pages are used (not a `tags` collection) because Jekyll 4.2.2 overflows
the stack when a collection-doc page iterates the `site.notes` collection.

Usage: python3 bin/autotag_notes.py [--dry-run]
"""

import argparse
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTES_DIR = ROOT / "_notes"
TAG_PAGES_DIR = ROOT / "notes" / "tag"
SKIP = {"Home.md"}

HASHTAG_RE = re.compile(r"#([A-Za-z0-9][A-Za-z0-9_]*)")
CAMEL_RE = re.compile(r"(?<=[a-z0-9])(?=[A-Z])")

LAYOUT = """---
layout: notetag
tag: "{tag}"
title: "{tag}"
count: {count}
---
"""


def slugify(name):
    normalized = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^A-Za-z0-9]+", "-", normalized).strip("-").lower()
    return slug or "misc"


def tidy(name):
    spaced = CAMEL_RE.sub(" ", name)
    return " ".join(part for part in spaced.split())


def lead_hashtags(text):
    tags = []
    for line in text.splitlines()[:6]:
        if not line.startswith("#"):
            if not line.strip():
                continue
            break
        for token in HASHTAG_RE.findall(line):
            tags.append(tidy(token))
    return tags


def collect_tags(rel_path, text):
    parts = rel_path.with_suffix("").parts
    tags = [parts[0]]  # discipline folder
    tags.extend(parts[1:-1])  # intermediate folders
    tags.extend(lead_hashtags(text))
    seen = set()
    out = []
    for tag in tags:
        key = tag.lower()
        if key not in seen and tag.strip():
            seen.add(key)
            out.append(tag)
    return out


def inject_front_matter(raw, tags):
    lines = raw.split("\n")
    start = None
    for i, line in enumerate(lines[:15]):
        if line.rstrip() == "layout: note":
            start = i + 1
            break
    if start is None:
        return raw
    body = "\n".join(f'  - "{t}"' for t in tags)
    block = "tags:\n" + body
    out = lines[:start]
    j = start
    if j < len(lines) and lines[j].startswith("tags:"):
        j += 1
        while j < len(lines) and lines[j].startswith("  - "):
            j += 1
    out.append(block)
    return "\n".join(out) + "\n" + "\n".join(lines[j:])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    tag_counts = {}
    changed = 0
    skipped = 0
    for path in sorted(NOTES_DIR.rglob("*.md")):
        if path.name in SKIP:
            skipped += 1
            continue
        rel = path.relative_to(NOTES_DIR)
        text = path.read_text(encoding="utf-8")
        tags = collect_tags(rel, text)
        for tag in tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
        if not args.dry_run:
            path.write_text(inject_front_matter(text, tags), encoding="utf-8")
        changed += 1

    if not args.dry_run:
        TAG_PAGES_DIR.mkdir(parents=True, exist_ok=True)
        for stale in TAG_PAGES_DIR.glob("*.md"):
            stale.unlink()
        for tag, count in sorted(tag_counts.items()):
            slug = slugify(tag)
            (TAG_PAGES_DIR / f"{slug}.md").write_text(
                LAYOUT.format(tag=tag, count=count), encoding="utf-8"
            )

    print(f"Processed {changed} notes ({skipped} skipped), {len(tag_counts)} tags.")
    print("Tags:", ", ".join(f"{k} ({v})" for k, v in sorted(tag_counts.items())))
    return 0


if __name__ == "__main__":
    sys.exit(main())