"""Cleans generated frames: removes blood (red pixels not in the character's palette) and stray specks
(keeps only the biggest connected silhouette). Writes the cleaned frames to out_dir.

usage: python3 clean_frames.py <frames_dir> <rotation.png (palette reference)> <out_dir>
"""
import glob
import os
import sys
from collections import Counter

from PIL import Image

frames_dir, rotation, out_dir = sys.argv[1:4]
os.makedirs(out_dir, exist_ok=True)
pal = {c for c in Image.open(rotation).convert("RGBA").getdata() if c[3]}
N8 = [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]


def bloody(c):
    r, g, b, a = c
    return a and r > 80 and r > 2 * g and r > 2 * b and c not in pal


for path in sorted(glob.glob(os.path.join(frames_dir, "*.png"))):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    bad = {(x, y) for y in range(h) for x in range(w) if bloody(px[x, y])}
    for _ in range(4):  # fill blood from its neighbours, or clear it outside the body
        left = set()
        for x, y in bad:
            nb = [px[x + dx, y + dy] for dx, dy in N8
                  if 0 <= x + dx < w and 0 <= y + dy < h and (x + dx, y + dy) not in bad]
            if not nb:
                left.add((x, y))
                continue
            opaque = [c for c in nb if c[3]]
            px[x, y] = Counter(opaque).most_common(1)[0][0] if len(opaque) > len(nb) / 2 else (0, 0, 0, 0)
        bad = left
    for x, y in bad:
        px[x, y] = (0, 0, 0, 0)
    # keep the biggest silhouette only
    seen, comps = set(), []
    for y in range(h):
        for x in range(w):
            if px[x, y][3] and (x, y) not in seen:
                stack, comp = [(x, y)], []
                seen.add((x, y))
                while stack:
                    a, b = stack.pop()
                    comp.append((a, b))
                    for dx, dy in N8:
                        q = (a + dx, b + dy)
                        if 0 <= q[0] < w and 0 <= q[1] < h and q not in seen and px[q][3]:
                            seen.add(q)
                            stack.append(q)
                comps.append(comp)
    comps.sort(key=len, reverse=True)
    for comp in comps[1:]:
        for q in comp:
            px[q] = (0, 0, 0, 0)
    im.save(os.path.join(out_dir, os.path.basename(path)))
    print(os.path.basename(path), "parts removed:", len(comps) - 1)
