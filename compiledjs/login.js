"use strict";
const login = () => {
    const email = document.querySelector("#loginForm #email");
    const password = document.querySelector("#loginForm #password");
    const user = { email: email.value, password: password.value };
    // if (email.value === "") {
    //   const inputGroup = document.querySelector(".input-group span.email");
    //   console.log(inputGroup);
    //   // inputGroup?.innerHTML += `<p class="error">email is required</p>`
    // }
    if (user.email !== "eloi.chrysanthe@gmail.com" ||
        user.password !== "123456") {
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
        console.log(user);
        setTimeout(() => {
            window.location.href = "./dashboard/index.html";
        }, 1500);
    }
};
