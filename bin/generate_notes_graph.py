#!/usr/bin/env python3
import re
import json
from pathlib import Path

def parse_title(text):
    m = re.search(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    if m:
        fm = m.group(1)
        m2 = re.search(r'^title:\s*(?:"([^"]+)"|\'([^\']+)\'|(.+))', fm, re.M)
        if m2:
            return (m2.group(1) or m2.group(2) or m2.group(3)).strip()
    m3 = re.search(r'^#\s*(.+)', text, re.M)
    if m3:
        return m3.group(1).strip()
    return None

def main():
    root = Path(__file__).resolve().parents[1]
    notes_dir = root / '_notes'
    out = root / 'assets' / 'notes-graph.json'
    nodes = {}
    link_sources = []
    edges = set()
    link_pattern = re.compile(r'\[[^\]]+\]\((/notes/[^)]+)\)')

    def normalize_target(tgt):
        # strip fragment and query
        tgt = tgt.split('#', 1)[0].split('?', 1)[0]
        # collapse multiple slashes but keep leading slash
        if tgt.startswith('/'):
            tgt = '/' + re.sub(r'/+', '/', tgt.lstrip('/'))
        else:
            tgt = re.sub(r'/+', '/', tgt)
        if not tgt.endswith('/'):
            tgt = tgt + '/'
        return tgt

    for p in sorted(notes_dir.rglob('*.md')):
        text = p.read_text(encoding='utf-8')
        title = parse_title(text) or p.stem
        rel = p.relative_to(notes_dir).with_suffix('')
        url = '/notes/' + '/'.join(rel.parts) + '/'
        nodes[url] = {'id': url, 'title': title, 'path': str(p.relative_to(root))}
        link_sources.append((url, text))

    for source_url, text in link_sources:
        for m in link_pattern.finditer(text):
            raw_tgt = m.group(1)
            tgt = normalize_target(raw_tgt)
            if not tgt.startswith('/notes/'):
                continue
            # ignore anchors that collapse to the notes root and only keep real note targets
            if tgt in nodes:
                edges.add((source_url, tgt))

    nodes_list = list(nodes.values())
    edges_list = [{'source': s, 'target': t} for s, t in sorted(edges)]
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'nodes': nodes_list, 'edges': edges_list}, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f'Wrote {out} ({len(nodes_list)} nodes, {len(edges_list)} edges)')

if __name__ == '__main__':
    main()
