const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome", "London"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury", "Saturn"],
    answer: 0
  }
  // Add more questions here
];

let currentPlayer = 1;
let remainingTime1 = 200;
let remainingTime2 = 200;
let currentQuestion = 0;
let timer;

function displayQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const timeDisplay1 = document.getElementById("time1");
  const timeDisplay2 = document.getElementById("time2");

  questionContainer.innerText = questions[currentQuestion].question;
  optionsContainer.innerHTML = '';

  questions[currentQuestion].options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(btn);
  });

  timeDisplay1.innerText = remainingTime1;
  timeDisplay2.innerText = remainingTime2;
}

function checkAnswer(selectedIndex) {
  const selectedAnswer = selectedIndex === questions[currentQuestion].answer;

  if (currentPlayer === 1) {
    remainingTime1 -= 20;
    document.getElementById("time1").innerText = remainingTime1;
  } else {
    remainingTime2 -= 20;
    document.getElementById("time2").innerText = remainingTime2;
  }

  if (selectedAnswer) {
    document.getElementById("result").innerText = "Correct answer!";
  } else {
    document.getElementById("result").innerText = "Wrong answer!";
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    clearInterval(timer);
    document.getElementById("submit").style.display = "none";
    document.getElementById("result").innerText = "Quiz Completed!";
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (currentPlayer === 1) {
      remainingTime1--;
      document.getElementById("time1").innerText = remainingTime1;
      if (remainingTime1 <= 0) {
        clearInterval(timer);
        document.getElementById("submit").style.display = "none";
        document.getElementById("result").innerText = "Time's up! Quiz completed.";
      }
    } else {
      remainingTime2--;
      document.getElementById("time2").innerText = remainingTime2;
      if (remainingTime2 <= 0) {
        clearInterval(timer);
        document.getElementById("submit").style.display = "none";
        document.getElementById("result").innerText = "Time's up! Quiz completed.";
      }
    }
  }, 1000);
}

window.onload = function() {
  displayQuestion();
  startTimer();
};
