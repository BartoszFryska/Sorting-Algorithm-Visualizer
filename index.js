let rectangleContainer = document.getElementById("containerForRectangles");
let minRange = 2;
let maxRange = 30;
let numberOfBars = 45;
let unsortedArray = new Array(numberOfBars);
let colorArray = new Array(numberOfBars).fill([255, 255, 255]);
let isCalculating = false

function setContainerHeight(height) {
    rectangleContainer.style.height = height + "px";
}

function CreateRandomArray() { // create random array
    for (let i = 0; i < numberOfBars; i++) {
        unsortedArray[i] = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    }
}

document.addEventListener("DOMContentLoaded", function() { // create at start
    CreateRandomArray();
    RenderRectangles();
    adjustContainerHeight(); // Set initial height of the container
    window.addEventListener('resize', adjustContainerHeight); // Adjust height on window resize
});

function adjustContainerHeight() {
    let containerHeight = window.innerHeight * 0.7; // Adjust this value as needed
    setContainerHeight(containerHeight);
    RenderRectangles();
}

function RenderRectangles() { // Renders Rectangles
    rectangleContainer.innerHTML = '';
    for (let i = 0; i < numberOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = unsortedArray[i] * 10 + "px";
        bar.style.width = Math.floor(rectangleContainer.offsetWidth / numberOfBars) - 2 + "px";
        bar.style.background = `rgb(${colorArray[i][0]}, ${colorArray[i][1]}, ${colorArray[i][2]})`;
        rectangleContainer.appendChild(bar);
    }
}

const randomizeArrayBtn = document.getElementById("randomizeArrayBtn");
randomizeArrayBtn.addEventListener("click", async function() { // Handles pressing the button for randomization
  if (isCalculating) return;  
  CreateRandomArray();
    RenderRectangles();
});

const outputNOfBars = document.getElementById("numberOfArrMem");
function ChangeNumberOfArrayMembers() { // Changes number of array members and prints out a new amount
    const slider = document.getElementById("sliderNOfArrayMembers");
    if (isCalculating) return;
    outputNOfBars.innerHTML = slider.value;
    numberOfBars = parseInt(slider.value);
    unsortedArray = new Array(numberOfBars);
    colorArray = new Array(numberOfBars).fill([255, 255, 255]);
    CreateRandomArray();
    RenderRectangles();
}

const slider = document.getElementById("sliderNOfArrayMembers");
slider.addEventListener("input", function() { // Handling slider changes and in return number of array members
  if (isCalculating) return;
    ChangeNumberOfArrayMembers();
});

const selectAlgoDropdown = document.getElementById("algorithms");
let chosenAlgorithm = "default";
selectAlgoDropdown.addEventListener("change", function() {
    chosenAlgorithm = selectAlgoDropdown.value;
});

const sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", async function () { // Sorting button click handling
  if(isCalculating) return;
  isCalculating = true;
  switch (chosenAlgorithm) {
        case "BubbleSort":
            await BubbleSort.Sort(unsortedArray);
            break;
        case "MergeSort":
            await MergeSort.Sort(unsortedArray);
            break;
        case "BogoSort":
            await BogoSort.Sort(unsortedArray);
            break;
        case "CoctailSort":
            await CoctailSort.Sort(unsortedArray);
            break;
        case "InsertionSort":
            await InsertionSort.Sort(unsortedArray);
            break;
        case "QuickSort":
            await QuickSort.Sort(unsortedArray);
            break;
    }
    isCalculating = false;
});
