const API_URL = "http://localhost:5000/api/auth";

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value
        };

        try {

            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
            );

            const data = await response.json();

            document.getElementById(
                "registerMessage"
            ).innerText = data.message;

            if (data.success) {

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

            }

        } catch (error) {

            document.getElementById(
                "registerMessage"
            ).innerText = error.message;

        }

    });

}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        };

        try {

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            );

            const data = await response.json();

            if (data.success) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                window.location.href = "index.html";

            } else {

                document.getElementById(
                    "loginMessage"
                ).innerText = data.message;

            }

        } catch (error) {

            document.getElementById(
                "loginMessage"
            ).innerText = error.message;

        }

    });

}

// LOGOUT

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}