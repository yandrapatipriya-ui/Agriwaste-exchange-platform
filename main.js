function login() {
    const type = document.getElementById("userType").value;

    if (type === "Farmer") {
        window.location.href = "farmer/add-waste.html";
    } 
    else if (type === "Buyer") {
        window.location.href = "buyer/buyer-dashboard.html";
    } 
    else if (type === "Admin") {
        window.location.href = "admin/admin-dashboard.html";
    }
}

function register() {
    alert("Registration successful. Please login.");
    window.location.href = "login.html";
}

function addWaste() {
    alert("Waste added successfully (Frontend demo)");
}
