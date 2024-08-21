document.addEventListener('DOMContentLoaded', function () {
  const lengthInput = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');
  const passwordOutput = document.getElementById('password');
  const generateButton = document.getElementById('generate');
  const copyButton = document.getElementById('copy');

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

  // Function to update password display
  function updatePassword() {
    const length = parseInt(lengthInput.value, 10);
    const password = generatePassword(length);
    passwordOutput.value = password;
  }

  // Set initial password length and generate a password on load
  const initialLength = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
  lengthInput.value = initialLength;
  lengthValue.textContent = initialLength;
  updatePassword();

  // Update password length display when slider value changes
  lengthInput.addEventListener('input', function () {
    lengthValue.textContent = lengthInput.value;
  });

  // Regenerate password on button click
  generateButton.addEventListener('click', updatePassword);

  // Copy password to clipboard
  copyButton.addEventListener('click', function () {
    passwordOutput.select();
    document.execCommand('copy');
  });
});
