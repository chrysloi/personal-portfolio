"use strict";
// import { url } from "./utils.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = document.querySelector("#loginForm #email");
    const password = document.querySelector("#loginForm #password");
    let error = false;
    const loginButton = document.querySelector("#loginForm .theme-btn");
    // console.log(loaderDiv, ">>>>>>>>");
    if (loginButton) {
        loginButton.innerHTML = "";
        loginButton.innerHTML += `<div class="ring"></div>`;
    }
    if (email.value === "") {
        loginError({
            container: "#loginForm .email",
            message: "Email is required",
        });
        error = true;
    }
    if (password.value === "") {
        loginError({
            container: "#loginForm .password",
            message: "Password is required",
        });
        error = true;
    }
    if (error && loginButton) {
        loginButton.innerHTML = "Login";
        return;
    }
    const user = { email: email.value, password: password.value };
    const resp = yield fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const result = JSON.parse(yield resp.text());
    console.log(result);
    if (result.status !== 200 && loginButton) {
        loginButton.innerHTML = "Login";
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert-error");
        alertDiv.textContent = result.error
            ? result.error || result.error[0]
            : "An error occured try again";
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.style.display = "none";
        }, 3000);
    }
    else if (result.status === 200 && result.token && loginButton) {
        console.log(result.token);
        setTimeout(() => {
            localStorage.setItem("token", JSON.stringify(result.token));
            window.location.href = "./dashboard/index.html";
            loginButton.innerHTML = "Login";
        }, 1500);
    }
});
window.addEventListener("DOMContentLoaded", () => {
    const currentMode = localStorage.getItem("light-theme");
    if (currentMode === "light") {
        console.log(currentMode);
        document.documentElement.classList.toggle("light-theme");
    }
});
