document.addEventListener('DOMContentLoaded', function () {
    const historyContent = document.getElementById('history-content');
    const closeButton = document.getElementById('close-button');
  
    // Function to display password history
    function displayHistory() {
      let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
      historyContent.innerHTML = '';
      history.forEach(entry => {
        const div = document.createElement('div');
        div.textContent = `${entry.timestamp}: ${entry.password}`;
        historyContent.appendChild(div);
      });
    }
  
    // Display history on page load
    displayHistory();
  
    // Close button to go back to the extension popup
    closeButton.addEventListener('click', function () {
      window.close(); // Close the history page
    });
  });
  