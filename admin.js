// Use the SAME URL you used in your script.js for the form submission
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2BfTGtaq5WtXDuQP8kA0lX4PLlaK2q26jpSNf3VEEDwur1oMPH9ztv84d7pOatZEi/exec";

const tableBody = document.getElementById('adminTableBody');

function loadAdminData() {
  // Show a "Loading..." message in the table
  tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading recent submissions...</td></tr>';

  fetch(SCRIPT_URL)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      // Clear the loading message
      tableBody.innerHTML = "";

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No submissions found.</td></tr>';
        return;
      }

      // Loop through the data and create rows
      data.forEach(entry => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${entry.timestamp || 'N/A'}</td>
          <td>${entry.fullNames || 'N/A'}</td>
          <td>${entry.cellphone || 'N/A'}</td>
          <td>${entry.maritalStatus || 'N/A'}</td>
          <td>${entry.occupation || 'N/A'}</td>
          <td>R ${entry.grossIncome || '0'}</td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Admin fetch error:", err);
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: red;">Error loading data. Make sure the script is deployed as "Anyone".</td></tr>';
    });
}

// Run the function when the page loads
loadAdminData();