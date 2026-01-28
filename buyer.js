function showWastes() {
  const type = document.getElementById("wasteType").value;
  const cards = document.getElementById("cards");

  cards.innerHTML = "";

  if (type === "") return;

  const wasteData = {
    leaf: [
      { img: "C:\\Users\\yandr\\Downloads\\leaf1.jpg", qty: "40 kg", place: "Guntur" },
      { img: "C:\\Users\\yandr\\OneDrive\\Desktop\\E2E project\\Agri-Waste-Exchange\\frontend\\images", qty: "55 kg", place: "Vijayawada" }
    ],

    paddy: [
      // Updated to use URL instead of local image
      { img: "https://pixabay.com/images/download/straw-2916806_1920.jpg", qty: "60 kg", place: "Krishna" },
      { img: "https://pixabay.com/images/download/straw-2916806_1920.jpg", qty: "120 kg", place: "West Godavari" }
    ],

    stem: [
      { img: "../images/stem1.jpg", qty: "30 kg", place: "Nellore" },
      { img: "../images/stem2.jpg", qty: "45 kg", place: "Kadapa" }
    ],

    husk: [
      { img: "../images/husk1.jpg", qty: "100 kg", place: "West Godavari" },
      { img: "../images/husk2.jpg", qty: "150 kg", place: "Rajahmundry" }
    ],

    sugarcane: [
      { img: "../images/sugarcane1.jpg", qty: "70 kg", place: "Chittoor" },
      { img: "../images/sugarcane2.jpg", qty: "90 kg", place: "Tirupati" }
    ]
  };

  wasteData[type].forEach(w => {
    cards.innerHTML += `
      <div class="card">
        <img src="${w.img}" alt="Waste Image">
        <div class="card-content">
          <h4>${type.toUpperCase()} WASTE</h4>
          <p><b>Quantity:</b> ${w.qty}</p>
          <p><b>Location:</b> ${w.place}</p>
          <button onclick="contactFarmer()">Contact Farmer</button>
        </div>
      </div>
    `;
  });
}

function contactFarmer() {
  alert("Farmer contact request sent (Frontend Demo)");
}

