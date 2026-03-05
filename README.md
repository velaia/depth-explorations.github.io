# In Depth View of the World

A creative web project that turns travel photography and video into interactive depth visualizations, built entirely through AI-assisted ("vibe-coded") development.

## The AI Models

The core of the project is **Depth Anything v2** (ViT-L), a state-of-the-art **monocular depth estimation** model — meaning it infers 3D depth from a single 2D image or video frame with no stereo camera or LiDAR required. The model produces a grayscale depth map where pixel brightness encodes estimated distance from the camera. Both v1 and v2 of Depth Anything are showcased side-by-side, making the quality improvements between model generations directly visible.

## The Creative Concept

Rather than treating depth maps as a technical artifact, the project presents them as an artistic medium in their own right. Travel photos and videos from Malaysia and Thailand become something between documentary and abstract art — familiar scenes rendered in ghostly gradients.

**Depth map videos** extend this to motion: original travel footage is processed frame-by-frame through the model to produce a flowing depth video, with the original audio track transferred back in post-processing. The result is an uncanny experience — recognizable soundscapes paired with pulsing, luminous abstractions.

For photos, an interactive toggle (click or spacebar) lets viewers flip between the depth map and the original, creating a reveal effect that reframes both images.

## Technical Execution

The site is intentionally minimal: pure HTML/CSS/JS, no frameworks, no build step. Features include:

- Smooth depth-to-photo blending via an opacity slider
- Keyboard and button navigation through the full image set
- Shareable deep-links to specific images via URL hashes
- Adjacent image preloading for seamless transitions
- WebP-compressed images for fast delivery
- YouTube-embedded depth videos with original audio preserved via `ffmpeg`

**Deployment is fully automated**: pushing to the `main` branch triggers a GitHub Actions workflow that publishes the site to GitHub Pages — zero manual steps from commit to live.

The entire project — from model inference pipeline to the web interface — was built through iterative AI collaboration, with prompts steering both the visual design decisions and the code structure.

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

