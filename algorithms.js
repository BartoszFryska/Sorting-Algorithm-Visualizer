function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function EndingGreenFinish() {
    for( let i = 0; i < unsortedArray.length; i++ ) {
        colorArray[i] = [20, 255, 20];
        RenderRectangles();
        await sleep(40);
        colorArray[i] = [255, 255, 255];
    }

    RenderRectangles(); // Finish
    await sleep(80);

    for( let i = 0; i < unsortedArray.length; i++ ) { // All in green
        colorArray[i] = [20, 255, 20];
    }
    RenderRectangles();
    await sleep(200);

    for( let i = 0; i < unsortedArray.length; i++ ) { // All in white again
        colorArray[i] = [255, 255, 255];
    }
    RenderRectangles();
    await sleep(80);
}

async function MarkTwoRectanglesInRedAndWaitThenDemarkThem(indexOne, indexTwo) {
    colorArray[indexOne] = [255, 0, 0];
    colorArray[indexTwo] = [255, 0, 0];

    RenderRectangles();
    await sleep(40); // Adjust wait time for visibility

    colorArray[indexOne] = [255, 255, 255];
    colorArray[indexTwo] = [255, 255, 255];

    RenderRectangles(); // Re-render to reset the color
}

async function SwapTwoRectangles(indexOne, indexTwo) {
    //[unsortedArray[indexOne], unsortedArray[indexTwo]] = [unsortedArray[indexTwo], unsortedArray[indexOne]];
    let temporary;
    temporary = unsortedArray[indexOne];
    unsortedArray[indexOne] = unsortedArray[indexTwo];
    unsortedArray[indexTwo] = temporary;

    RenderRectangles();
    await sleep(40); // Adjust wait time for visibility
}

var MergeSort = {
    Merge: async function(arrayOne, arrayTwo, indexOne, indexTwo) {
        let sortedArray = [];

        while (arrayOne.length && arrayTwo.length) {
            await MarkTwoRectanglesInRedAndWaitThenDemarkThem(indexOne, indexTwo);

            if (arrayOne[0] < arrayTwo[0]) {
                sortedArray.push(arrayOne.shift());
                indexOne++;
            } else {
                sortedArray.push(arrayTwo.shift());
                indexTwo++;
            }
        }

        return [...sortedArray, ...arrayOne, ...arrayTwo];
    },

    MergeSort: async function(array, indexStart) {
        if (array.length <= 1) return array;

        let middlePoint = Math.floor(array.length / 2);

        let left = await MergeSort.MergeSort(array.slice(0, middlePoint), indexStart);
        let right = await MergeSort.MergeSort(array.slice(middlePoint), indexStart + middlePoint);

        let end = await MergeSort.Merge(left, right, indexStart, indexStart + middlePoint);

        for (let i = indexStart; i < indexStart + end.length; i++) {
            unsortedArray[i] = end[i - indexStart];
            RenderRectangles();
            await sleep(40); // Adjust wait time for visibility
        }

        return end;
    },

    Sort: async function(array) {
        await MergeSort.MergeSort(array, 0);
        await EndingGreenFinish();
    }
};

var BubbleSort = {
    Sort : async function ( array ) {
        var swapped;
        var n = array.length;

        for (let i = 0; i < n - 1; i++){
            swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                await MarkTwoRectanglesInRedAndWaitThenDemarkThem( j, j+1 );
                await sleep(40);

                if ( array[j] > array[j + 1] ) {
                    [array[j], array[j+1]] = [array[j+1], array[j]];
                    swapped = true;

                    await SwapTwoRectangles( j, j+1 );
                    await sleep (40);
                }
            }

            if (swapped == false) break; // if the array is sorted break
        }

        await EndingGreenFinish();
    }
}

var BogoSort = {
    IsSorted : function (array){
        for(var i = 1; i < arr.length; i++)
            if (a[i] < a[i-1])
                return false

        return true
    },

    Shuffle : function(array){
        var n = array.length
        var i, j = n

        for (i = 0; i < array.length(); i++){
            var ind = Math.floor( Math.random() * n )

            // flag those rectangles in color, slow down and then decolor them

            [ array[j-i-1], array[ind] ] = [ array[ind], array[j-i-1] ]

            // swap those rectangles
        }

        return array
    },

    Sort : function (array) {
        while ( !IsSorted(array) )
            array = Shuffle (array)
    }
}

var CoctailSort = {
    Sort : function(array) {
        let swapped = true;
        let start = 0;
        let end = array.length;
  
        while (swapped == true) {
            swapped = false;
  
            for (let i = start; i < end - 1; ++i) {
                // change the colors of rectangles and dechange them

                if (array[i] > array[i + 1]) {
                    [ array[i], array[i+1] ] = [ array[i+1], array[i] ]
                    swapped = true;

                    // swap rectangles
                }
            }
  
            if (swapped == false)
                break;

            swapped = false;
  
            end = end - 1;
  
            for (let i = end - 1; i >= start; i--) {
                // change the colors of rectangles and dechange them

                if (array[i] > array[i + 1]) {
                    [ array[i], array[i+1] ] = [ array[i+1], array[i] ]
                    swapped = true;

                    // swap rectangles
                }
            }
  
            start++
        }
    }
}

var InsertionSort = {
    Sort : function (array) {
        n = array.length
        let i, key, j;  
        for (i = 1; i < n; i++) {  
            key = arr[i];  
            j = i - 1;  
    
            while (j >= 0 && arr[j] > key) {
                // flag that rectangle j and deflag it, and swap
            
                arr[j + 1] = arr[j];  
                j = j - 1;  
            }  

            // change rectangles
            arr[j + 1] = key;  
        } 
    }
}

var QuickSort = {

    Partition : function(array, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        // flag pivot one in different color
      
        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++
                // mark those rectangles in red and then demark them

                [arr[i], arr[j]] = [arr[j], arr[i]]
                
                // swap rectangles
            }
        }
      
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

        // deflag pivot
        return i + 1
    },
    
    Sort : function(array, low, high) {
        if (low < high) {
            let pi = Partition(array, low, high);
      
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
}