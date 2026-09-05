#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph (social preview) cover for the site.

Requires Pillow. Reproducible output: run `python3 bin/generate_og_cover.py`
and commit the resulting assets/images/og-cover.png.

Design: site-branded dark gradient background, a diagonal indigo->purple
accent, the name and tagline on the left, and the portrait on the right.
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = "assets/images/og-cover.png"
W, H = 1200, 630
PORTRAIT = "assets/images/Mohammadreza Gilak.png"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

NAME = "Mohammadreza Gilak"
TAGLINE = "Control Engineering \u00b7 Robotics \u00b7 Research Notes"
DOMAIN = "mgilak.ir"


def gradient(size, top=(17, 24, 39), bottom=(30, 41, 59)):
    """Vertical gradient image."""
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(size[1]):
        t = y / (size[1] - 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        for x in range(size[0]):
            px[x, y] = (r, g, b)
    return img


def rounded_photo(path, size, radius):
    img = Image.open(path).convert("RGB").resize(size, Image.LANCZOS)
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return img, mask


def main():
    bg = gradient((W, H))

    # Diagonal indigo -> purple accent band on the left edge.
    accent = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(accent)
    band = [(0, 80), (26, 80), (40, H), (16, H)]
    d.polygon(band, fill=(99, 102, 241, 255))
    grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    for i in range(0, 620):
        alpha = int(160 * (1 - i / 620)) if i < 240 else 0
        gd.rectangle([26 + i, 0, 26 + i, H], fill=(118, 75, 162, alpha))
    accent = Image.alpha_composite(accent, grad)
    bg.paste(accent, (0, 0), accent)

    # Subtle portrait glow on the right.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gld = ImageDraw.Draw(glow)
    gld.ellipse([W - 420, 90, W - 20, 540], fill=(99, 102, 241, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    bg.paste(glow, (0, 0), glow)

    # Portrait thumbnail.
    photo, mask = rounded_photo(PORTRAIT, (340, 415), 28)
    bg.paste(photo, (W - 385, 100), mask)

    draw = ImageDraw.Draw(bg)

    name_font = ImageFont.truetype(FONT_BOLD, 72)
    tag_font = ImageFont.truetype(FONT_REG, 34)
    dom_font = ImageFont.truetype(FONT_MONO, 26)

    draw.text((68, 190), NAME, font=name_font, fill=(241, 245, 249))
    draw.text((70, 285), TAGLINE, font=tag_font, fill=(148, 163, 184))
    draw.text((70, 520), DOMAIN, font=dom_font, fill=(129, 140, 248))

    bg.save(OUT)
    print(f"wrote {OUT} ({bg.size[0]}x{bg.size[1]})")


if __name__ == "__main__":
    main()