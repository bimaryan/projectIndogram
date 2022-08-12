let usernameInput = document.getElementById('usernameInput');
let passwordInput = document.getElementById('passwordInput');
let usernameRegister = document.getElementById('usernameRegister');
let passwordRegister = document.getElementById('passwordRegister');
let reapeatpasswordRegister = document.getElementById('repeat-passwordRegister');

let loginButton = document.getElementById('loginButton');
let logoutButton = document.getElementById('logoutButton');
let registerButton = document.getElementById('registerButton');

function Register() {
  localStorage.setItem("username", usernameRegister.value);
  localStorage.setItem("password", passwordRegister.value);
}
function Login() {
  if (usernameInput.value == "admin" && passwordInput.value == "123") {
    alert('Login Sebagai Admin');
    window.location.href = "home.html"
  }
  else if (usernameInput.value == localStorage.getItem("username") && passwordInput.value == localStorage.getItem("password")) {
    window.location.href = "home.html";
  }
  else {
    alert('username/password mu belom dimasukkin blok');
  }
}
