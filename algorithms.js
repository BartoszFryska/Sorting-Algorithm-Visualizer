var MergeSort = {
    Merge : function ( arrayOne, arrayTwo ) {
        let sortedArray = []

        while( arrayOne.length && arrayTwo.length) {

            // somewhere there mark two arrays ar 0 and slow down

            //  somewhere there demark two arrays [0] 

            if( arrayOne[0] < arrayTwo[0]){
                sortedArray.push(arrayOne.shift())
            }
            else{
                sortedArray.push(arrayTwo.shift())
            }
        }

        // and somewhere here find a way to change the heights of
        // rectangles in the visualization in right places (replace
        // those two arrays with a sorted one) and slow down

        return [...sortedArray, ...arrayOne, ...arrayTwo]
    },

    Sort : function ( array ) {
        if ( array.length < 1 ) return array

        let middlePoint = Math.floor( array.length / 2 )

        let left = MergeSort( array.slice(0, middlePoint) )
        let right = MergeSort( array.slice(middlePoint) )

        return Merge( left, right );
    }
}

var BubbleSort = {
    Sort : function ( array ) {
        var i, j
        var swapped

        for (i = 0; i < n - 1; i++){
            swapped = false
            for (j = 0; j < n - i - 1; j++) 
            {
                // flag two rectangles with those indexes, wait and deflag them

                if (arr[j] > arr[j + 1]) 
                {
                    [array[i], array[j]] = [array[j], array[j]];
                    swapped = true

                    // swap rectangles in a visualization
                }
            }

            if (swapped == false) // if the array is sorted break
            break
        }
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