let array = [];
const arrayContainer = document.getElementById('array-container');
const resultContainer = document.getElementById('result');
const codeContainer = document.getElementById('code');
const timeComplexityContainer = document.getElementById('time-complexity');

function generateArray() {
    const size = parseInt(document.getElementById('array-size').value);
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    array.sort((a, b) => a - b);
    displayArray();
}

function displayArray(highlightIndex = -1) {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        if (index === highlightIndex) {
            element.classList.add('highlight');
        }
        element.textContent = value;
        arrayContainer.appendChild(element);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startLinearSearch() {
    const value = parseInt(document.getElementById('search-value').value);
    resultContainer.textContent = '';
    displayAlgorithm('linear');
    for (let i = 0; i < array.length; i++) {
        displayArray(i);
        await sleep(1000); // wait for 1000ms to visualize each step
        if (array[i] === value) {
            resultContainer.textContent = `Value ${value} found at index ${i}`;
            return;
        }
    }
    resultContainer.textContent = `Value ${value} not found`;
}

async function startBinarySearch() {
    const value = parseInt(document.getElementById('search-value').value);
    resultContainer.textContent = '';
    displayAlgorithm('binary');
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        displayArray(mid);
        await sleep(1000); // wait for 1000ms to visualize each step
        if (array[mid] === value) {
            resultContainer.textContent = `Value ${value} found at index ${mid}`;
            return;
        } else if (array[mid] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    resultContainer.textContent = `Value ${value} not found`;
}

function displayAlgorithm(type) {
    if (type === 'linear') {
        codeContainer.textContent = `// C++ implementation for Linear Search

int linearSearch(const vector<int>& arr, int value) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == value) {
            return i;  // Return the index where the value is found
        }
    }
    return -1;  // Return -1 if the value is not found
}`;
        timeComplexityContainer.textContent = 'Time Complexity: O(n)';
    } else if (type === 'binary') {
        codeContainer.textContent = `// C++ implemntation for Binary Search
        int binarySearch(const vector<int>& arr, int value) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;  // Calculate the mid index to avoid overflow

        if (arr[mid] == value) {
            return mid;  // Return the index where the value is found
        } else if (arr[mid] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;  // Return -1 if the value is not found
}`;
        timeComplexityContainer.textContent = 'Time Complexity: O(log n)';
    }
}

// Initial display
generateArray();
