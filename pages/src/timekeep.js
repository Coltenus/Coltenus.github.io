import { getCookie } from './common.js'

import { createApp } from 'vue'
import Content from './components/timekeep/Content.vue'
import AccessLinks from './components/AccessLinks.vue'
import NavLinksUser from './components/NavLinksReg.vue'

import ControllerTimekeep from "./controller/ControllerTimekeep.js";

export const timekeep = function() {
    const hash = getCookie("user_hash");
    if(hash === undefined || hash === "")
        window.location.replace("/auth");
    createApp(Content).mount('#content');
    createApp(AccessLinks).mount('#access-links');
    createApp(NavLinksUser).mount('#nav-links');
    let controller = new ControllerTimekeep();
    controller.init();
}
