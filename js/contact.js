let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPrivacyErrorVisible = false;
let isFeedbackVisible = false;

let feedbackTimer;
let privacyTimer;

window.formStartedAt = Date.now();

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

    if (isEmailField(el)) el.value = "info@MaxMustermann.de";
    else if (isTextarea(el)) el.value = "Hi Michael! I want to work with you on a new project.";
    else el.value = "Max Mustermann";

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

    clearTimeout(error.timer);

    field.classList.add("error");
    error.textContent = text;
    error.classList.add("visible");

    if (isEmpty(el)) startErrorTimer(el);
}

function startErrorTimer(el) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    clearTimeout(error.timer);

    error.timer = setTimeout(function () {
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

    if (!btn) return;

    let active = isNameValid && isEmailValid && isMessageValid && isPrivacyChecked();

    if (active) {
        btn.classList.add("active-btn");
        btn.classList.remove("disabled-btn");
    } else {
        btn.classList.add("disabled-btn");
        btn.classList.remove("active-btn");
    }
}

async function handleSubmit(e) {
    e.preventDefault();

    if (!isPrivacyChecked()) return handlePrivacyError();
    if (!isFormValid()) return handleFieldsError();

    await sendContactForm();
    return false;
}

function isFormValid() {
    return isNameValid && isEmailValid && isMessageValid;
}

function handlePrivacyError() {
    showPrivacyError();
}

function handleFieldsError() {
    let error = document.getElementById("privacyError");
    showFeedback(error, "Please fill all required fields.");
}

async function sendContactForm() {
    let message = document.getElementById("formMessage");
    let data = getFormData();

    try {
        let response = await fetch("contact.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if (result.success) {
            showFeedback(message, t("form.fail"), 6000);
            resetContactForm();
        } else {
            showFeedback(message, "Sending failed. Please use the email link below.", 6000);
        }

    } catch (error) {
        showFeedback(message, "Network error. Please use the email link below.", 6000);
    }
}

function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        website: "",
        formStartedAt: window.formStartedAt || Date.now()
    };
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
    window.formStartedAt = Date.now();

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

function showPrivacyError() {
    let error = document.getElementById("privacyError");

    if (!canShowPrivacy(error)) return;

    startPrivacy(error, "Please accept the privacy policy.");
    schedulePrivacyHide(error);
}

function canShowPrivacy(el) {
    return !isPrivacyErrorVisible && !!el;
}

function startPrivacy(el, text) {
    isPrivacyErrorVisible = true;

    el.textContent = text;
    el.classList.add("visible");

    clearTimeout(privacyTimer);
}

function schedulePrivacyHide(el, duration = 3000) {
    privacyTimer = setTimeout(function () {
        hidePrivacyError(el);
    }, duration);
}

function hidePrivacyError(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isPrivacyErrorVisible = false;
}

function showFeedback(el, text, duration = 3000) {
    if (!canShowFeedback(el)) return;

    startFeedback(el, text);
    scheduleFeedbackHide(el, duration);
}

function canShowFeedback(el) {
    return !isFeedbackVisible && !!el;
}

function startFeedback(el, text) {
    isFeedbackVisible = true;

    el.textContent = text;
    el.classList.add("visible");

    clearTimeout(feedbackTimer);
}

function scheduleFeedbackHide(el, duration) {
    feedbackTimer = setTimeout(function () {
        hideFeedback(el);
    }, duration);
}

function hideFeedback(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isFeedbackVisible = false;
}
