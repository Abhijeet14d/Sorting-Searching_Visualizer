document.getElementById('generate-array').addEventListener('click', generateArray);
document.getElementById('start-sorting').addEventListener('click', startSorting);

let array = [];

function generateArray() {
    const arraySize = document.getElementById('array-size').value;
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${100 / array.length}%`;
        arrayContainer.appendChild(bar);
    });
}

async function startSorting() {
    const algorithm = document.getElementById('algorithm').value;
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort();
            displayCodeAndComplexity('bubbleSort');
            break;
        case 'insertionSort':
            await insertionSort();
            displayCodeAndComplexity('insertionSort');
            break;
        case 'selectionSort':
            await selectionSort();
            displayCodeAndComplexity('selectionSort');
            break;
        case 'mergeSort':
            await mergeSort(array, 0, array.length - 1);
            displayCodeAndComplexity('mergeSort');
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1);
            displayCodeAndComplexity('quickSort');
            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Update the bars
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                await sleep(200); // Sleep for 50ms to visualize the sorting
            }
        }
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            j--;
            await sleep(200);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        await sleep(200);
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
            await sleep(200);
        }
    }
}

async function mergeSort(arr, left, right) {
    if (left >= right) {
        return;
    }
    const bars = document.getElementsByClassName('bar');
    const mid = left + Math.floor((right - left) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right, bars);
}

async function merge(arr, left, mid, right, bars) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            bars[k].style.height = `${arr[k] * 3}px`;
            i++;
        } else {
            arr[k] = rightArr[j];
            bars[k].style.height = `${arr[k] * 3}px`;
            j++;
        }
        k++;
        await sleep(200);
    }
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        bars[k].style.height = `${arr[k] * 3}px`;
        i++;
        k++;
        await sleep(200);
    }
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        bars[k].style.height = `${arr[k] * 3}px`;
        j++;
        k++;
        await sleep(200);
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const bars = document.getElementsByClassName('bar');
        const pi = await partition(arr, low, high, bars);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high, bars) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i] * 3}px`;
            bars[j].style.height = `${arr[j] * 3}px`;
            await sleep(200);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
    bars[high].style.height = `${arr[high] * 3}px`;
    await sleep(200);
    return i + 1;
}

function displayCodeAndComplexity(algorithm) {
    const codeDisplay = document.getElementById('code-display');
    const complexity = document.getElementById('complexity');

    const algorithms = {
        bubbleSort: {
            code: `// C++ program for implementation of Bubble Sort

void BubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
            complexity: "Time Complexity: O(n^2), Space Complexity: O(1)"
        },
        insertionSort: {
            code: `// C++ program for implementation of Insertion Sort

void InsertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
            complexity: "Time Complexity: O(n^2), Space Complexity: O(1)"
        },
        selectionSort: {
            code: `// C++ program for implementation of Selection Sort

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        // Swap the found minimum element with the first element
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
            complexity: "Time Complexity: O(n^2), Space Complexity: O(1)"
        },
        mergeSort: {
            code: `/* C++ program for Merge Sort */

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int L[n1], R[n2];

    // Copy data to temporary arrays L[] and R[]
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back into arr[left..right]
    int i = 0; // Initial index of first subarray
    int j = 0; // Initial index of second subarray
    int k = left; // Initial index of merged subarray
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Function to sort an array using merge sort algorithm
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}`,
            complexity: "Time Complexity: O(n log n), Space Complexity: O(n)"
        },
        quickSort: {
            code: `// C++ implementation of QuickSort
// Function to swap two elements
void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

// This function takes last element as pivot, places
// the pivot element at its correct position in sorted
// array, and places all smaller (smaller than pivot)
// to left of pivot and all greater elements to right of pivot
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // pivot
    int i = (low - 1); // Index of smaller element

    for (int j = low; j <= high - 1; j++) {
        // If current element is smaller than or
        // equal to pivot
        if (arr[j] <= pivot) {
            i++; // increment index of smaller element
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// The main function that implements QuickSort
// arr[] --> Array to be sorted,
// low --> Starting index,
// high --> Ending index
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[p] is now
        // at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
            complexity: "Time Complexity: O(n log n), Space Complexity: O(log n)"
        }
    };

    codeDisplay.textContent = algorithms[algorithm].code;
    complexity.textContent = algorithms[algorithm].complexity;
}
