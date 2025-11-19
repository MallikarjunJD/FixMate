// Example for buttons - show simple alerts (expand as needed)
document.getElementById('get-quote-btn').onclick = function() {
    alert('Quote request sent!');
};
document.getElementById('contact-us-btn').onclick = function() {
    alert('We will contact you soon.');
};
// Add more JavaScript functionality as required.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields (Name and Email).');
                return;
            }

            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Here you would add code to send the form data to a server
            alert('Form submitted successfully!');
            form.reset();
        });
    }

    // Optional: Add a simple carousel functionality to the reviews if needed
    // This is a more advanced feature and would require more code.
    // The current CSS makes the reviews horizontally scrollable.
});