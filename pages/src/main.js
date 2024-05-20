import { not_found } from "/src/not_found.js";
import { index } from "/src/index.js"
import { about } from "/src/about.js"
import { profile } from "/src/profile.js";
import { timekeep } from "./timekeep.js";
import { auth } from "./auth.js";
import { createApp } from "vue";
import Base from "/src/components/Base.vue";

import { api_url, getCookie, setCookie } from "/src/common.js";

const hash = getCookie("user_hash");

if(hash !== undefined && hash !== "") {
    let body = JSON.stringify({
            hash: hash,
        });
    let email = "";
    await fetch(api_url + "/user",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    }).then((response) => response.json())
    .then((data) => {
        email = data.user.email;
    });
    setCookie("email", email);
}

const path = window.location.pathname;
const params = new URLSearchParams(window.location.search);
createApp(Base).mount("#base");
switch(path) {
    case "/index":
        index();
        break;
    case "/":
        index();
        break;
    case "/about":
        about();
        break;
    case "/profile":
        profile();
        break;
    case "/timekeep":
        timekeep();
        break;
    case "/auth":
        auth(params);
        break;
    default:
        not_found();
        break;
}