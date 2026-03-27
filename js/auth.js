function signup() {
  let name = nameInput();
  let email = emailInput();
  let password = passwordInput();

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("User exists");
    return;
  }

  users.push({
    name, email, password,
    wpm: 0,
    tasks: [],chartData:[]
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup success");
  window.location = "index.html";
}

function login() {
  let email = emailInput();
  let password = passwordInput();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert("Invalid login");

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location = "dashboard.html";
}

function emailInput() {
  return document.getElementById("email").value;
}
function passwordInput() {
  return document.getElementById("password").value;
}
function nameInput() {
  let el = document.getElementById("name");
  return el ? el.value : "";
}