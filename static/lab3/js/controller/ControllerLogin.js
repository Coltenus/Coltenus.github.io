import { setCookie } from "../common.js";

export default class ControllerLogin {
    constructor() {

    }

    init() {
        const login_button = document.getElementById("login-button");
        login_button.addEventListener("click", this.login_button_event);
    }

    login_button_event() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email === "") {
            alert("Email cannot be empty");
        }
        else if(password === "") {
            alert("Password cannot be empty");
        }
        else {
            fetch("/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }).then((response) => response.json())
            .then((data) => {
                alert(data.message);
                if(data.user_hash !== undefined) {
                    setCookie("user_hash", data.user_hash);
                    window.location.replace("index");
                }
            });
        }
    }
}