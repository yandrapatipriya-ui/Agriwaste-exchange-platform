function showRegister() {
  document.getElementById("title").innerText = "Register";

  document.getElementById("name").style.display = "block";
  document.getElementById("phone").style.display = "block";

  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("registerBtn").style.display = "block";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("userType").value;

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    if (role === "Farmer") {
      window.location.href = "farmer/farmer-dashboard.html";
    } else if (role === "Buyer") {
      window.location.href = "buyer/buyer-dashboard.html";
    } else {
      window.location.href = "admin/admin-dashboard.html";
    }
  } else {
    alert("Invalid credentials");
  }
}

async function register() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("userType").value;

  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email, password, role })
  });

  const data = await response.json();
  alert(data.message);
  location.reload();
}

function forgotPassword() {
  alert("Password reset link sent to email (Demo)");
}
