export default class ControllerRegister {
    constructor() {

    }

    init() {
        const register_button = document.getElementById("register-button");
        register_button.addEventListener("click", this.register_button_event);
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
            localStorage.setItem("email", email);
            localStorage.setItem("password", password1);
            localStorage.setItem("birthdate", birthdate);
            switch (Number(gender)) {
                case 1:
                    localStorage.setItem("gender", "Male");
                    break;
                case 2:
                    localStorage.setItem("gender", "Female");
                    break;
                case 3:
                    localStorage.setItem("gender", "Other");
                    break;
            
                default:
                    localStorage.setItem("gender", "Unknown");
                    break;
            }
            localStorage.setItem("authorized", true);
            window.location.replace("index");
        }
    }
}