function validateForm(event) {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById("username").value;
  if (username.length < 5) {
    alert("Username must be at least 5 characters long.");
    return false;
  } else {
    alert("Form submitted succesfully");
    return true;
  }

  const password = document.getElementById("password").value;
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  } else {
    alert("Form submitted succesfully");
    return true;
  }
}
