"use strict";
const loginError = (data) => {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    const nameContainer = document.querySelector(`${data.container}`);
    errorDiv.textContent = data.message;
    nameContainer.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 3000);
};
const login = () => {
    const email = document.querySelector("#loginForm #email");
    const password = document.querySelector("#loginForm #password");
    if (email.value === "") {
        loginError({
            container: "#loginForm .email",
            message: "Email is required",
        });
    }
    if (password.value === "") {
        loginError({
            container: "#loginForm .password",
            message: "Password is required",
        });
    }
    const user = { email: email.value, password: password.value };
    if (user.email !== "" &&
        user.password !== "" &&
        (user.email !== "eloi.chrysanthe@gmail.com" || user.password !== "123456")) {
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = "Failed! Email and password doesn't match";
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    if (user.email === "eloi.chrysanthe@gmail.com" &&
        user.password === "123456") {
        setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(user.email));
            window.location.href = "./dashboard/index.html";
        }, 1500);
    }
};
window.addEventListener("DOMContentLoaded", () => {
    const currentMode = localStorage.getItem("light-theme");
    if (currentMode === "light") {
        console.log(currentMode);
        document.documentElement.classList.toggle("light-theme");
    }
});
