const cardsArray = [
    { name: 'flower', img: 'https://via.placeholder.com/100?text=1' },
    { name: 'butterfly', img: 'https://via.placeholder.com/100?text=2' },
    { name: 'sun', img: 'https://via.placeholder.com/100?text=3' },
    { name: 'moon', img: 'https://via.placeholder.com/100?text=4' },
    { name: 'star', img: 'https://via.placeholder.com/100?text=5' },
    { name: 'heart', img: 'https://via.placeholder.com/100?text=6' },
    { name: 'diamond', img: 'https://via.placeholder.com/100?text=7' },
    { name: 'circle', img: 'https://via.placeholder.com/100?text=8' }
  ];
  
  const gameBoard = document.getElementById('gameBoard');
  const restartButton = document.getElementById('restartButton');
  const winnerMessage = document.getElementById('winnerMessage');
  const moveCountElement = document.getElementById('moveCount');
  const missCountElement = document.getElementById('missCount');
  const roundCountElement = document.getElementById('roundCount');
  const levelCountElement = document.getElementById('levelCount');
  const knowledgePointsElement = document.getElementById('knowledgePoints');
  const accuracyElement = document.getElementById('accuracy');
  
  let gameCards = [...cardsArray, ...cardsArray];
  let flippedCards = [];
  let matchedPairs = 0;
  let moveCount = 0;
  let missCount = 0;
  let roundCount = 0;
  let levelCount = 1;
  let knowledgePoints = 0;
  let accuracy = 0;
  
  function createBoard() {
    gameBoard.innerHTML = '';
    winnerMessage.classList.remove('show');
    moveCount = 0;
    missCount = 0;
    matchedPairs = 0;
    flippedCards = [];
    updateStats();
    gameCards.sort(() => 0.5 - Math.random());
    gameCards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
      cardElement.innerHTML = `
        <div class="card-inner" id="card-${index}">
          <div class="card-front"></div>
          <div class="card-back">
            <img src="${card.img}" alt="${card.name}">
          </div>
        </div>
      `;
      gameBoard.appendChild(cardElement);
      cardElement.addEventListener('click', flipCard);
    });
  }
  
  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('is-flipped')) {
      this.classList.add('is-flipped');
      flippedCards.push(this);
      if (flippedCards.length === 2) {
        moveCount++;
        updateStats();
        checkMatch();
      }
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.name === card2.dataset.name) {
      matchedPairs++;
      flippedCards = [];
      knowledgePoints += 10;
      if (matchedPairs === cardsArray.length) {
        showWinnerMessage();
      }
    } else {
      missCount++;
      setTimeout(() => {
        card1.classList.remove('is-flipped');
        card2.classList.remove('is-flipped');
        flippedCards = [];
      }, 1000);
    }
    updateStats();
  }
  
  function showWinnerMessage() {
    winnerMessage.classList.add('show');
    roundCount++;
    if (roundCount % 3 === 0) {
      levelCount++;
    }
    accuracy = ((matchedPairs / (matchedPairs + missCount)) * 100).toFixed(2);
    updateStats();
  }
  
  function updateStats() {
    moveCountElement.textContent = moveCount;
    missCountElement.textContent = missCount;
    roundCountElement.textContent = roundCount;
    levelCountElement.textContent = levelCount;
    knowledgePointsElement.textContent = knowledgePoints;
    accuracyElement.textContent = `${accuracy}%`;
  }
  
  restartButton.addEventListener('click', createBoard);
  
  createBoard();
  