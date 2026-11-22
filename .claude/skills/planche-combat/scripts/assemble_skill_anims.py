import json, base64, io, sys, os
from PIL import Image
D = sys.argv[1]

def frames_of(name):
    sheet = Image.open(os.path.join(D, name + ".png")).convert("RGBA")
    meta = json.load(open(os.path.join(D, name + ".json")))
    out, durs = [], []
    for f in meta["frames"]:
        r = f["frame"]
        out.append(sheet.crop((r["x"], r["y"], r["x"] + r["w"], r["y"] + r["h"])))
        durs.append(f.get("duration", 83))
    # trailing empty frames out (one kept as a clean end is not needed: the effect just stops)
    while len(out) > 1 and out[-1].getbbox() is None:
        out.pop(); durs.pop()
    return out, round(sum(durs) / len(durs))

# skill id: (impact name, its ground point, fly name or None, fly head point, mode, hit)
SPEC = {
 "sk-fireball": ("fire-impact", (39, 63), "fire-fly", (63, 15), "projectile", 3),
 "sk-ice-lance": ("ice-impact", (31, 52), "ice-fly", (63, 19), "projectile", 2),
 "sk-storm": ("storm", (49, 138), None, None, "target", 4),
 "sk-heal": ("heal", (18, 66), None, None, "target", 2),
 "sk-venom": ("venom", (29, 54), None, None, "target", 1),
 "sk-double": ("double", (29, 50), None, None, "target", 4),
 "sk-lullaby": ("lullaby", (48, 62), None, None, "zone", 6),
}
result = {}
for sid, (imp, g, fly, h, mode, hit) in SPEC.items():
    fx, ms = frames_of(imp)
    fl = frames_of(fly)[0] if fly else []
    iw, ih = fx[0].size
    left, top = g[0], g[1]
    right, bottom = iw - g[0], ih - g[1]
    if fl:
        fw, fh = fl[0].size
        left, top = max(left, h[0]), max(top, h[1])
        right, bottom = max(right, fw - h[0]), max(bottom, fh - h[1])
    # (the ground point inside the frame, even under an effect drawn in the air)
    right, bottom = max(right, 1), max(bottom, 2)
    W, H = left + right, top + bottom
    cols = max(len(fx), len(fl))
    rows = 2 if fl else 1
    sheet = Image.new("RGBA", (W * cols, H * rows))
    for i, im in enumerate(fx):
        sheet.paste(im, (i * W + left - g[0], top - g[1]), im)
    for i, im in enumerate(fl):
        sheet.paste(im, (i * W + left - h[0], H + top - h[1]), im)
    buf = io.BytesIO(); sheet.save(buf, "PNG", optimize=True)
    sheet.save(os.path.join(D, f"anim-{sid}.png"))
    anim = {"image": "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode(),
            "frame": {"w": W, "h": H}, "anchor": {"x": left, "y": top}, "mode": mode,
            "frames": len(fx), "ms": ms, "hit": min(hit, len(fx) - 1)}
    if fl:
        anim["flyFrames"] = len(fl)
    result[sid] = anim
    print(sid, f"{W}x{H}", "frames", len(fx), "fly", len(fl), "ms", ms, "kB", len(buf.getvalue()) // 1024)
json.dump(result, open(os.path.join(D, "anims.json"), "w"))
