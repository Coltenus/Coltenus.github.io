import {setCookie, api_url} from "/src/common.js";
import {createApp} from "vue";
import Login from "/src/components/auth/Login.vue";
import ControllerLogin from "/src/controller/ControllerLogin.js";

export default class ControllerRegister {
    constructor(app) {
        this.app = app;
    }

    init() {
        const register_button = document.getElementById("register-button");
        register_button.addEventListener("click", this.register_button_event);
        const login_button = document.getElementById("login-button");
        login_button.addEventListener("click", this.change_event);
    }

    register_button_event() {
        var email = document.getElementById("email").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        var gender = document.getElementById("gender").value;
        var birthdate = document.getElementById("bdate").value;
        if(password1 !== password2) {
            alert("Passwords do not match");
        }
        else if(email === "") {
            alert("Email cannot be empty");
        }
        else if(password1 === "") {
            alert("Password cannot be empty");
        }
        else if(gender === "Select gender") {
            alert("Please select gender");
        }
        else if(birthdate === "") {
            alert("Please enter birthdate");
        }
        else {
            fetch(api_url + "/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password1: password1,
                    password2: password2,
                    gender: gender,
                    birthdate: birthdate,
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
        let app = createApp(Login);
        app.mount('#content');
        let controller = new ControllerLogin(app);
        controller.init();
    }
}