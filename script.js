// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    loadProgress();
    calculateTotal();
});

function calculateTotal() {
    let total = 0;
    const inputs = document.querySelectorAll('.number-input');
    const inputValues = [];

    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            total += value;
        }
        inputValues.push(input.value);
    });

    const difference = 1000 - total;

    document.getElementById('total').innerText = total;
    document.getElementById('difference').innerText = difference;

    if (difference <= 0) {
        document.getElementById('quota-message').classList.remove('hidden');
    } else {
        document.getElementById('quota-message').classList.add('hidden');
    }

    localStorage.setItem('inputValues', JSON.stringify(inputValues));
    localStorage.setItem('total', total);
}

function addInput() {
    const inputContainer = document.getElementById('input-container');
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.className = 'number-input';
    newInput.setAttribute('oninput', 'calculateTotal()');
    inputContainer.appendChild(newInput);

    calculateTotal();
}

function loadProgress() {
    const savedInputValues = JSON.parse(localStorage.getItem('inputValues')) || [];
    const savedTotal = localStorage.getItem('total') || 0;

    const inputContainer = document.getElementById('input-container');
    inputContainer.innerHTML = '';

    savedInputValues.forEach(value => {
        const newInput = document.createElement('input');
        newInput.type = 'number';
        newInput.className = 'number-input';
        newInput.value = value;
        newInput.setAttribute('oninput', 'calculateTotal()');
        inputContainer.appendChild(newInput);
    });

    document.getElementById('total').innerText = savedTotal;
    const difference = 1000 - savedTotal;
    document.getElementById('difference').innerText = difference;

    if (difference <= 0) {
        document.getElementById('quota-message').classList.remove('hidden');
    } else {
        document.getElementById('quota-message').classList.add('hidden');
    }
}
