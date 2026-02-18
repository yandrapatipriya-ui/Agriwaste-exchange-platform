async function loadDashboard() {
  const email = localStorage.getItem("email");
  
  // Load Waste Posts
  const wasteResponse = await fetch(`http://localhost:5000/api/waste/farmer/${email}`);
  const wastes = await wasteResponse.json();
  const postList = document.getElementById("postList");
  postList.innerHTML = "";
  
  document.getElementById("statTotalPosts").innerText = wastes.length;

  if (wastes.length === 0) postList.innerHTML = "<p>No posts yet. Start by adding your first waste listing.</p>";
  wastes.forEach(w => {
    postList.innerHTML += `
      <div class="classic-card">
        <img src="http://localhost:5000/uploads/${w.image}" alt="${w.wasteType}">
        <div class="card-body">
          <h4 style="margin:0; color:var(--primary-color);">${w.wasteType.toUpperCase()}</h4>
          <p style="margin:5px 0;"><b>Quantity:</b> ${w.quantity} kg</p>
          <p style="margin:5px 0; color:#666; font-size:0.9rem;">📍 ${w.location}</p>
        </div>
      </div>
    `;
  });

  // Load Requests
  const requestResponse = await fetch(`http://localhost:5000/api/request/farmer/${email}`);
  const requests = await requestResponse.json();
  const requestList = document.getElementById("requestList");
  
  const pending = requests.filter(r => r.status === "Pending").length;
  const approved = requests.filter(r => r.status === "Approved").length;
  document.getElementById("statPendingRequests").innerText = pending;
  document.getElementById("statApprovedRequests").innerText = approved;

  requestList.innerHTML = "";
  if (requests.length === 0) requestList.innerHTML = "<p>No requests received yet.</p>";
  requests.forEach(r => {
    requestList.innerHTML += `
      <div class="classic-card">
        <div class="card-body">
          <span class="badge badge-${r.status.toLowerCase()}">${r.status}</span>
          <h4 style="margin:10px 0 5px;">Request from Buyer</h4>
          <p style="margin:0; font-size:0.9rem;"><b>Email:</b> ${r.buyerEmail}</p>
          <p style="margin:5px 0 15px; font-size:0.9rem;"><b>Waste:</b> ${r.wasteType}</p>
          ${r.status === 'Pending' ? `
            <div style="display:flex; gap:10px;">
              <button onclick="updateStatus('${r._id}', 'Approved')" class="btn-primary" style="padding:5px; font-size:0.9rem;">Approve</button>
              <button onclick="updateStatus('${r._id}', 'Rejected')" class="btn-primary" style="background:#e74c3c; padding:5px; font-size:0.9rem;">Reject</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/api/request/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  loadDashboard();
}

function addWaste() {
  window.location.href = "add-waste.html";
}

window.onload = loadDashboard;
