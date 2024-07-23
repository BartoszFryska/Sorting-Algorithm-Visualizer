const rectangleContainer = document.getElementById("containerForRectangles")
let minRange = 1;
let maxRange = 20;
let numberOfBars = 245;
let unsortedArray = new Array(numberOfBars);
let colorArray = new Array(numberOfBars);

function CreateRandomArray() {
    for (let i = 0; i < numberOfBars; i++) {
        unsortedArray[i] = Math.floor(Math.random()*(maxRange-minRange+1)) + minRange;
        colorArray[i][0] = 255; colorArray[i][1] = 255; colorArray[i][2] = 255; // setting all to white at the start
    }
}

document.addEventListener("DOMContentLoaded", function() {
    CreateRandomArray();
    RenderRectangles(unsortedArray);
})

function RenderRectangles(array) { // Renders rectangles with height in array and color in colorArray
    for ( let i = 0; array.length; i++ ) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 10 + "px";
        bar.style.width = Math.floor( rectangleContainer.offsetWidth / numberOfBars ) - 2;
        //bar.style.bakground = 'rgb(${colorArray[i][0]}, ${colorArray[i][1]}, ${colorArray[i][2]})'
        bar.style.background = 'white';

        rectangleContainer.appendChild(bar);
    }
}

const randomizeArrayBtn = document.getElementById("randomizeArrayBtn");
randomizeArrayBtn.addEventListener("click", function(){ // Handles pressing the button for randomization
    CreateRandomArray();
    RenderRectangles(unsortedArray);
})

function ChangeNumberOfArrayMembers() { // Changes number of array members and prints out a new amount
    var slider = document.getElementById("sliderNOfArrayMembers");
    var output = document.getElementById("numberOfArrMem");
    output.innerHTML = slider.value
    numberOfBars = slider.value
}

const slider = document.getElementById("sliderNOfArrayMembers");
slider.addEventListener("change", function() { // Handling slider changes and in return number of array members
    ChangeNumberOfArrayMembers()
    CreateRandomArray()
    RenderRectangles(unsortedArray)
}, false);

const selectAlgoDropdown = document.getElementById("algorithms")
var chosenAlgorithm = ""
selectAlgoDropdown.addEventListener("change", function () { // Handling choosing of algorithm
    chosenAlgorithm = selectAlgoDropdown.value;
});

const sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", function () { // Sorting button click handling
    switch (chosenAlgorithm) {
      case "BubbleSort":
        BubbleSort.Sort(array)
        break;
      case "MergeSort":
        MergeSort.Sort(array)
        break;
      case "BogoSort":
        BogoSort.Sort(array)
        break;
      case "CoctailSort":
        CoctailSort.Sort(array)
        break;
      case "InsertionSort":
        InsertionSort.Sort(array)
        break;
      case "QuickSort":
        QuickSort.Sort(array)
        break;
    }
  });