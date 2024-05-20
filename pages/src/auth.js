import { setCookie } from './common.js'

import { createApp } from 'vue'
import Content from './components/auth/Content.vue'

export const auth = function(params) {
    const type = params.has("type") ? params.get("type") : "";
    if(type === "logout") {
        setCookie("user_hash", "");
        setCookie("email", "");
        setCookie("gender", "");
        setCookie("birthdate", "");
        setCookie("spent_time", "");
        window.location.replace("/index");
    }
    else {
        createApp(Content).mount('#content');
    }
}
