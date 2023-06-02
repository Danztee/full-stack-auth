const _name = document.getElementById("name");
const _email = document.getElementById("email");

const product_name = document.getElementById("product_name");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const submitPaymentBtn = document.getElementById("submit-payment");

const uploadBtn = document.getElementById("upload");
const image = document.getElementById("pic-file");

const logout = document.getElementById("logout");

const pic_container = document.getElementById("pic");
const picture = document.getElementById("picture");

let profilePicture;
let pictureName;

const token = JSON.parse(localStorage.getItem("token"));

if (!token) window.location.href = "/";

const uploadPicture = async (e) => {
  e.preventDefault();

  if (!profilePicture || !pictureName) return alert("Please select a picture");

  const payload = {
    picture: profilePicture,
    name: pictureName,
  };

  const res = await fetch("http://localhost:8000/api/upload-picture", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log(data);
};

image.addEventListener("change", (e) => {
  const reader = new FileReader();

  const _image = e.target.files[0];

  pictureName = _image.name;
  reader.onload = (e) => {
    profilePicture = e.target.result;
    picture.src = profilePicture;
    pic_container.style.display = "block";
  };

  reader.readAsDataURL(_image);
});

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

const makePayment = async (e) => {
  e.preventDefault();
  const payload = {
    product_name: product_name.value,
    price: price.value,
    quantity: quantity.value,
  };

  const res = await fetch("http://localhost:8000/api/make-payment", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log(data);

  if (!data.url) return;

  var url = data.url;
  var newTab = window.open(url, "_blank");
  newTab.focus();
};

submitPaymentBtn.addEventListener("click", makePayment);
uploadBtn.addEventListener("click", uploadPicture);
