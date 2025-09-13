const optionsContainer = document.getElementById('options-container');  
const addOptionBtn = document.getElementById('addOptionBtn');

// når man trykker "add option"
addOptionBtn.addEventListener('click', () => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');

    optionDiv.innerHTML = `
        <input type="text" class="option-input" placeholder="Enter option">
        <button class="removeOptionBtn">Remove</button>
    `;

    // når man trykker 'remove'
    optionDiv.querySelector('.removeOptionBtn').addEventListener('click', () => {
        optionsContainer.removeChild(optionDiv);
    });

    optionsContainer.appendChild(optionDiv);
});

