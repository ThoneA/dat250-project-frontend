
const optionsContainer = document.getElementById('options-container');  
const addOptionBtn = document.getElementById('addOptionBtn');
const createPollBtn = document.getElementById('createPollBtn');
const votingContainer = document.getElementById('voting-container');

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
    /** @type {HTMLInputElement} */
    const question = document.getElementById('pollQuestion');

    /** @type {NodeListOf<HTMLInputElement>} */
    const optionInputs = document.querySelectorAll('.option-input');

    const options = [];
    optionInputs.forEach(input => {
        if (input.value.trim() !== '') {
            options.push({ text: input.value.trim(), votes: 0 });
        }
    });

    // lag en container for denne ene pollen
    const pollContainer = document.createElement('div');
    pollContainer.classList.add('single-poll');

    // legg til spørsmålet
    const pollQuestion = document.createElement('h2');
    pollQuestion.textContent = question.value;
    pollContainer.appendChild(pollQuestion);

    // legg til alternativene
    options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('vote-option');

        const textEl = document.createElement('span');
        textEl.textContent = option.text;

        const votesEl = document.createElement('span');
        votesEl.textContent = ` ${option.votes} Votes`;

        const upBtn = document.createElement('button');
        upBtn.textContent = '⬆️';
        upBtn.addEventListener('click', () => {
            option.votes++;
            if (option.votes > 1) { 
              votesEl.textContent = ` ${option.votes} Votes`;
            }
            else { 
              votesEl.textContent = ` ${option.votes} Vote`;
            }
        });

        const downBtn = document.createElement('button');
        downBtn.textContent = '⬇️';
        downBtn.addEventListener('click', () => {
          if (option.votes > 0) { 
            option.votes--;
            votesEl.textContent = ` (${option.votes})`;
          }
        });

        optionEl.appendChild(textEl);
        optionEl.appendChild(upBtn);
        optionEl.appendChild(downBtn);
        optionEl.appendChild(votesEl);

        pollContainer.appendChild(optionEl);
    });

    // legg til hele pollen nederst i votingContainer
    votingContainer.appendChild(pollContainer);

    // tøm inputs så man kan lage en ny poll lett
    question.value = '';
    optionsContainer.innerHTML = '';
});

