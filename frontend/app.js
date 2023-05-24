const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const loginButton = document.getElementById("login_button");

loginButton?.addEventListener("click", async () => {
  const payload = {
    email: login_email.value,
    password: login_password.value,
  };

  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) return alert("incorrect data");

  const data = await response.json();
  localStorage.setItem("token", JSON.stringify(data.token));
  alert(data.message);
  window.location.href = "/dashboard.html";
});
