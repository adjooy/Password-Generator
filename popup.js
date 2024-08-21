document.getElementById('generate').addEventListener('click', () => {
  const length = document.getElementById('length').value;

  const password = generatePassword(length);
  document.getElementById('password').value = password;
});

document.getElementById('copy').addEventListener('click', () => {
  const passwordField = document.getElementById('password');
  
  passwordField.select();
  document.execCommand('copy');
  
  alert('Password copied to clipboard!');
});

// Update length display when slider value changes
document.getElementById('length').addEventListener('input', () => {
  const lengthValue = document.getElementById('length').value;
  document.getElementById('lengthValue').textContent = lengthValue;
});

function generatePassword(length) {
  // Define a charset with fewer symbols
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
