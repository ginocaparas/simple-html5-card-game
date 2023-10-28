const cards = ["https://i.imgur.com/mCNQcGT.jpg", "https://i.imgur.com/mCNQcGT.jpg", "https://i.imgur.com/8YBigio.jpg", "https://i.imgur.com/8YBigio.jpg", "https://i.imgur.com/Bei35OY.jpg", "https://i.imgur.com/Bei35OY.jpg", "https://i.imgur.com/osJB0vs.jpg", "https://i.imgur.com/osJB0vs.jpg", "https://i.imgur.com/U9vPAAc.jpg", "https://i.imgur.com/U9vPAAc.jpg", "https://i.imgur.com/7lK2pDr.jpg", "https://i.imgur.com/7lK2pDr.jpg" ];

const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const matchCounter = document.getElementById("match-counter");
const pointMeter = document.getElementById("point-meter");
const congratulationsScreen = document.getElementById("congratulations");
const failScreen = document.getElementById("fail");
const totalPointsText = document.getElementById("total-points");
const congratulationsResetButton = document.getElementById("congratulations-reset-button");
const failResetButton = document.getElementById("fail-reset-button");

    let flippedCards = [];
    let matchedCount = 0;
    let points = 0;

    cards.sort(() => Math.random() - 0.5);

    cards.forEach((imageUrl, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = index;
      card.dataset.imageUrl = imageUrl;
      const cardFront = document.createElement("div");
      cardFront.className = "front";
      const img = document.createElement("img");
      img.src = imageUrl;
      cardFront.appendChild(img);
      const cardValue = document.createElement("div");
      cardValue.className = "card-value";
      cardValue.textContent = index + 1;
      card.appendChild(cardFront);
      card.appendChild(cardValue);
      card.addEventListener("click", () => handleCardClick(card));
      gameBoard.appendChild(card);
    });

    function handleCardClick(card) {
      if (flippedCards.length < 2 && !card.classList.contains("flipped"))     {
        card.classList.add("flipped");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
          setTimeout(() => checkMatch(), 1000);
        }
      }
    }

    function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.imageUrl === card2.dataset.imageUrl) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount++;
        matchCounter.textContent = `Total Matches: ${matchedCount}`;
        points += 2;
        pointMeter.textContent = `Points: ${points}`;
        if (matchedCount === cards.length / 2) {
          if (points > 0) {
            congratulationsScreen.style.display = "block";
            failScreen.style.display = "none";
            totalPointsText.textContent = `Total Points: ${points}`;
          } else {
            congratulationsScreen.style.display = "none";
            failScreen.style.display = "block";
            totalPointsText.textContent = `Total Points: ${points}`;
          }
        }
      } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        points--;
        pointMeter.textContent = `Points: ${points}`;
      }
      flippedCards = [];
    }

    resetButton.addEventListener("click", () => resetGame());
    congratulationsResetButton.addEventListener("click", () => resetGame());
    failResetButton.addEventListener("click", () => resetGame());

    function resetGame() {
      while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
      }
      cards.sort(() => Math.random() - 0.5);
      cards.forEach((imageUrl, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = index;
        card.dataset.imageUrl = imageUrl;
        const cardFront = document.createElement("div");
        cardFront.className = "front";
        const img = document.createElement("img");
        img.src = imageUrl;
        cardFront.appendChild(img);
        const cardValue = document.createElement("div");
        cardValue.className = "card-value";
        cardValue.textContent = index + 1;
        card.appendChild(cardFront);
        card.appendChild(cardValue);
        card.addEventListener("click", () => handleCardClick(card));
        gameBoard.appendChild(card);
      });
      matchedCount = 0;
      matchCounter.textContent = `Matches: 0`;
      points = 0;
      pointMeter.textContent = `Points: 0`;
      congratulationsScreen.style.display = "none";
      failScreen.style.display = "none";
    }