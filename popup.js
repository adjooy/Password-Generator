document.addEventListener('DOMContentLoaded', function() {
  const passwordField = document.getElementById('password');
  const generateButton = document.getElementById('generate');

  // Function to generate a random password
  function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  // Set initial password length
  const passwordLength = 12; // Fixed length of 12 characters

  // Generate and display the password when the page is loaded
  passwordField.textContent = generatePassword(passwordLength);

  // Generate a new password when the button is clicked
  generateButton.addEventListener('click', function() {
    passwordField.textContent = generatePassword(passwordLength);
  });

  // Copy password to clipboard
  document.getElementById('copy').addEventListener('click', function() {
    navigator.clipboard.writeText(passwordField.textContent)
      .then(() => alert('Password copied to clipboard'))
      .catch(err => console.error('Failed to copy password: ', err));
  });

  // Contact button
  document.getElementById('contact-button').addEventListener('click', function() {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adjooy@gmail.com', '_blank');
  });
});
