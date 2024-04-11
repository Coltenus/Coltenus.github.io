import UserModel from "../model/UserModel.js";
import UserView from "../view/UserView.js";

export default class ControllerProfile {
    constructor() {
        this.userModel = new UserModel();
        this.userView = new UserView(this.userModel);
    }

    init() {
        const save_password_button = document.getElementById("save-password-button");
        save_password_button.addEventListener("click", this.save_password_event);
        const id = "user-links";
        const page = "profile";

        if (JSON.parse(localStorage.getItem("authorized")) === true) {
            this.userModel.setEmail(localStorage.getItem("email"));
            this.userModel.setGender(localStorage.getItem("gender"));
            this.userModel.setBirthdate(localStorage.getItem("birthdate"));
            this.userModel.setPassword(localStorage.getItem("password"));
        }
        this.userView.displayEmail("email");
        this.userView.displayGender("gender");
        this.userView.displayBirthdate("bdate");
        if(this.userModel.getEmail() !== "") {
            this.userView.displayLinks2(id, page);
        }
    }

    save_password_event() {
        if(JSON.parse(localStorage.getItem("authorized")) !== true) {
            alert("You must be logged in to change your password");
            return;
        }
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        if(password1 !== password2) {
            alert("Passwords do not match");
        }
        else if(password1 === localStorage.getItem("password")) {
            alert("New password is the same as the old password");
        }
        else if(password1 === "") {
            alert("Password cannot be empty");
        }
        else {
            localStorage.setItem("password", password1);
            alert("Password changed successfully");
        }
    }
}