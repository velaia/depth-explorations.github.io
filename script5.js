let currentPairIndex = 0;
let imagePairs;

const counter = document.getElementById("counter");

fetch('image-map-v2.json')
  .then(response => response.json())
  .then(data => {
    imagePairs = data;

    const hashIndex = parseInt(window.location.hash.slice(1));
    if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < imagePairs.length) {
        currentPairIndex = hashIndex - 1;
        changeImage(1);
    } else {
        counter.textContent = `1 / ${imagePairs.length}`;
    }
    preloadAdjacent();
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
    counter.textContent = `${currentPairIndex + 1} / ${imagePairs.length}`;
    history.replaceState(null, "", "#" + currentPairIndex);
    preloadAdjacent();
}

function preloadAdjacent() {
    [-1, 1].forEach(offset => {
        let idx = currentPairIndex + offset;
        if (idx < 0) idx = imagePairs.length - 1;
        if (idx >= imagePairs.length) idx = 0;
        const [a, b] = imagePairs[idx];
        [a, b].forEach(src => { new Image().src = "images/" + src; });
    });
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

