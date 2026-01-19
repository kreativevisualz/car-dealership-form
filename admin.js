const tableBody = document.getElementById('adminTableBody');
const SHEET_CSV_URL = "YOUR_PUBLISHED_CSV_LINK_HERE";

fetch(SHEET_CSV_URL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n").slice(1, 16); // skip header, take first 15
    rows.forEach((row, index) => {
      const cols = row.split(",");
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${cols[0]}</td>
        <td>${cols[1]}</td>
        <td>${cols[2]}</td>
        <td>${cols[3]}</td>
      `;
      tableBody.appendChild(tr);
    });
  })
  .catch(err => console.error("Error fetching sheet data:", err));


  fetch("https://script.google.com/macros/s/AKfycbzL1vgwf-3PN_FwaSPmmlRUDmrx1ZrSCgx360OurtGtAtKGXGQfEuY2bLBSVEjg9kAI/exec")
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#adminTable tbody");

    data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.timestamp}</td>
        <td>${entry.fullNames}</td>
        <td>${entry.cellphone}</td>
        <td>${entry.maritalStatus}</td>
        <td>${entry.occupation}</td>
        <td>R ${entry.grossIncome}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error("Admin fetch error:", err));
