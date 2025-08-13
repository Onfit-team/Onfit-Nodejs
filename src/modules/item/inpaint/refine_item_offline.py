import sys
from inference_inpaint import inpaint_item

if len(sys.argv) < 4:
    sys.stderr.write("Usage: python refine_item_offline.py <image> <mask> <output>\n")
    sys.exit(1)

image_path, mask_path, output_path = sys.argv[1], sys.argv[2], sys.argv[3]

try:
    inpaint_item(image_path, mask_path, output_path)
except Exception as e:
    sys.stderr.write(f"[Inpaint 실패]: {str(e)}\n")
    sys.exit(1)
