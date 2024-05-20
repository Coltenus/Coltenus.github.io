import { getCookie, setCookie } from './common.js'

import { createApp } from 'vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'

import ControllerLogin from './controller/ControllerLogin.js'
import ControllerRegister from './controller/ControllerRegister.js'

export const auth = function(params) {
    const type = params.has("type") ? params.get("type") : "";
    if(type === "register") {
        let app = createApp(Register);
        app.mount('#content');
        let controller = new ControllerRegister(app);
        controller.init();
    }
    else if(type === "logout") {
        setCookie("user_hash", "");
        setCookie("email", "");
        setCookie("gender", "");
        setCookie("birthdate", "");
        setCookie("spent_time", "");
        window.location.replace("/index");
    }
    else {
        let app = createApp(Login);
        app.mount('#content');
        let controller = new ControllerLogin(app);
        controller.init();
    }
}
