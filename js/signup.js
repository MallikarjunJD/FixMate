document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Later this will POST to backend
    alert("Signup successful (dummy). Backend integration pending.");

    // Redirect back to login
    window.location.href = "login.html";
});
