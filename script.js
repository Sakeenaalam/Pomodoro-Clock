let timeLeft;
let timer;
let isRunning = false;

// Create an audio element for the alarm sound
let alarm = new Audio('alarm01.mp3'); // Replace 'alarm.mp3' with the path to your alarm sound file

function startTimer(duration) {
  let endTime = new Date().getTime() + duration * 60 * 1000;
  
  timer = setInterval(function() {
    let currentTime = new Date().getTime();
    timeLeft = Math.floor((endTime - currentTime) / 1000);
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeLeft = 0;
      isRunning = false;
      // Play the alarm sound when the timer reaches zero
      alarm.play();
    }
    
    displayTimeLeft();
  }, 1000);
}

function displayTimeLeft() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("time-left").innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.getElementById("start").addEventListener("click", function() {
  let inputMinutes = parseInt(document.getElementById("input-minutes").value);
  
  if (isNaN(inputMinutes) || inputMinutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }
  
  if (!isRunning) {
    startTimer(inputMinutes);
    isRunning = true;
  }
});

document.getElementById("reset").addEventListener("click", function() {
  clearInterval(timer);
  document.getElementById("input-minutes").value = "";
  timeLeft = 0;
  displayTimeLeft();
  isRunning = false;
});
