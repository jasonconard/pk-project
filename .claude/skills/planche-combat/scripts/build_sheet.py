import sys, os, json
from PIL import Image, ImageChops
sys.path.insert(0, os.path.dirname(__file__))
from magic_circle import circle_frame
# plan: [[anim, [dir_entry_se, dir_entry_ne], frames]]
# dir_entry: folder | {"dir": folder, "pick": [...], "offset": [x, y] | "align": [ref_png_64cell, frame_idx], "circle": true, "dy": [px per frame]}
plan, out = json.load(open(sys.argv[1])), sys.argv[2]
C = 64
def default_offset(im):
    if im.width == 68: return (-2, -4)
    if im.width == 48: return (8, 6)
    return None
def best_offset(im, ref):
    r = Image.open(ref).convert("RGBA")
    best = None
    for dy in range(-12, 13):
        for dx in range(-14, 15):
            c = Image.new("RGBA", (C, C)); c.paste(im, (dx, dy), im)
            diff = ImageChops.difference(c, r)
            score = sum(diff.convert("L").getdata())
            if best is None or score < best[0]: best = (score, dx, dy)
    return best[1], best[2]
cols = max(p[2] for p in plan)
sheet = Image.new("RGBA", (C*cols, C*len(plan)*2))
for ai, (a, entries, n) in enumerate(plan):
    for di, e in enumerate(entries):
        if isinstance(e, str): e = {"dir": e}
        folder = e["dir"]
        files = sorted(f for f in os.listdir(folder) if f.endswith(".png"))
        if e.get("pick"): files = [files[i] for i in e["pick"]]
        files = files + [files[-1]] * (n - len(files))
        ims = [Image.open(os.path.join(folder, f)).convert("RGBA") for f in files[:n]]
        if "offset" in e:
            off = tuple(e["offset"])
        elif "align" in e:
            ref, fi = e["align"]; off = best_offset(ims[fi], ref)
        else:
            off = default_offset(ims[0])
        print(a, di, ims[0].size, "offset", off)
        for fi, im in enumerate(ims):
            cell = circle_frame(fi, n) if e.get("circle") else Image.new("RGBA", (C, C))
            # "dy": an extra drop per frame (a flyer falling to the ground as it dies)
            dy = e.get("dy", [0] * n)[fi]
            layer = Image.new("RGBA", (C, C)); layer.paste(im, (off[0], off[1] + dy), im)
            cell.alpha_composite(layer)
            sheet.paste(cell, (fi*C, (ai*2+di)*C))
sheet.save(out); print(sheet.size)
