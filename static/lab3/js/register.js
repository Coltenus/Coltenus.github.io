import ControllerRegister from "./controller/ControllerRegister.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new ControllerRegister();
controller.init();