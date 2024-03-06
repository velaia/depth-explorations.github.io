import os, glob
from pathlib import Path


depth_path = "/Users/daniel/Downloads/Camera Uploads.depth"
img_path = "/Users/daniel/Downloads/Camera Uploads 2024\/03"

for file in glob.glob(depth_path + "/*"):
    img_name = Path(file).name.replace("_img_depth", "")
    img = Path(img_path).joinpath(img_name)
    print(img)
    if img.is_file(): print(f"{img} is file")
