document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');
  const generateButton = document.getElementById('generate');
  const passwordField = document.getElementById('password');
  const historyButton = document.getElementById('history-button');
  const historyView = document.getElementById('history-view');
  const backButton = document.getElementById('back-button');
  const historyContent = document.getElementById('history-content');
  const clearHistoryButton = document.getElementById('clear-history-button');

  // Initialize variables
  let currentPassword = '';
  let lastCopiedPassword = '';

  // Initialize default settings for checkboxes
  document.getElementById('uppercase').checked = true;
  document.getElementById('lowercase').checked = true;
  document.getElementById('numbers').checked = true;
  document.getElementById('symbols').checked = true;

  // Update password length display
  lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = this.value;
  });

  // Function to generate a random password
  function generatePassword(length) {
    const uppercaseChecked = document.getElementById('uppercase').checked;
    const lowercaseChecked = document.getElementById('lowercase').checked;
    const numbersChecked = document.getElementById('numbers').checked;
    const symbolsChecked = document.getElementById('symbols').checked;

    let chars = '';
    if (uppercaseChecked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercaseChecked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbersChecked) chars += '0123456789';
    if (symbolsChecked) chars += '!@$%^&*()-_=+{}[]\\|:;"<>,.?/';

    if (chars.length === 0) return ''; // No character sets selected

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }

  // Function to save password to history
  function saveToHistory(password) {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    const now = new Date();
    history.push({
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      password: password
    });
    localStorage.setItem('passwordHistory', JSON.stringify(history));
    updateHistoryTable();
  }

  // Function to update the history display
  function updateHistoryTable() {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    historyContent.innerHTML = '';
    history.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.time}</td>
        <td>${entry.password}</td>
      `;
      historyContent.appendChild(row);
    });
  }

  // Generate a password when the Generate button is clicked
  generateButton.addEventListener('click', function () {
    const length = parseInt(lengthSlider.value, 10);
    currentPassword = generatePassword(length);
    passwordField.value = currentPassword;
    lastCopiedPassword = ''; // Reset last copied password on new generation
  });

  // Copy the password to clipboard and save to history only once
  document.getElementById('copy').addEventListener('click', function () {
    passwordField.select();
    document.execCommand('copy');

    if (currentPassword && currentPassword !== lastCopiedPassword) {
      saveToHistory(currentPassword);
      lastCopiedPassword = currentPassword; // Update last copied password
    }
  });

  // Show history view
  historyButton.addEventListener('click', function () {
    document.getElementById('password-view').style.display = 'none';
    historyView.style.display = 'block';
  });

  // Go back to the main view
  backButton.addEventListener('click', function () {
    historyView.style.display = 'none';
    document.getElementById('password-view').style.display = 'block';
  });

  // Clear history
  clearHistoryButton.addEventListener('click', function () {
    localStorage.removeItem('passwordHistory');
    historyContent.innerHTML = '';
  });

  // Generate an initial random password on page load
  const initialPassword = generatePassword(12);
  passwordField.value = initialPassword;
  currentPassword = initialPassword;
  lastCopiedPassword = ''; // Initialize last copied password

  // Initialize history table on load
  updateHistoryTable();
});
