
const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Get values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        // Send data to backend
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        // Convert response into JSON
        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            // Redirect to login page
            window.location.href = "index.html";

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.error("Error:", error);
        alert("Unable to connect to server!");

    }

});
