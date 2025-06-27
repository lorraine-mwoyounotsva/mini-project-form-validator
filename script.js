const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const requiredValid = checkRequired([username, email, password, confirmPassword]);
  if (!requiredValid) return;

  const validUsername = checkLength(username, 3, 15);
  const validEmail = validateEmail(email);
  const validPassword = checkLength(password, 6, 20);
  const match = matchPasswords(password, confirmPassword);

  if (validUsername && validEmail && validPassword && match) {
    alert("Registration Successful!");
    form.reset();
    clearStatus();
  }
});

function showError(input, message) {
  const group = input.parentElement;
  group.classList.remove('success');
  group.classList.add('error');
  group.querySelector('small').textContent = message;
}

function showSuccess(input) {
  const group = input.parentElement;
  group.classList.remove('error');
  group.classList.add('success');
  group.querySelector('small').textContent = '';
}

function checkRequired(inputs) {
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      allFilled = false;
    } else {
      showSuccess(input);
    }
  });
  return allFilled;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function validateEmail(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Please enter a valid email address');
    return false;
  }
}

function matchPasswords(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, "Passwords do not match");
    return false;
  } else {
    showSuccess(p2);
    return true;
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function clearStatus() {
  document.querySelectorAll('.input-row').forEach(row => {
    row.classList.remove('success', 'error');
  });
}
