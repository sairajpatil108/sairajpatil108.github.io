import os
from PIL import Image, ImageDraw, ImageFilter

def add_corners(im, rad):
    mask = Image.new('L', im.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0) + im.size, radius=rad, fill=255)
    result = im.copy()
    result.putalpha(mask)
    return result

def add_shadow(image, offset=(0,0), shadow=(0,0,0,255), border=50, blur=30):
    shadow_image = Image.new('RGBA', image.size, shadow)
    
    # Calculate sizes
    total_width = image.width + 2*border
    total_height = image.height + 2*border
    
    background = Image.new('RGBA', (total_width, total_height), (0,0,0,0))
    
    shadow_box = (
        border + offset[0],
        border + offset[1],
        border + image.width + offset[0],
        border + image.height + offset[1]
    )
    
    background.paste(shadow_image, shadow_box, shadow_image)
    background = background.filter(ImageFilter.GaussianBlur(blur))
    background.paste(image, (border, border), image)
    return background

path1 = "/Users/tellmedigiinfotechpvtltd/.gemini/antigravity/brain/973f9d46-db5a-4ac5-ab7e-984c61a44137/media__1775242616945.png"
path2 = "/Users/tellmedigiinfotechpvtltd/.gemini/antigravity/brain/973f9d46-db5a-4ac5-ab7e-984c61a44137/media__1775242616948.png"

im1 = Image.open(path1).convert("RGBA")
im2 = Image.open(path2).convert("RGBA")

# Resize if they are very large to manageable sizes
MAX_H = 1200
if im1.height > MAX_H:
    r = MAX_H / float(im1.height)
    im1 = im1.resize((int(im1.width * r), int(im1.height * r)), Image.Resampling.LANCZOS)
    im2 = im2.resize((int(im2.width * r), int(im2.height * r)), Image.Resampling.LANCZOS)

im1_rounded = add_corners(im1, 50)
im2_rounded = add_corners(im2, 50)

im1_shadow = add_shadow(im1_rounded, offset=(0, 20), blur=40)
im2_shadow = add_shadow(im2_rounded, offset=(0, 20), blur=40)

# Layout
bg_color = (243, 244, 246, 255) # Light gray aesthetic
padding = 100
spacing = 100

total_w = padding*2 + im1_shadow.width + im2_shadow.width + spacing
total_h = padding*2 + max(im1_shadow.height, im2_shadow.height)

bg = Image.new("RGBA", (total_w, total_h), bg_color)
bg.paste(im1_shadow, (padding, padding), im1_shadow)
bg.paste(im2_shadow, (padding + im1_shadow.width + spacing, padding), im2_shadow)

final_path = "/Users/tellmedigiinfotechpvtltd/Desktop/sairaj/portfolio_clone/assets/ZylienceFit.png"
bg.save(final_path, "PNG")
print(f"Saved mockup to {final_path}")
