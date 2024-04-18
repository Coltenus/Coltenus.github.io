import Controller from "./controller/ControllerTimekeep.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new Controller();
controller.init();