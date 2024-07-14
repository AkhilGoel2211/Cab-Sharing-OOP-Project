// script.js

document.querySelectorAll('input[name="role"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    var value = event.target.value;
    if (value === "driver") {
      document.getElementById("driver-details").classList.remove("hidden");
    } else {
      document.getElementById("driver-details").classList.add("hidden");
    }
  });
});

function validateForm() {
  const phone = document.getElementById("phone").value;
  const name = document.getElementById("name").value;
  if (phone === "" || name === "") {
    alert("All fields are required!");
    return false;
  }
  return true;
}

function signup() {
  if (validateForm()) {
    var role = document.querySelector('input[name="role"]:checked').value;
    if (role === "driver") {
      // Handle driver signup
    } else {
      // Handle rider signup
    }
  }
}

function showScreen(screenId) {
  const screens = [
    "ride-search-screen",
    "ride-list-screen",
    "create-ride-screen",
  ];
  screens.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(screenId).classList.remove("hidden");
}
