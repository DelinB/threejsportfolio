#!/usr/bin/env python3
"""Generate branded social images for the portfolio.

og.png       1200x630  — Open Graph / Twitter card
apple-icon   180x180   — Apple touch icon

Design mirrors the site: paper background, ink type, accent teal
star mark, receipt barcode strip. Uses Carlito (metric-compatible
bold sans) + DejaVu Sans Mono as local stand-ins for the webfonts.
"""
from PIL import Image, ImageDraw, ImageFont
import math
import random

PAPER = (241, 236, 223)
INK = (43, 34, 29)
DARK = (74, 59, 50)
ACCENT = (14, 110, 99)

EN = "/usr/share/fonts/truetype/english"
DJ = "/usr/share/fonts/truetype/dejavu"

f_name = ImageFont.truetype(f"{EN}/Carlito-Bold.ttf", 168)
f_sub = ImageFont.truetype(f"{EN}/Carlito-Regular.ttf", 46)
f_mono_sm = ImageFont.truetype(f"{DJ}/DejaVuSansMono-Bold.ttf", 22)


def star(draw, cx, cy, r, color, width):
    """The site's 8-spoke star mark."""
    for i in range(8):
        a = math.pi / 4 * i
        draw.line(
            [(cx - r * math.cos(a), cy - r * math.sin(a)),
             (cx + r * math.cos(a), cy + r * math.sin(a))],
            fill=color, width=width)


def barcode(draw, x, y, w, h, color):
    random.seed(7)
    cx = x
    while cx < x + w:
        bw = random.choice([2, 2, 3, 4, 5, 7])
        if random.random() > 0.32:
            draw.rectangle([cx, y, cx + bw - 1, y + h], fill=color)
        cx += bw + random.choice([2, 3, 4])


# ---------------- OG image 1200x630 ----------------
og = Image.new("RGB", (1200, 630), PAPER)
d = ImageDraw.Draw(og)

d.text((80, 62), "PORTFOLIO — FRONTEND UI DEVELOPER", font=f_mono_sm, fill=DARK)

d.text((72, 128), "DELIN B", font=f_name, fill=INK)
wb = d.textlength("DELIN B", font=f_name)
star(d, 80 + wb + 44, 236, 40, ACCENT, 14)
d.text((72, 320), "ANISH", font=f_name, fill=INK)

sub1 = "Frontend "
sub2 = "UI Developer"
d.text((76, 528), sub1, font=f_sub, fill=INK)
w1 = d.textlength(sub1, font=f_sub)
d.text((76 + w1, 528), sub2, font=f_sub, fill=ACCENT)

card_x, card_y, card_w, card_h = 830, 150, 300, 330
d.rectangle([card_x, card_y, card_x + card_w, card_y + card_h], fill=PAPER, outline=INK, width=3)
d.text((card_x + 28, card_y + 26), "CAREER RECEIPT", font=f_mono_sm, fill=INK)
d.text((card_x + 28, card_y + 62), "No 001", font=f_mono_sm, fill=DARK)
lines = ["PROJECTS DELIVERED .. 3+", "REACT COMPONENTS .. 100s", "CONSOLE ERRORS .. 0", "YEARS OF SERVICE .. 2"]
for i, line in enumerate(lines):
    d.text((card_x + 28, card_y + 106 + i * 34), line, font=f_mono_sm, fill=DARK if i != 2 else ACCENT)
barcode(d, card_x + 28, card_y + 252, card_w - 56, 34, INK)
d.text((card_x + 28, card_y + 296), "ANISH-2024", font=f_mono_sm, fill=DARK)

d.rectangle([0, 610, 1200, 630], fill=ACCENT)

og.save("/home/z/my-project/public/og.png", optimize=True)
print("og.png", og.size)

# ---------------- Apple icon 180x180 ----------------
ap = Image.new("RGB", (180, 180), PAPER)
d2 = ImageDraw.Draw(ap)
star(d2, 90, 90, 52, ACCENT, 18)
ap.save("/home/z/my-project/src/app/apple-icon.png", optimize=True)
print("apple-icon.png", ap.size)
