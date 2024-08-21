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
  const contactButton = document.getElementById('contact-button');  

  // Initialize the password length value  
  let passwordLength = parseInt(lengthSlider.value, 10);  
  lengthValue.textContent = passwordLength;  

  // Update the password length display when the slider changes  
  lengthSlider.addEventListener('input', function () {  
    passwordLength = parseInt(this.value, 10);  
    lengthValue.textContent = passwordLength;  
  });  

  // Function to generate a random password  
  function generatePassword(length) {  
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$%^&*()-_=+{}[]\|:;"<>,.?/';  
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

  let currentPassword = '';  

  // Generate a password when the Generate button is clicked  
  generateButton.addEventListener('click', function () {  
    currentPassword = generatePassword(passwordLength);  
    passwordField.value = currentPassword;  
  });  

  // Copy the password to clipboard and save to history  
  document.getElementById('copy').addEventListener('click', function () {  
    passwordField.select();  
    document.execCommand('copy');  
    saveToHistory(currentPassword); // Save the password to history only when copied  
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
  currentPassword = initialPassword; // Update currentPassword to initial  

  // Initialize history table on load  
  updateHistoryTable();  
});
