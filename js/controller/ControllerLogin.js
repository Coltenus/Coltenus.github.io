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
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("authorized", true);
            window.location.replace("/");
        }
    }
}