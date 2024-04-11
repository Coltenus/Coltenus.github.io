import UserModel from "../model/UserModel.js";
import UserView from "../view/UserView.js";
import { RemoveChildren } from "../common.js";

export default class ControllerIndex {
    constructor() {
        this.userModel = new UserModel();
        this.userView = new UserView(this.userModel);
    }

    init() {
        const id = "user-links";
        if (JSON.parse(localStorage.getItem("authorized")) === true) {
            this.userModel.setEmail(localStorage.getItem("email"));
            this.userModel.setGender(localStorage.getItem("gender"));
            this.userModel.setBirthdate(localStorage.getItem("birthdate"));
            this.userModel.setPassword(localStorage.getItem("password"));
        }
        if(this.userModel.getEmail() !== "") {
            let links = document.getElementById(id);
            RemoveChildren(links);
            this.userView.displayLinks1(id);
        }
    }
}