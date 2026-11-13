"""Generate VGIS's own placeholder imagery (no third-party content):
- drawing / model / render triplet for the before-after slider (derived from a CC0 photo)
- neutral 2D brand-board samples
- abstract 'AI-assisted category' samples
"""
import math, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance, ImageFont, ImageChops

S = sys.argv[1]  # scratchpad dir
OUT = sys.argv[2]  # public/samples
BEBAS = f"{S}/bebas.ttf"
INTER = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"
INTER_SB = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
ORANGE = (255, 102, 0)
W, H = 1600, 1000

def font(p, s): return ImageFont.truetype(p, s)

# ---------- 1. drawing -> model -> render ----------
src = Image.open(f"{OUT}/exterior-white-villa.jpg").convert("RGB")
w, h = src.size
render = src
gray = ImageOps.grayscale(src)
# Model: clay look = soft grayscale, lifted shadows, low contrast, slight warm tint
clay = ImageEnhance.Contrast(gray.filter(ImageFilter.GaussianBlur(1.2))).enhance(0.75)
clay = ImageOps.autocontrast(clay, cutoff=2)
clay = ImageOps.colorize(clay, black=(70, 68, 66), white=(242, 240, 236))
# Drawing: line drawing from edges on drafting paper
edges = gray.filter(ImageFilter.GaussianBlur(1)).filter(ImageFilter.FIND_EDGES)
edges = ImageOps.autocontrast(edges, cutoff=1).point(lambda v: 255 if v > 38 else 0)
lines = ImageOps.invert(edges).convert("L")
paper = Image.new("RGB", (w, h), (246, 247, 249))
d = ImageDraw.Draw(paper)
for x in range(0, w, 24): d.line([(x, 0), (x, h)], fill=(225, 230, 238), width=1)
for y in range(0, h, 24): d.line([(0, y), (w, y)], fill=(225, 230, 238), width=1)
ink = Image.new("RGB", (w, h), (28, 52, 96))
drawing = Image.composite(paper, ink, lines)
for name, im in [("bb-1-drawing", drawing), ("bb-2-model", clay), ("bb-3-render", render)]:
    im.save(f"{OUT}/{name}.jpg", quality=86)

# ---------- 2. brand boards (fictional, neutral) ----------
def brand_board(name, fn, bg, fg, accent, mark):
    im = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(im)
    # grid of artboards
    pad = 60
    d.rectangle([pad, pad, 980, H - pad], fill=fg)
    # logo mark
    cx, cy = 520, 420
    mark(d, cx, cy, bg, accent)
    d.text((cx, 640), name, font=font(BEBAS, 120), fill=bg, anchor="mm")
    d.text((cx, 720), "BRAND SYSTEM · SAMPLE", font=font(INTER_SB, 22), fill=accent, anchor="mm")
    # swatches
    sx = 1040
    for i, c in enumerate([fg, accent, bg, (200, 200, 200)]):
        d.rectangle([sx, pad + i * 150, sx + 500, pad + i * 150 + 130], fill=c, outline=(0, 0, 0) if c == bg else None)
        hexs = "#%02X%02X%02X" % c
        tc = (255, 255, 255) if sum(c) < 380 else (0, 0, 0)
        d.text((sx + 24, pad + i * 150 + 92), hexs, font=font(INTER, 24), fill=tc)
    # type specimen
    d.text((sx, 690), "Aa", font=font(BEBAS, 150), fill=fg)
    d.text((sx + 170, 720), "Display / Bebas", font=font(INTER, 22), fill=fg)
    d.text((sx + 170, 760), "Body / Inter", font=font(INTER, 22), fill=fg)
    d.line([(sx, 880), (sx + 500, 880)], fill=accent, width=6)
    d.text((sx, 900), "Sample artwork, not client work", font=font(INTER, 20), fill=fg)
    im.save(f"{OUT}/{fn}.jpg", quality=88)

def m_blocks(d, cx, cy, c, a):
    for i, (x, y, ww, hh) in enumerate([(-150, -150, 100, 300), (-30, -150, 100, 140), (-30, 10, 100, 140), (90, -150, 70, 300)]):
        d.rectangle([cx + x, cy + y, cx + x + ww, cy + y + hh], fill=a if i == 2 else c)
def m_ring(d, cx, cy, c, a):
    d.ellipse([cx - 150, cy - 150, cx + 150, cy + 150], outline=c, width=36)
    d.pieslice([cx - 80, cy - 80, cx + 80, cy + 80], 200, 340, fill=a)
def m_leaf(d, cx, cy, c, a):
    d.polygon([(cx, cy - 170), (cx + 140, cy), (cx, cy + 170), (cx - 140, cy)], fill=c)
    d.polygon([(cx, cy - 80), (cx + 66, cy), (cx, cy + 80), (cx - 66, cy)], fill=a)
def m_wave(d, cx, cy, c, a):
    for k in range(4):
        pts = [(cx - 170 + t, cy - 90 + k * 60 + 26 * math.sin(t / 34)) for t in range(0, 341, 6)]
        d.line(pts, fill=a if k == 1 else c, width=22)

brand_board("IDENTITY 01", "brand-board-01", (255, 255, 255), (18, 32, 56), (230, 160, 40), m_blocks)
brand_board("IDENTITY 02", "brand-board-02", (250, 246, 240), (40, 40, 40), (220, 70, 70), m_ring)
brand_board("IDENTITY 03", "brand-board-03", (255, 255, 255), (20, 90, 80), (140, 200, 170), m_leaf)
brand_board("IDENTITY 04", "brand-board-04", (240, 246, 250), (12, 60, 110), (60, 170, 220), m_wave)

# ---------- 3. abstract AI-category samples ----------
def abstract(fn, seed, palette):
    random.seed(seed)
    im = Image.new("RGB", (W, H), palette[0])
    d = ImageDraw.Draw(im, "RGBA")
    for _ in range(90):
        x, y = random.randint(-200, W), random.randint(-200, H)
        r = random.randint(60, 420)
        c = random.choice(palette[1:])
        d.ellipse([x, y, x + r, y + r], fill=c + (random.randint(30, 90),))
    im = im.filter(ImageFilter.GaussianBlur(28))
    d = ImageDraw.Draw(im, "RGBA")
    for i in range(0, W, 40):
        d.line([(i, 0), (i - 300, H)], fill=(255, 255, 255, 14), width=2)
    im.save(f"{OUT}/{fn}.jpg", quality=86)

abstract("ai-concept-dusk", 7, [(18, 14, 30), (255, 120, 40), (120, 60, 200), (40, 120, 220), (250, 200, 120)])
abstract("ai-concept-atrium", 21, [(232, 236, 240), (180, 200, 220), (255, 170, 110), (120, 140, 170), (250, 250, 250)])
print("ok")
