function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function MakeAllRectanglesInAColorAndRender( R, G, B ) {
    colorArray.fill([R, G, B]);
    RenderRectangles();
}

async function EndingGreenFinish() {
    for( let i = 0; i < unsortedArray.length; i++ ) {
        colorArray[i] = [20, 255, 20];
        RenderRectangles();
        await sleep(20);
        colorArray[i] = [255, 255, 255];
    }
    RenderRectangles(); // Finish the 'checking' phase and wait
    await sleep(80);

    await MakeAllRectanglesInAColorAndRender(0, 102, 0); // All in darker green
    await sleep(200);

    await MakeAllRectanglesInAColorAndRender(255, 255, 255) // All in white again
    await sleep(80);
}

async function MarkTwoRectanglesInAColorWaitThenDemarkThem(indexOne, indexTwo, R, G, B) {
    colorArray[indexOne] = [R, G, B];
    colorArray[indexTwo] = [R, G, B];

    RenderRectangles();
    await sleep(40); // Adjust wait time for visibility

    colorArray[indexOne] = [255, 255, 255];
    colorArray[indexTwo] = [255, 255, 255];

    RenderRectangles(); // Re-render to reset the color
}

async function SwapTwoRectanglesRenderAndSleep(indexOne, indexTwo) {
    [unsortedArray[indexOne], unsortedArray[indexTwo]] = [unsortedArray[indexTwo], unsortedArray[indexOne]];
    [colorArray[indexOne], colorArray[indexTwo]] = [colorArray[indexTwo], colorArray[indexOne]];

    RenderRectangles();
    await sleep(40);
}

var MergeSort = {
    Merge: async function(arrayOne, arrayTwo, indexOne, indexTwo) {
        let sortedArray = [];

        while (arrayOne.length && arrayTwo.length) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem(indexOne, indexTwo, 255, 0, 0);

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
    Sort: async function(array) {
        var swapped;
        var n = array.length;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                await MarkTwoRectanglesInAColorWaitThenDemarkThem(j, j + 1, 255, 0, 0);

                if (array[j] > array[j + 1]) {
                    await SwapTwoRectanglesRenderAndSleep(j, j + 1);
                    swapped = true;
                }

                await sleep(40); // Adjust wait time for visibility
            }

            if (!swapped) break; // if the array is sorted, break
        }

        await EndingGreenFinish();
    }
}

var BogoSort = {
    IsSorted: async function (array) {
        for (var i = 1; i < array.length; i++) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i - 1, 0, 0, 102);
            if (array[i] < array[i - 1]) {
                await MakeAllRectanglesInAColorAndRender(50, 0, 0);
                await sleep(400);
                await MakeAllRectanglesInAColorAndRender(255, 255, 255);
                await sleep(400);
                return false;
            }
        }
        return true;
    },

    Shuffle: async function (array) {
        var n = array.length;

        for (var i = 0; i < n; i++) {
            var ind = Math.floor(Math.random() * n);

            await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, ind, 255, 0, 0);

            [array[i], array[ind]] = [array[ind], array[i]];
            await sleep(200);
        }

        return array;
    },

    Sort: async function (array) {
        while (!(await BogoSort.IsSorted(array))) {
            array = await BogoSort.Shuffle(array);
        }
        await MakeAllRectanglesInAColorAndRender(0, 255, 0); // Mark sorted array in green
    }
}

var CoctailSort = {
    Sort : async function (array) {
        let swapped = true;
        let start = 0;
        let end = array.length;
  
        while (swapped == true) {
            swapped = false;
  
            for (let i = start; i < end - 1; ++i) {
                await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i + 1, 255, 0, 0);

                if (array[i] > array[i + 1]) {
                    [ array[i], array[i+1] ] = [ array[i+1], array[i] ]
                    swapped = true;

                    RenderRectangles();
                    await sleep (80);
                }
            }
  
            if (swapped == false){
                break;
            }

            swapped = false;
  
            end = end - 1;
  
            for (let i = end - 1; i >= start; i--) {
                await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i + 1, 255, 0, 0);

                if (array[i] > array[i + 1]) {
                    [ array[i], array[i+1] ] = [ array[i+1], array[i] ]
                    swapped = true;

                    RenderRectangles();
                    await sleep (80);
                }
            }
            
            if (swapped == false){
                break;
            }

            start++;
        }

        await EndingGreenFinish();
    }
}

var InsertionSort = {
    Sort : async function (array) {
        n = array.length
        let i, key, j;  
        for (i = 1; i < n; i++) {  
            key = array[i];  
            j = i - 1;  
            
            await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i, 0, 0, 255);
            await sleep(300);

            while (j >= 0 && array[j] > key) {
                await MarkTwoRectanglesInAColorWaitThenDemarkThem(j, j, 255, 0, 0);

                array[j + 1] = array[j]; 
                RenderRectangles();
                await sleep(80);

                j = j - 1;  
            }  

            array[j + 1] = key;  
            await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i, 0, 0, 255);
            RenderRectangles();
            await sleep(300);
        } 

        await EndingGreenFinish();
    }
}

