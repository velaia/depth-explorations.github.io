"""Small helper tool to create a json file mapping images to their depth maps.

Adjust the file paths and file extensions before each use."""

import glob, json, random
from pathlib import Path


images_path = "images"
depth_path = "v2/depth/"
img_path = "v2/img/"
# generate image map name with some randomness to not overwrite existing image map
image_map_name = "image-map-" + str(random.randint(1_000_000, 9_999_999)) + ".json"

files = []

for idx, file in enumerate(glob.glob(images_path + "/" + depth_path + "/*.webp")):
    depth_name = Path(file).name
    img_name = depth_name.replace(".webp", ".jpg.webp")
    files.append((depth_path + depth_name, img_path + img_name))


# write to a json file that can be read from JavaScript
with open(image_map_name, "w+") as outfile:
    outfile.write(json.dumps(files))
