// Get current user
let user = JSON.parse(localStorage.getItem("currentUser"));

// Safety check
if (!user) {
  alert("Please login again");
  window.location = "index.html";
}

// Show user info
document.getElementById("info").innerText =
  `${user.name} | WPM: ${user.wpm}`;

// Ensure tasks exist
if (!user.tasks) {
  user.tasks = [];
}

// Ensure chart data exists
if (!user.chartData) {
  user.chartData = [];
}

// Store timer intervals
let intervals = {};

/* ➕ ADD TASK */
function addTask() {
  let task = document.getElementById("task").value;
  let date = document.getElementById("date").value;
  let duration = document.getElementById("duration").value;

  if (!task || !date || !duration) {
    alert("Fill all fields");
    return;
  }

  user.tasks.push({
    task,
    date,
    duration: parseInt(duration),
    timeLeft: duration * 60,
    running: false
  });

  save();
  render();
}

/* ▶ START TIMER */
function startTimer(i) {
  let t = user.tasks[i];

  if (intervals[i]) return;

  intervals[i] = setInterval(() => {
    if (t.timeLeft > 0) {
      t.timeLeft--;
    } else {
      clearInterval(intervals[i]);
      delete intervals[i];
      alert("Task Completed!");
    }
    save();
    render();
  }, 1000);
}

/* ⏸ STOP TIMER */
function stopTimer(i) {
  clearInterval(intervals[i]);
  delete intervals[i];
}

/* ❌ DELETE TASK */
function deleteTask(i) {
  stopTimer(i);
  user.tasks.splice(i, 1);
  save();
  render();
}

/* 🔄 RENDER TASKS */
function render() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  user.tasks.forEach((t, i) => {
    let mins = Math.floor(t.timeLeft / 60);
    let secs = t.timeLeft % 60;

    list.innerHTML += `
      <li>
        ${t.task} (${t.date}) ⏱ ${mins}:${secs}
        <button onclick="startTimer(${i})">▶Start</button>
        <button onclick="stopTimer(${i})">⏸Stop</button>
        <button onclick="deleteTask(${i})">❌Delete</button>
      </li>`;
  });
}

/* 💾 SAVE USER */
function save() {
  localStorage.setItem("currentUser", JSON.stringify(user));

  let users = JSON.parse(localStorage.getItem("users"));
  let index = users.findIndex(u => u.email === user.email);
  users[index] = user;

  localStorage.setItem("users", JSON.stringify(users));
}

/* 📊 CHART SECTION */
window.onload = function () {

  // Add WPM only if valid
  if (user.wpm > 0) {
    user.chartData.push(user.wpm);
    save();
  }

  let ctx = document.getElementById("chart");

  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: user.chartData.map((_, i) => "Test " + (i + 1)),
      datasets: [{
        label: "WPM Progress",
        data: user.chartData,
        borderWidth: 2
      }]
    }
  });

};

/* 🚪 LOGOUT */
function logout() {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
}

/* INITIAL RENDER */
render();