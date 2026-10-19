import re

with open('prototype/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any broken or external unsplash URLs with solid local images
# 1. DRIVE_08, 09, 10
text = text.replace(
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_water.jpg'
)
text = text.replace(
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_box.jpg'
)
text = text.replace(
    'https://images.unsplash.com/photo-1608248597359-2ff611666611?w=600&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_hand.jpg'
)

# Also check folder coverThumbs
text = text.replace(
    'https://images.unsplash.com/photo-1608248597359-2ff611666611?w=500&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_box.jpg'
)
text = text.replace(
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_table.jpg'
)
text = text.replace(
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    'media/image/farmstay_retinol_water.jpg'
)

with open('prototype/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("data.js image URLs successfully updated with local valid images!")
