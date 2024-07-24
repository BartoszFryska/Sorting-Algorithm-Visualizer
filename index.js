let rectangleContainer = document.getElementById("containerForRectangles")
let minRange = 1;
let maxRange = 20;
let numberOfBars = 45;
let unsortedArray = new Array(numberOfBars);
let colorArray = new Array(numberOfBars).fill([255, 255, 255]);

function CreateRandomArray() { // create random array
    for (let i = 0; i < numberOfBars; i++) {
        unsortedArray[i] = Math.floor(Math.random()*(maxRange-minRange+1)) + minRange;
    }
}

document.addEventListener("DOMContentLoaded", function() { // create at start
    CreateRandomArray();
    RenderRectangles(unsortedArray);
})

function RenderRectangles() { // Renders rectangles with height in array and color in colorArray
  rectangleContainer.innerHTML = ''; // to clear out inner html  
  for ( let i = 0; i < numberOfBars; i++ ) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = unsortedArray[i] * 10 + "px";
        bar.style.width = Math.floor( rectangleContainer.offsetWidth / numberOfBars );
        bar.style.background = `rgb(${colorArray[i][0]}, ${colorArray[i][1]}, ${colorArray[i][2]})`;
        
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
    unsortedArray = new Array(numberOfBars);
    colorArray = new Array(numberOfBars).fill([255, 255, 255]);
}

// const slider = document.getElementById("slidecontainer");
// slider.addEventListener("input", function() { // Handling slider changes and in return number of array members
//     numberOfBars = slider.value 
//     document.getElementById("numberOfArrMem").textContent = numberOfBars
//   ChangeNumberOfArrayMembers()
//     CreateRandomArray()
//     RenderRectangles(unsortedArray)
// }, false);

document.addEventListener("DOMContentLoaded", function() {
  const slider = document.getElementById("slidecontainer");
  const sliderValue = document.getElementById("numberOfArrMem");

  // Update the value next to the slider when the page loads
  sliderValue.textContent = slider.value;

  // Add event listener to update the value next to the slider when it changes
  slider.addEventListener("input", function() {
      sliderValue.textContent = slider.value;
  });
});

const selectAlgoDropdown = document.getElementById("algorithms")
var chosenAlgorithm = ""
selectAlgoDropdown.addEventListener("change", function () { // Handling choosing of algorithm
    chosenAlgorithm = selectAlgoDropdown.value;
});

const sortBtn = document.getElementById("sortBtn");
sortBtn.addEventListener("click", function () { // Sorting button click handling
    switch (chosenAlgorithm) {
      case "BubbleSort":
        BubbleSort.Sort(unsortedArray)
        break;
      case "MergeSort":
        MergeSort.Sort(unsortedArray)
        break;
      case "BogoSort":
        BogoSort.Sort(unsortedArray)
        break;
      case "CoctailSort":
        CoctailSort.Sort(unsortedArray)
        break;
      case "InsertionSort":
        InsertionSort.Sort(unsortedArray)
        break;
      case "QuickSort":
        QuickSort.Sort(unsortedArray)
        break;
    }
  });