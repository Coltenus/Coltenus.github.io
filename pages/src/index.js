import { getCookie } from './common.js'

import { createApp } from 'vue'
import Content from './components/index/Content.vue'
import AccessLinks from './components/AccessLinks.vue'
import NavLinks from './components/NavLinks.vue'
import NavLinksUser from './components/NavLinksReg.vue'
import UserLinks from './components/index/UserLinks.vue'
import UserLinksReg from './components/index/UserLinksReg.vue'

import ControllerIndex from "./controller/ControllerIndex.js";

export const index = function() {
    const hash = getCookie("user_hash");
    createApp(Content).mount('#content');
    if(hash === undefined || hash === "") {
        createApp(NavLinks).mount('#nav-links');
        createApp(UserLinks).mount('#user-links');
    }
    else {
        createApp(AccessLinks).mount('#access-links');
        createApp(NavLinksUser).mount('#nav-links');
        createApp(UserLinksReg).mount('#user-links');
    }
    let controller = new ControllerIndex();
    controller.init();
}
