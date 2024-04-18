import ControllerAbout from "./controller/ControllerAbout.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new ControllerAbout();
controller.init();