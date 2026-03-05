let currentPairIndex = 0;
let imagePairs;

fetch('image-map.json')
  .then(response => response.json())
  .then(data => {
    // Store the parsed JSON array in a variable
    imagePairs = data;

    // Do something with the data
    console.log(imagePairs); 
  })
  .catch(error => console.error('Error fetching or parsing JSON:', error));


const displayedImage = document.getElementById("displayedImage");
const hiddenPreviewImage = document.getElementById("hiddenPreviewImage");
const blendSlider = document.getElementById("blendSlider");

blendSlider.addEventListener("input", () => {
    displayedImage.style.opacity = blendSlider.value / 100;
});

function changeImage(direction) {
    currentPairIndex += direction;

    if (currentPairIndex < 0) {
        currentPairIndex = imagePairs.length - 1;
    } else if (currentPairIndex >= imagePairs.length) {
        currentPairIndex = 0;
    }

    const [secondImage, firstImage] = imagePairs[currentPairIndex];

    displayedImage.src = "images/" + secondImage;
    hiddenPreviewImage.src = "images/" + firstImage;
    blendSlider.value = 100;
    displayedImage.style.opacity = 1;
}

displayedImage.addEventListener("click", () => {
    swapImageDepthMap();
});

// Initial load of the first image pair
// changeImage(0);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        changeImage(-1); // Go to the previous pair on left arrow key
    } else if (event.key === "ArrowRight") {
        changeImage(1); // Go to the next pair on right arrow key
    } else if (event.key === " ") {
        event.preventDefault(); // Prevent default space key behavior (scrolling)
        swapImageDepthMap();
    } else if (event.key === "Escape") {
        window.location.href = "./";
    }
});

function swapImageDepthMap() {
    const newValue = blendSlider.value > 50 ? 0 : 100;
    blendSlider.value = newValue;
    displayedImage.style.opacity = newValue / 100;
}

