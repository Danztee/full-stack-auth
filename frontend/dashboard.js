const _name = document.getElementById("name");
const _email = document.getElementById("email");

const logout = document.getElementById("logout");

const token = JSON.parse(localStorage.getItem("token"));

if (!token) window.location.href = "/";

const getMe = async () => {
  const response = await fetch("http://localhost:8000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { user } = await response.json();

  if (!user) return;

  _name.textContent = user.firstName + " " + user.lastName;
  _email.textContent = user.email;
};

getMe();

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/";
});
