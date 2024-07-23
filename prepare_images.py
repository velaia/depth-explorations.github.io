import os, glob, json
from pathlib import Path
import shutil


images_path = "images"
depth_path = "v2/depth/"
img_path = "v2/img/"

files = []

for idx, file in enumerate(glob.glob(images_path + "/" + depth_path + "/*.webp")):
    depth_name = Path(file).name
    img_name = depth_name.replace(".webp", ".jpg.webp")
    # img = Path(img_path).joinpath(img_name)
    # if img.is_file():
        # print(f"{img} is file {idx}")
        # try:
        #     # shutil.copyfile(Path(img), Path('images/').joinpath(img_name))
        #     print("File copied successfully.")
        # except shutil.Error as e:
        #     print("Error copying file:", e)
    files.append((depth_path + depth_name, img_path + img_name))


# write to a json file that can be read from JavaScript
with open("image-map-v2.json", "w+") as outfile:
    outfile.write(json.dumps(files))
