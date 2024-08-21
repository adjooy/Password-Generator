document.addEventListener('DOMContentLoaded', function () {
  const historyContent = document.getElementById('history-content');
  const closeButton = document.getElementById('close-button');
  const clearButton = document.getElementById('clear-button');

  function displayHistory() {
      let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
      const historyTable = document.getElementById('history-table');
      historyTable.innerHTML = `
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Password</th>
              </tr>
          </thead>
          <tbody>
          </tbody>
      `;
      const tbody = historyTable.querySelector('tbody');

      history.forEach(entry => {
          const row = document.createElement('tr');
          const dateCell = document.createElement('td');
          const timeCell = document.createElement('td');
          const passwordCell = document.createElement('td');

          const date = new Date(entry.timestamp);
          dateCell.textContent = date.toLocaleDateString();
          timeCell.textContent = date.toLocaleTimeString();
          passwordCell.textContent = entry.password;

          row.appendChild(dateCell);
          row.appendChild(timeCell);
          row.appendChild(passwordCell);

          tbody.appendChild(row);
      });
  }

  displayHistory();

  closeButton.addEventListener('click', function () {
      window.close();
  });

  clearButton.addEventListener('click', function () {
      localStorage.removeItem('passwordHistory');
      displayHistory();  // Refresh history after clearing
  });
});
