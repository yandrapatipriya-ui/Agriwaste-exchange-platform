async function submitWaste() {
  const wasteType = document.getElementById("wasteType").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;
  const image = document.getElementById("image").files[0];
  const email = localStorage.getItem("email");

  const formData = new FormData();
  formData.append("wasteType", wasteType);
  formData.append("quantity", quantity);
  formData.append("location", location);
  formData.append("image", image);
  formData.append("email", email);

  const response = await fetch("http://localhost:5000/api/waste/add", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  alert(data.message);
  window.location.href = "farmer-dashboard.html";
}

function goBack() {
  window.location.href = "farmer-dashboard.html";
}
