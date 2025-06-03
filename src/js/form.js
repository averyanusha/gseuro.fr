const form = document.getElementById("form");
const button = document.getElementById("form-button");

form.noValidate = true;

form.addEventListener("submit", validateForm);

function checkName (name, errorElement) {
  const nameInput = name.value.trim();
  if (nameInput === "") {
    displayError(name, errorElement, "Nom requis");
    return false;
  }
  if (nameInput.lenght < 2) {
    displayError(name, errorElement, "Le nom doit contenir plus de 2 caractères");
    return false;
  }
  displayError(name, errorElement);
  return true;
}

function checkEmail (email, errorElement) {
  const emailInput = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput === "") {
    displayError(email, errorElement, "Veuillez fournir un email valide");
    return false;
  }
  if (!emailRegex.test(emailInput)){
    displayError(email, errorElement, "Le format de l'email n'est pas correct");
    return false;
  }
  displayError(email, errorElement);
  return true;
}

function checkPhone (phone, errorElement) {
  const phoneInput = phone.value.trim();
  const phoneRegex = /^(?:(?:\+|00)33[\s.-]?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/;
  if (phoneInput === ""){
    displayError(phone, errorElement, "Veuillez fournir un numéro de téléphone");
    return false;
  }
  if (!phoneRegex.test(phoneInput)){
    displayError(phone, errorElement, "Le format du numéro de téléphone n'est pas correct");
    return false;
  }
  displayError(phone, errorElement);
  return true;
}

function displayError (name, errorElement, message) {
  if (message) {
    name.classList.add("invalid");
    errorElement.textContent = message;
  } else {
    name.classList.remove("invalid");
    errorElement.textContent = "";
  }
}

function validateForm(e){
  e.preventDefault();
  const form = e.target;
  let formIsValid = true;

  const name = document.getElementById("first-second-name");
  const nameError = document.getElementById("name-error");
  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phone-error");
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  if (!form.checkValidity) {
    formIsValid = false;
  }

  if (!checkName(name, nameError)){
    formIsValid = false;
  }
  if (!checkEmail(email, emailError)){
    formIsValid = false;
  }
  if (!checkPhone(phone, phoneError)) {
    formIsValid = false;
  }
  if (formIsValid) {
    form.submit();
  }
}