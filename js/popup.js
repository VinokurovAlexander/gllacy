var popup_open_but = document.querySelector(".button-feedback");
var popup = document.querySelector(".modal-feedback");
var popup_close_but = popup.querySelector(".close-button");
var popup_username_input = popup.querySelector("[name='input-user-name']");
var popup_email_input = popup.querySelector("[name='input-email']");
var popup_feedback_text = popup.querySelector("[name='feedback-text']");
var form = popup.querySelector(".form-feedback");

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("user_email");
} catch (err) {
    isStorageSupport = false;
}

popup_open_but.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");

    if (storage) {
        popup_email_input.value = storage;
    }

    popup_username_input.focus();
});

popup_close_but.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
});

form.addEventListener("submit", function(evt) {
    if (!popup_username_input.value || !popup_email_input.value || !popup_feedback_text.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
    } else {
    if (isStorageSupport) {
    local.Storage.setItem("user_email",popup_email_input.value);
        }
    }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove("modal-error");
        }
    }
});
