import os, glob, json
from pathlib import Path
import shutil



depth_path = "/Users/daniel/Downloads/Camera Uploads.depth"
img_path = "/Users/daniel/Downloads/Camera Uploads 2024_03"

files = []

for idx, file in enumerate(glob.glob(depth_path + "/*img_depth*")):
    depth_name = Path(file).name
    img_name = depth_name.replace("_img_depth", "").replace("png", "jpg")
    img = Path(img_path).joinpath(img_name)
    if img.is_file():
        print(f"{img} is file {idx}")
        try:
            shutil.copyfile(Path(img), Path('images/').joinpath(img_name))
            print("File copied successfully.")
        except shutil.Error as e:
            print("Error copying file:", e)
    files.append((depth_name, img_name))


# write to a json file that can be read from JavaScript
with open("image-map.json", "w+") as outfile:
    outfile.write(json.dumps(files))
