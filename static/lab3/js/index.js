import ControllerIndex from "./controller/ControllerIndex.js";

if(localStorage.getItem("authorized") === null) {
    localStorage.setItem("authorized", false);
}
let controller = new ControllerIndex();
controller.init();