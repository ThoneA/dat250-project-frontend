const optionsContainer = document.getElementById('options-container');
const addOptionBtn = document.getElementById('addOptionBtn');
const createPollBtn = document.getElementById('createPollBtn');
const votingContainer = document.getElementById('voting-container');

const API_URL = 'http://localhost:8080/polls';

// Når man trykker "add option"
addOptionBtn.addEventListener('click', () => {
  const optionDiv = document.createElement('div');
  optionDiv.classList.add('option');

  optionDiv.innerHTML = `
        <input type="text" class="option-input" placeholder="Enter option">
        <button class="removeOptionBtn">Remove</button>
    `;

  // Når man trykker 'remove'
  optionDiv.querySelector('.removeOptionBtn').addEventListener('click', () => {
    optionsContainer.removeChild(optionDiv);
  });

  optionsContainer.appendChild(optionDiv);
});

// Hent eksisterende polls fra backend når siden lastes
window.addEventListener('DOMContentLoaded', async () => {
  votingContainer.innerHTML = '';
  try {
    const response = await fetch(API_URL);
    const polls = await response.json();
    polls.forEach(renderPoll);
  } catch (e) {
    votingContainer.innerHTML = '<p>Kunne ikke hente polls fra server.</p>';
  }
});

function renderPoll(poll) {
  // Lag en container for denne ene pollen
  const pollContainer = document.createElement('div');
  pollContainer.classList.add('single-poll');

  // Legg til spørsmålet
  const pollQuestion = document.createElement('h2');
  pollQuestion.textContent = poll.question;
  pollContainer.appendChild(pollQuestion);

  // Legg til alternativene
  poll.options.forEach(option => {
    const optionEl = document.createElement('div');
    optionEl.classList.add('vote-option');

    const textEl = document.createElement('span');
    textEl.textContent = option.caption;

    const votesEl = document.createElement('span');
    votesEl.textContent = ` ${option.votes} ${option.votes === 1 ? 'Vote' : 'Votes'}`;

    const upBtn = document.createElement('button');
    upBtn.textContent = '⬆️';
    upBtn.addEventListener('click', async () => {
      // Send stemme til backend
      await fetch(`${API_URL}/${poll.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: option.id, delta: 1 })
      });
      option.votes++;
      votesEl.textContent = ` ${option.votes} ${option.votes === 1 ? 'Vote' : 'Votes'}`;
    });

    const downBtn = document.createElement('button');
    downBtn.textContent = '⬇️';
    downBtn.addEventListener('click', async () => {
      if (option.votes > 0) {
        await fetch(`${API_URL}/${poll.id}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ optionId: option.id, delta: -1 })
        });
        option.votes--;
        votesEl.textContent = ` ${option.votes} ${option.votes === 1 ? 'Vote' : 'Votes'}`;
      }
    });

    optionEl.appendChild(textEl);
    optionEl.appendChild(upBtn);
    optionEl.appendChild(downBtn);
    optionEl.appendChild(votesEl);

    pollContainer.appendChild(optionEl);
  });

  // Legg til hele pollen nederst i votingContainer
  votingContainer.appendChild(pollContainer);
}

// Opprett ny poll og send til backend
createPollBtn.addEventListener('click', async () => {
  /** @type {HTMLInputElement} */
  const question = document.getElementById('pollQuestion');
  /** @type {NodeListOf<HTMLInputElement>} */
  const optionInputs = document.querySelectorAll('.option-input');

  const options = [];
  optionInputs.forEach(input => {
    if (input.value.trim() !== '') {
      options.push({ caption: input.value.trim() });
    }
  });

  if (!question.value.trim() || options.length === 0) {
    alert('Du må skrive inn et spørsmål og minst ett alternativ!');
    return;
  }

  // Send ny poll til backend
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question.value.trim(),
        options: options
      })
    });
    const newPoll = await response.json();
    renderPoll(newPoll);
  } catch (e) {
    alert('Kunne ikke opprette poll på serveren.');
  }

  // Tøm inputs så man kan lage en ny poll lett
  question.value = '';
  optionsContainer.innerHTML = '';
});



