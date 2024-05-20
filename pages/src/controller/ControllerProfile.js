import { getCookie, api_url } from "../common.js";
import { sha256 } from "../common.js";

export default class ControllerProfile {
    constructor() {
        
    }

    init() {
        if(getCookie("user_hash") !== undefined && getCookie("user_hash") !== "") {
            let clear_button = document.getElementById("clear-button");
            clear_button.addEventListener('click', this.clear_button_event);
            const save_password_button = document.getElementById("save-password-button");
            save_password_button.addEventListener("click", this.save_password_event);
        }
    }

    clear_button_event() {
        let result = confirm("Are you sure you want to clear your spent time?");
        if (result) {
            fetch(api_url + "/clear-spent-time",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_hash: getCookie("user_hash"),
                }),
            }).then((response) => response.json())
            .then((data) => alert(data.message));
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    }

    save_password_event() {
        if(getCookie("user_hash") === undefined || getCookie("user_hash") === "") {
            alert("You must be logged in to change your password");
            return;
        }
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        if(password1 !== password2) {
            alert("Passwords do not match");
        }
        else if(password1 === "") {
            alert("Password cannot be empty");
        }
        else {
            fetch(api_url + "/change-pass",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_hash: getCookie("user_hash"),
                    password: password1,
                }),
            }).then((response) => response.json())
            .then((data) => alert(data.message));
        }
    }
}