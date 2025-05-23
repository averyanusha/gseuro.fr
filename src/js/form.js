document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
  const email = document.getElementById('mail');
  const phone = document.getElementById('phone');
  const emailError = document.querySelector('#mail + span.error');
  const phoneError = document.querySelector('#phone + span.error');

  form.addEventListener('submit', (event) => {
    // Reset errors
    emailError.textContent = '';
    phoneError.textContent = '';
    
    let hasErrors = false;
    
    if (!email.validity.valid) {
      showEmailError();
      hasErrors = true;
    }
    
    if (!phone.validity.valid) {
      showPhoneError();
      hasErrors = true;
    }
    
    if (hasErrors) {
      event.preventDefault();
      return;
    }
    
    // Optional: if you want to handle the form submission with AJAX instead
    // Uncomment this code and add a "return false" after it
    /*
    event.preventDefault();
    
    const formData = new FormData(form);
    
    fetch('/submit-form', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        result.innerHTML = '<p>Form submitted successfully!</p>';
        form.reset();
      } else {
        result.innerHTML = '<p>Error submitting form. Please try again.</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      result.innerHTML = '<p>An error occurred. Please try again later.</p>';
    });
    */
  });

  function showEmailError() {
    if (email.validity.valueMissing) {
      emailError.classList.add("visible");
      emailError.textContent = "Veuillez remplir ce champ!";
    } else if (email.validity.typeMismatch) {
      emailError.classList.add("visible");
      emailError.textContent = "Veuillez renseigner une adresse email valide!";
    }
  }

  function showPhoneError() {
    if (phone.validity.valueMissing) {
      phoneError.classList.add("visible");
      phoneError.textContent = "Veuillez remplir ce champ!";
    } else if (phone.validity.patternMismatch) {
      phoneError.classList.add("visible");
      phoneError.textContent = "Veuillez renseigner un numéro de téléphone valide!";
    }
  }
});
// form.addEventListener('submit', function(e) {
//     const formData = new FormData(form);
//     e.preventDefault();

//     const object = Object.fromEntries(formData);
//     const json = JSON.stringify(object);

//     result.innerHTML = "Attendez qulques instants..."

//     fetch('https://api.web3forms.com/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: json
//         })
//         .then(async (response) => {
//             let json = await response.json();
//             if (response.status == 200) {
//                 result.innerHTML = json.message;
//             } else {
//                 console.log(response);
//                 result.innerHTML = json.message;
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             result.innerHTML = "Something went wrong!";
//         })
//         .then(function() {
//             form.reset();
//             setTimeout(() => {
//                 result.style.display = "none";
//             }, 3000);
//         });
// });
