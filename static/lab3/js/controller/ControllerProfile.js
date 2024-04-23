import { getCookie } from "../common.js";

export default class ControllerProfile {
    constructor() {
        
    }

    init() {
        let clear_button = document.getElementById("clear-button");
        clear_button.addEventListener('click', this.clear_button_event);
    }

    clear_button_event() {
        let result = confirm("Are you sure you want to clear your spent time?");
        if (result) {
            fetch("/api/clear-spent-time",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_hash: getCookie("user_hash"),
                }),
            }).then((response) => response.json())
            .then((data) => alert(data.message));
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    }
}