
const optionsContainer = document.getElementById('options-container');  
const addOptionBtn = document.getElementById('addOptionBtn');
const createPollBtn = document.getElementById('createPollBtn');

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

createPollBtn.addEventListener('click', () => {
    const question = document.getElementById('pollQuestion');

    /** @type {NodeListOf<HTMLInputElement>} */
    const optionInputs = document.querySelectorAll('.option-input') ;

    const options = [];
    optionInputs.forEach(input => {
        if (input.value.trim() !== '') {
            options.push(input.value.trim());
        }
    });
    
});

