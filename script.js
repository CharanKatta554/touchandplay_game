const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');
const audio = document.getElementById('audio');
const bgAudio = document.getElementById('bgAudio');

let score = 0;
let timeLeft = 60;

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} - Timer: ${formatTime(timeLeft)}`;
}

function generateRandomPosition() {
  const maxX = gameContainer.clientWidth - target.clientWidth;
  const maxY = gameContainer.clientHeight - target.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  return { x: randomX, y: randomY };
}

function moveTargetRandomly() {
  const newPosition = generateRandomPosition();
  target.style.left = `${newPosition.x}px`;
  target.style.top = `${newPosition.y}px`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updateTime() {
  timeLeft--;
  updateScore();
  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    target.removeEventListener('click', handleTargetClick);
    scoreDisplay.textContent = `Score: ${score} - Timer: 0:00`;
    alert(`Game over! Your score is ${score}. Press on Exit button`)
  }
}

function toggleBackgroundMusic() {
  if (bgAudio.paused) {
    bgAudio.play();
  } else {
    bgAudio.pause();
  }
}

function handleTargetClick() {
  score++;
  moveTargetRandomly();
  updateScore();
  playSound();
}

function playSound() {
  audio.currentTime = 0;
  audio.play();
}

function handleGameContainerClick(event) {
  if (event.target === gameContainer) {
    score--;
    updateScore();
    playSound2();
  }
}

function playSound2() {
  audio2.currentTime = 0;
  audio2.play();
}

updateScore();
moveTargetRandomly();
gameContainer.addEventListener('click', handleGameContainerClick);

const gameInterval = setInterval(updateTime, 1000);
target.addEventListener('click', handleTargetClick);