var QuickSort = {
    Partition: async function(array, low, high) {
        let pivot = array[high];
        let i = low - 1;

        colorArray[high] = [218, 165, 32];

        for (let j = low; j <= high - 1; j++) {
            if (array[j] < pivot) {
                i++;
                await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, j, 255, 0, 0);

                [array[i], array[j]] = [array[j], array[i]];
                RenderRectangles();
                await sleep(80);
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        colorArray[high] = [255, 255, 255];
        await sleep(80);

        return i + 1;
    },
    
    QuickSort: async function(array, low, high) {
        if (low < high) {
            let pi = await QuickSort.Partition(array, low, high);

            await QuickSort.QuickSort(array, low, pi - 1);
            await QuickSort.QuickSort(array, pi + 1, high);
        }
    },

    Sort: async function(array) {
        await QuickSort.QuickSort(array, 0, array.length - 1);

        await EndingGreenFinish();

        return array;
    }
};

var StalinSort = {
    SendToGulag: async function (array, index) {
        colorArray [index] = [255, 0, 0];
        RenderRectangles();
        await sleep (400);
        array [index] = 0;
        RenderRectangles();
        sleep (80);
    },

    Sort: async function(array) {
        var n = array.length;
        var lastGoodOneIndex = 0;

        for (var i = 1; i < n; i ++) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem ( i, lastGoodOneIndex, 0, 0, 255 );

            if ( array[lastGoodOneIndex] > array[i] ) {
                await StalinSort.SendToGulag( array, i );
                continue;
            }

            lastGoodOneIndex = i;
            colorArray [lastGoodOneIndex] = [0, 255, 0];
            RenderRectangles();
            await sleep (400);
            colorArray [lastGoodOneIndex] = [255, 255, 255];
            RenderRectangles();
        }

        await EndingGreenFinish();
        return array;
    }
};

var SlowSort = {
    SlowSort: async function(array, i, j) {
        if (i >= j) return;
    
        let m = Math.floor((i + j) / 2);
    
        await SlowSort.SlowSort(array, i, m);
        await SlowSort.SlowSort(array, m + 1, j);
    
        if (array[m] > array[j]) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem (m, j, 255, 0, 0);
            [array[m], array[j]] = [array[j], array[m]];
            RenderRectangles();
            await sleep(80);
        }
    
        await SlowSort.SlowSort(array, i, j - 1);
    },

    Sort: async function(array) {
        await SlowSort.SlowSort (array, 0, array.length - 1);

        await EndingGreenFinish();
    }
};

var BozoSort = {
    IsSorted: async function (array) {
        for (var i = 1; i < array.length; i++) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem(i, i - 1, 0, 0, 102);
            if (array[i] < array[i - 1]) {
                await MakeAllRectanglesInAColorAndRender(50, 0, 0);
                await sleep(400);
                await MakeAllRectanglesInAColorAndRender(255, 255, 255);
                await sleep(400);
                return false;
            }
        }
        return true;
    },

    SwapTwo: async function (array) {
        var n = array.length;

        var indexOne = Math.floor(Math.random() * n);
        var indexTwo = Math.floor(Math.random() * n);
        while (indexOne == indexTwo) {
            indexTwo = Math.floor(Math.random() * n);
        }

        await MarkTwoRectanglesInAColorWaitThenDemarkThem(indexOne, indexTwo, 255, 0, 0);

        [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
        await sleep(200);

        return array;
    },

    Sort: async function (array) {
        while (!(await BozoSort.IsSorted(array))) {
            array = await BozoSort.SwapTwo(array);
        }
        await MakeAllRectanglesInAColorAndRender(0, 255, 0); // Mark sorted array in green
    }
};

var SelectionSort = {
    Sort: async function(array){
    var n = array.length;

    for (var i = 0; i < n-1; i++){
        
        colorArray [i] = [218,165,32];
        RenderRectangles();
        await sleep (80);

        var minIndex = i;

        for (var j = i + 1; j < n; j++) {
            await MarkTwoRectanglesInAColorWaitThenDemarkThem (minIndex, j, 0, 0, 102);
            colorArray [i] = [218,165,32];
            RenderRectangles();
            await sleep (80);

            if (array[j] < array[minIndex]){
                minIndex = j;
            }
        }

        colorArray [i] = [255, 255, 255];
        RenderRectangles ();
        await sleep (80);

        MarkTwoRectanglesInAColorWaitThenDemarkThem (minIndex, i, 255, 0, 0);
        [ array[minIndex], array[i] ] = [ array[i], array[minIndex] ];
        RenderRectangles();
        await sleep(80);
    }
}

}