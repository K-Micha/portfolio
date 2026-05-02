const arrowContainer = document.getElementById('arrow-container');
const skills = document.getElementById('skills');

arrowContainer.addEventListener('click', function () {
  skills.scrollIntoView({ behavior: 'smooth' });
});

let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let errorTimer;

function checkField(el) {
    resetField(el);

    if (stopEmptyField(el)) return;
    if (stopBlockedValue(el)) return;
    if (stopWrongEmail(el)) return;

    setValidField(el);
}

function stopEmptyField(el) {
    if (!isEmpty(el)) return false;

    setInvalid(el);
    updateButton();
    return true;
}

function stopBlockedValue(el) {
    if (!isBlockedValue(el)) return false;

    setSuccess(el);
    setState(el, false);
    updateButton();
    return true;
}

function stopWrongEmail(el) {
    if (!isEmailField(el)) return false;
    if (isValidEmail(el.value)) return false;

    showError(el, "This is not a valid email address");
    isEmailValid = false;
    updateButton();
    return true;
}

function setValidField(el) {
    setSuccess(el);
    setState(el, true);
    updateButton();
}

function fillField(icon) {
    let field = icon.parentElement;
    let el = field.children[0];

    if (!el) return;

    if (isEmailField(el)) {
        el.value = "info@MaxMustermann.de";
    } else if (isTextarea(el)) {
        el.value = "Hi! Michael I want to work with you in a new project, when do you have time for a meeting?";
    } else {
        el.value = "Max Mustermann";
    }

    checkField(el);
}

function triggerError(el) {
    resetField(el);
    showError(el, getRequiredText(el));
    setState(el, false);
    updateButton();
}

function resetField(el) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    field.classList.remove("error", "success");
    error.textContent = "";
    error.classList.remove("visible");
}

function isEmpty(el) {
    return el.value.trim() === "";
}

function isEmailField(el) {
    return el.type === "email";
}

function isTextarea(el) {
    return el.tagName.toLowerCase() === "textarea";
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isBlockedValue(el) {
    let value = el.value.trim().toLowerCase();

    return value === "max mustermann" ||
           value === "info@maxmustermann.de";
}

function setInvalid(el) {
    setState(el, false);

    if (document.activeElement !== el) {
        showError(el, getRequiredText(el));
    }
}

function showError(el, text) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    clearTimeout(errorTimer);

    field.classList.add("error");
    error.textContent = text;
    error.classList.add("visible");

    if (isEmpty(el)) {
        startErrorTimer(el);
    }
}

function startErrorTimer(el) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    errorTimer = setTimeout(function () {
        error.classList.remove("visible");
        error.textContent = "";
        field.classList.remove("error");
    }, 3000);
}

function setSuccess(el) {
    el.parentElement.classList.add("success");
}

function getRequiredText(el) {
    if (isEmailField(el)) return "Your email is required";
    if (isTextarea(el)) return "Your message is required";
    return "Your name is required";
}

function setState(el, state) {
    if (isEmailField(el)) isEmailValid = state;
    else if (isTextarea(el)) isMessageValid = state;
    else isNameValid = state;
}

function updateButton() {
    let btn = document.getElementById("sendBtn");
    let privacy = document.getElementById("privacy-check");

    if (!btn || !privacy) return;

    btn.disabled = !(isNameValid && isEmailValid && privacy.checked);
}

function handleSubmit(e) {
    e.preventDefault();

    let message = document.getElementById("formMessage");

    if (!isNameValid || !isEmailValid || !isPrivacyChecked()) {
        message.textContent = "Please fill all required fields and accept the privacy policy.";
        return false;
    }

    message.textContent = "Your message has been sent successfully.";
    resetContactForm();

    return false;
}

function isPrivacyChecked() {
    let privacy = document.getElementById("privacy-check");

    if (!privacy) return false;

    return privacy.checked;
}

function resetContactForm() {
    resetInput("name");
    resetInput("email");
    resetInput("message");
    resetPrivacy();

    isNameValid = false;
    isEmailValid = false;
    isMessageValid = false;

    updateButton();
}

function resetInput(id) {
    let el = document.getElementById(id);
    let field = el.parentElement;
    let error = field.nextElementSibling;

    el.value = "";
    field.classList.remove("success", "error");
    error.textContent = "";
    error.classList.remove("visible");
}

function resetPrivacy() {
    let privacy = document.getElementById("privacy-check");

    if (!privacy) return;

    privacy.checked = false;
}