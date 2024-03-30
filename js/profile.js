import ControllerProfile from "./controller/ControllerProfile.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new ControllerProfile();
controller.init();