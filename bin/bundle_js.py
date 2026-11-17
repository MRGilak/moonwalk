#!/usr/bin/env python3
"""Rebuild the concatenated JS bundles from their source files.

Usage:  python bin/bundle_js.py

Bundles:
  assets/js/bundle-core.js  <- fenced-code, card-tilt, reading-progress,
                               back-to-top, copy-citation, lazy-images, lazy-video
  assets/js/bundle-home.js  <- parallax, typing-animation

Each bundle keeps a header comment mapping sections to sources, so the
generated files stay readable in devtools.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JS = ROOT / "assets" / "js"

BUNDLES = {
    "bundle-core.js": [
        "fenced-code.js",
        "card-tilt.js",
        "reading-progress.js",
        "back-to-top.js",
        "copy-citation.js",
        "lazy-images.js",
        "lazy-video.js",
    ],
    "bundle-home.js": [
        "parallax.js",
        "typing-animation.js",
    ],
}


def build(name: str, sources: list[str]) -> None:
    title = "site-wide behaviors, single request." if "core" in name else "homepage-only behaviors, single request."
    parts = [
        "/* ============================================================",
        f" * {name} — {title}",
        " *",
        " * Concatenated (in this order) from:",
        *[f" *   {s}," if s != sources[-1] else f" *   {s}" for s in sources],
        " *",
        " * Edit the individual source files, then re-run:",
        " *   bin/bundle_js.py",
        " * (Do not hand-edit this file — it is generated.)",
        " * ============================================================ */",
        "",
    ]
    for src in sources:
        text = (JS / src).read_text(encoding="utf-8").rstrip() + "\n"
        parts.append(f"/* ---------- {src} ---------- */")
        parts.append(text)
    (JS / name).write_text("\n".join(parts), encoding="utf-8")
    print(f"wrote {name} ({(JS / name).stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    for bundle_name, srcs in BUNDLES.items():
        missing = [s for s in srcs if not (JS / s).exists()]
        if missing:
            raise SystemExit(f"missing sources for {bundle_name}: {missing}")
        build(bundle_name, srcs)
