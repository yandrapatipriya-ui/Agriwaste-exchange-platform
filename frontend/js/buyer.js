async function showWastes() {
  const type = document.getElementById("wasteType").value;
  const locationSearch = document.getElementById("searchLocation").value.toLowerCase();
  const cards = document.getElementById("cards");

  cards.innerHTML = "<p>Loading listings...</p>";

  try {
    const response = await fetch("http://localhost:5000/api/waste/all");
    const wastes = await response.json();

    let filteredWastes = wastes;
    if (type !== "") {
      filteredWastes = filteredWastes.filter(w => w.wasteType.toLowerCase() === type.toLowerCase());
    }
    if (locationSearch !== "") {
      filteredWastes = filteredWastes.filter(w => w.location.toLowerCase().includes(locationSearch));
    }

    cards.innerHTML = "";
    if (filteredWastes.length === 0) {
      cards.innerHTML = "<p>No matching waste listings found.</p>";
      return;
    }

    filteredWastes.forEach(w => {
      cards.innerHTML += `
        <div class="classic-card">
          <img src="http://localhost:5000/uploads/${w.image}" alt="${w.wasteType}">
          <div class="card-body">
            <h4 style="margin:0; color:var(--primary-color);">${w.wasteType.toUpperCase()}</h4>
            <p style="margin:5px 0;"><b>Quantity:</b> ${w.quantity} kg</p>
            <p style="margin:5px 0; color:#666; font-size:0.9rem;">📍 ${w.location}</p>
            <button class="btn-primary" onclick="sendRequest('${w._id}', '${w.farmerEmail}', '${w.wasteType}')" style="margin-top:10px;">Send Request</button>
          </div>
        </div>
      `;
    });
  } catch (error) {
    cards.innerHTML = "<p>Error loading listings. Please try again later.</p>";
  }
}

async function sendRequest(wasteId, farmerEmail, wasteType) {
  const buyerEmail = localStorage.getItem("email");
  if (!buyerEmail) {
    alert("Please login first");
    return;
  }

  const response = await fetch("http://localhost:5000/api/request/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wasteId, buyerEmail, farmerEmail, wasteType })
  });

  const result = await response.json();
  alert(result.message);
  loadRequests();
}

window.onload = () => {
  showWastes();
  loadRequests();
};
