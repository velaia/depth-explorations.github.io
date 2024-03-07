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

function changeImage(direction) {
    currentPairIndex += direction;

    if (currentPairIndex < 0) {
        currentPairIndex = imagePairs.length - 1;
    } else if (currentPairIndex >= imagePairs.length) {
        currentPairIndex = 0;
    }

    const [secondImage, firstImage] = imagePairs[currentPairIndex];

    displayedImage.src = "images/" + secondImage;
}

displayedImage.addEventListener("click", () => {
    swapImageDepthMap();
});

// Initial load of the first image pair
// changeImage(0);

function extractFilename(fullPath) {
    const url = new URL(fullPath);
    return url.pathname.split('/').pop();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        changeImage(-1); // Go to the previous pair on left arrow key
    } else if (event.key === "ArrowRight") {
        changeImage(1); // Go to the next pair on right arrow key
    } else if (event.key === " ") {
        event.preventDefault(); // Prevent default space key behavior (scrolling)
        swapImageDepthMap();
    }
});

function swapImageDepthMap() {
    // Swap between the two images of the current pair on space key
    const [secondImage, firstImage] = imagePairs[currentPairIndex];
    displayedImage.src = "images/" + ((decodeURI(extractFilename(displayedImage.src)) === firstImage) ? secondImage : firstImage);
}

