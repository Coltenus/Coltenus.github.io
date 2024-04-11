export default class UserView {
    constructor(userModel) {
        this.userModel = userModel;
    }

    displayEmail(id) {
        let email = this.userModel.getEmail();
        if (email === "" || email === null) {
            email = "Not logged in";
        }
        document.getElementById(id).textContent = email;
    }

    displayGender(id) {
        let gender = this.userModel.getGender();
        if(gender === "" || gender === null) {
            gender = "Unknown";
        }
        document.getElementById(id).textContent = gender;
    }

    displayBirthdate(id) {
        let birthdate = this.userModel.getBirthdate();
        if(birthdate === "" || birthdate === null) {
            birthdate = "Unknown";
        }
        document.getElementById(id).textContent = birthdate;
    }

    displayLinks1(id) {
        let email = this.userModel.getEmail();
        let links = document.getElementById(id);
        links.insertAdjacentHTML('beforeend', `<div class="container rounded bg-color-3 box-1">
            <p>Welcome,</p><p>${email.substring(0, email.indexOf("@"))}</p>
            </div>`);
        links.insertAdjacentHTML('beforeend', `<br><div class="container rounded bg-color-3 box-1">
            <p>To logout press <button href="register" class="btn fg-color-3" id="logout-button">this button</button></p>
            </div>`);
        let logout_button = document.getElementById("logout-button");
        logout_button.addEventListener("click", function() {
            localStorage.clear();
            localStorage.setItem("authorized", false);
            window.location.replace("index");
        });
    }

    displayLinks2(id, page) {
        let email = this.userModel.getEmail();
        let links = document.getElementById(id);
        links.insertAdjacentHTML('beforeend', `<a class="plc-1 nav-item nav-link" href="profile">${email.substring(0, email.indexOf("@"))}</a>`);
        links.insertAdjacentHTML('beforeend', `<button class="plc-1 nav-item nav-link" id="logout-button">Logout</button>`);
        let logout_button = document.getElementById("logout-button");
        logout_button.addEventListener("click", function() {
            localStorage.clear();
            localStorage.setItem("authorized", false);
            window.location.replace(page);
        });
    }
}