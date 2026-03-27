let user = JSON.parse(localStorage.getItem("currentUser"));

/* Easy Sentences */
let easy = [
  "Practice makes perfect.",
  "Typing improves speed.",
  "Stay focused always.",
  "Keep learning daily.",
  "Work hard for success."
];

/* Medium Sentences */
let medium = [
  "Typing speed improves with consistent practice.",
  "Success comes from discipline and dedication.",
  "Learning new skills enhances personal growth.",
  "Consistency is the key to improvement.",
  "Practice regularly to improve accuracy."
];

/* Hard Sentences */
let hard = [
  "Success is not final failure is not fatal it is the courage to continue that counts.",
  "Technology is best when it brings people together and enhances productivity.",
  "The only way to achieve greatness is to love what you do and stay committed.",
  "Programming requires patience logic and continuous learning to master.",
  "A good developer always focuses on writing clean and efficient code."
];

/* Paragraphs */
let paragraphs = [
  "Typing is an essential skill in today's digital world. Improving typing speed increases productivity and saves time.",
  "Learning to type efficiently requires dedication and consistent practice. Accuracy should always come before speed.",
  "Technology enables students to improve skills easily. Typing is crucial for academic and professional success."
];

let text = "";
let time = 0;
let timer = null;

/* START */
function startTest() {
  let selectedTime = parseInt(document.getElementById("setTime").value);
  let difficulty = document.getElementById("difficulty").value;
  let mode = document.getElementById("mode").value;

  if (!selectedTime || selectedTime <= 0) {
    alert("Enter valid time");
    return;
  }

  time = selectedTime;

  /* Select Text */
  if (mode === "paragraph") {
    text = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  } else {
    let list = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
    text = list[Math.floor(Math.random() * list.length)];
  }

  document.getElementById("text").innerText = text;
  document.getElementById("input").value = "";
  document.getElementById("time").innerText = time;

  clearInterval(timer);

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById("time").innerText = time;
    } else {
      stopTest();
      calculate();
    }
  }, 1000);
}

/* STOP */
function stopTest() {
  clearInterval(timer);
}

/* RESET */
function resetTest() {
  clearInterval(timer);
  document.getElementById("input").value = "";
  document.getElementById("text").innerText = "";
  document.getElementById("time").innerText = 0;
  document.getElementById("wpm").innerText = 0;
  document.getElementById("accuracy").innerText = 0;
}

/* HIGHLIGHT */
function checkTyping() {
  let input = document.getElementById("input").value;
  let display = "";

  for (let i = 0; i < text.length; i++) {
    if (input[i] === text[i]) {
      display += `<span class="correct">${text[i]}</span>`;
    } else if (input[i]) {
      display += `<span class="wrong">${text[i]}</span>`;
    } else {
      display += text[i];
    }
  }

  document.getElementById("text").innerHTML = display;
}

/* CALCULATE */
function calculate() {
  let typed = document.getElementById("input").value;

  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === text[i]) correct++;
  }

  let accuracy = Math.round((correct / text.length) * 100);
  let wpm = Math.round(typed.length / 5);

  user.wpm = wpm;
  saveUser();

  document.getElementById("wpm").innerText = wpm;
  document.getElementById("accuracy").innerText = accuracy;
}

/* SAVE */
function saveUser() {
  localStorage.setItem("currentUser", JSON.stringify(user));

  let users = JSON.parse(localStorage.getItem("users"));
  let index = users.findIndex(u => u.email === user.email);
  users[index] = user;

  localStorage.setItem("users", JSON.stringify(users));
}