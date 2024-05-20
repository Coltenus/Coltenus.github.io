import { getCookie, setCookie, api_url } from './common.js'

import { createApp } from 'vue'
import Content from './components/profile/Content.vue'
import AccessLinks from './components/AccessLinks.vue'
import NavLinks from './components/NavLinks.vue'
import NavLinksUser from './components/NavLinksReg.vue'
import NotUser from './components/profile/NotUser.vue'
import ProfileData from './components/profile/ProfileData.vue'

export const profile = async function() {
    const hash = getCookie("user_hash");
    createApp(Content).mount('#content');
    createApp(AccessLinks).mount('#access-links');
    if(hash === undefined || hash === "") {
        createApp(NavLinks).mount('#nav-links');
        createApp(NotUser).mount('#data');
    }
    else {
        let body = JSON.stringify({
                hash: hash,
            });
        let user = null;
        await fetch(api_url + "/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        }).then((response) => response.json())
        .then((data) => {
            user = data.user;
        });
        if(user !== null) {
            setCookie("email", user.email);
            setCookie("gender", user.gender);
            setCookie("birthdate", user.birthdate);
            setCookie("spent_time", user.spent_time);
        }
        else {
            setCookie("email", "");
            setCookie("gender", "");
            setCookie("birthdate", "");
            setCookie("spent_time", "");
        }

        createApp(NavLinksUser).mount('#nav-links');
        createApp(ProfileData).mount('#data');
    }
}