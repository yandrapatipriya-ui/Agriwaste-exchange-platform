async function loadStats() {
  const userResponse = await fetch("http://localhost:5000/api/auth/users");
  const users = await userResponse.json();
  
  const wasteResponse = await fetch("http://localhost:5000/api/waste/all");
  const wastes = await wasteResponse.json();

  document.getElementById("statTotalFarmers").innerText = users.filter(u => u.role === "Farmer").length;
  document.getElementById("statTotalBuyers").innerText = users.filter(u => u.role === "Buyer").length;
  document.getElementById("statTotalWastes").innerText = wastes.length;
}

async function viewUsers(role) {
  const response = await fetch("http://localhost:5000/api/auth/users");
  const users = await response.json();
  const filteredUsers = users.filter(u => u.role === role);

  const content = document.getElementById("adminContent");
  content.innerHTML = `<h2>Manage ${role}s</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="userTableBody"></tbody>
    </table>`;

  const tbody = document.getElementById("userTableBody");
  filteredUsers.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.phone || 'N/A'}</td>
        <td><button class="btn-primary" style="background:#e74c3c; padding:5px 10px; width:auto;" onclick="deleteUser('${u._id}')">Remove</button></td>
      </tr>
    `;
  });
}

async function viewWastes() {
  const response = await fetch("http://localhost:5000/api/waste/all");
  const wastes = await response.json();

  const content = document.getElementById("adminContent");
  content.innerHTML = `<h2>Waste Listings Monitoring</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Quantity</th>
          <th>Location</th>
          <th>Farmer Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="wasteTableBody"></tbody>
    </table>`;

  const tbody = document.getElementById("wasteTableBody");
  wastes.forEach(w => {
    tbody.innerHTML += `
      <tr>
        <td>${w.wasteType}</td>
        <td>${w.quantity} kg</td>
        <td>${w.location}</td>
        <td>${w.farmerEmail}</td>
        <td><button class="btn-primary" style="background:#e74c3c; padding:5px 10px; width:auto;" onclick="deleteWaste('${w._id}')">Delete</button></td>
      </tr>
    `;
  });
}

async function deleteUser(id) {
  if (confirm("Permanently remove this user?")) {
    await fetch(`http://localhost:5000/api/auth/user/${id}`, { method: "DELETE" });
    loadStats();
    viewUsers('Farmer');
  }
}

async function deleteWaste(id) {
  if (confirm("Delete this waste listing?")) {
    await fetch(`http://localhost:5000/api/waste/delete/${id}`, { method: "DELETE" });
    loadStats();
    viewWastes();
  }
}

window.onload = loadStats;
