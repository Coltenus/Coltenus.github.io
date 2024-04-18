import ControllerLogin from "./controller/ControllerLogin.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new ControllerLogin();
controller.init();

