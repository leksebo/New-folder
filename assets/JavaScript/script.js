// DOM Elements
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('roll');
const questionSection = document.getElementById('question-section');
const questionEl = document.getElementById('question');
const answerButtons = [document.getElementById('answer1'), document.getElementById('answer2'), document.getElementById('answer3')];
const nextTurnBtn = document.getElementById('next-turn');
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');

// Game State
let scores = [0, 0];
let currentPlayer = 0;
let targetScore = 50; // Winning score
let questions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: 1, difficulty: "easy" },
  { question: "What is the capital of France?", answers: ["Berlin", "Paris", "Rome"], correct: 1, difficulty: "medium" },
  { question: "What is 12 x 12?", answers: ["144", "120", "132"], correct: 0, difficulty: "hard" },
  { question: "What is 1000 / 5?", answers: ["200", "250", "128"], correct: 0, difficulty: "easy" },
  { question: "Who founded Facebook?", answers: ["Elon Musk", "Mark Zuckerberg", "Jeff Bezos"], correct: 1, difficulty: "easy" },
  { question: "When was JavaScript first introduced?", answers: ["1965", "1995", "1997"], correct: 1, difficulty: "hard" },
];

// Functions
function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice${diceValue}.png`;

  let difficulty;
  if (diceValue <= 2) difficulty = "easy";
  else if (diceValue <= 4) difficulty = "medium";
  else difficulty = "hard";

  askQuestion(difficulty);
}

function askQuestion(difficulty) {
  rollBtn.classList.add('hidden');
  questionSection.classList.remove('hidden');

  // Filter questions by difficulty
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

  questionEl.textContent = randomQuestion.question;
  randomQuestion.answers.forEach((answer, index) => {
    answerButtons[index].textContent = answer;
    answerButtons[index].onclick = () => checkAnswer(index, randomQuestion.correct, difficulty);
  });
}

function checkAnswer(selected, correct, difficulty) {
  questionSection.classList.add('hidden');
  nextTurnBtn.classList.remove('hidden');

  if (selected === correct) {
    let points = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
    scores[currentPlayer] += points;
    updateScores();
    if (scores[currentPlayer] >= targetScore) {
      alert(`Player ${currentPlayer + 1} wins!`);
      resetGame();
    }
  }
}

function updateScores() {
  score1El.textContent = scores[0];
  score2El.textContent = scores[1];
}

function nextTurn() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  updateActivePlayer();
  nextTurnBtn.classList.add('hidden');
  rollBtn.classList.remove('hidden');
}

function updateActivePlayer() {
  player1El.classList.toggle('active', currentPlayer === 0);
  player2El.classList.toggle('active', currentPlayer === 1);
}

function resetGame() {
  scores = [0, 0];
  currentPlayer = 0;
  updateScores();
  updateActivePlayer();
  rollBtn.classList.remove('hidden');
  questionSection.classList.add('hidden');
  nextTurnBtn.classList.add('hidden');
}

// Event Listeners
rollBtn.addEventListener('click', rollDice);
nextTurnBtn.addEventListener('click', nextTurn);
