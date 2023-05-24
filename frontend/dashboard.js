const token = JSON.parse(localStorage.getItem("token"));
if (!token) window.location.href = "/";
