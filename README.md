# In Depth View of the World

Published on the [tfc.ai website](https://www.tfc.ai/depth-explorations.github.io/).


## Creation of Depth Maps

From the [Depth Anything v2 repo](https://github.com/DepthAnything/Depth-Anything-V2) use the *run.py* and *run_video.py* scripts. If you prefer the *inferno* colormap, adjust the `get_cmap` part of the script.

## Transfer of sound channel in video

To transfer the sound channel from your original video to the depth map video, use the following [ffmpeg]() command:

```bash
ffmpeg -y -i input_with_sound.mp4 -i depthmaps_video.mp4 -map 0:a -map 1:v:0 -c:v copy output.mp4
```

## Creating web-optimized images

[WebP Codec](https://developers.google.com/speed/webp/docs/using) used to prepare the images for the web.

`for file in *.jpg; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done`
for file in *.png; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done

# TODOs
* [x] Depth Anything V2 video
* [x] Depth Anything V2 images
* [x] Preload image on changeImage
* [x] Document usage, e.g. image-map generation, webp image creation (squoosh?)
* [x] Create page with observations and ideas
* [x] add favicon
* [x] Add v2 image slideshow to main page
* [x] link back to main page from videos + images
* [x] ~~Prepare so anyone can fork the repository or from a template with their own dependencies~~
* [x] ~~write down dependencies~~
* [x] Make sure it runs in simple HTTP server before publishing
* [x] link YouTube video


