import { getCookie } from './common.js'

import { createApp } from 'vue'
import NotFound from './components/NotFound.vue'
import AccessLinks from './components/AccessLinks.vue'
import NavLinks from './components/NavLinks.vue'
import NavLinksUser from './components/NavLinksReg.vue'

export const not_found = function() {
    const hash = getCookie("user_hash");
    createApp(NotFound).mount('#content');
    if(hash === undefined || hash === "") {
        createApp(NavLinks).mount('#nav-links');
    }
    else {
        createApp(AccessLinks).mount('#access-links');
        createApp(NavLinksUser).mount('#nav-links');
    }
}
