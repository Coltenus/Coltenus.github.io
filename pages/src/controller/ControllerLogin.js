import { setCookie, api_url } from "../common.js";
import { createApp, getCurrentInstance } from "vue";
import Register from "/src/components/auth/Register.vue";
import Login from "/src/components/auth/Login.vue";
import ControllerRegister from "/src/controller/ControllerRegister.js";

export default class ControllerLogin {
    constructor(app) {
        this.app = app;
    }

    init() {
        const login_button = document.getElementById("login-button");
        login_button.addEventListener("click", this.login_button_event);
        const register_button = document.getElementById("register-button");
        register_button.addEventListener("click", this.change_event);
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
            fetch(api_url + "/login",
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

    change_event() {
        if(this.app !== null && this.app !== undefined) {
            this.app.unmount();
        }
        let app = createApp(Register);
        app.mount('#content');
        let controller = new ControllerRegister(app);
        controller.init();
    }
}