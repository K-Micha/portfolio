let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPrivacyErrorVisible = false;
let isFeedbackVisible = false;
let feedbackTimer;
let errorTimer;
let privacyTimer;

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
        el.value = "Hi Michael! I want to work with you in a new project, when do you have time for a meeting?";
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

    clearTimeout(error.timer);

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

    let active = isNameValid && isEmailValid && isPrivacyChecked();

    if (active) {
        btn.classList.add("active-btn");
        btn.classList.remove("disabled-btn");
    } else {
        btn.classList.add("disabled-btn");
        btn.classList.remove("active-btn");
    }
}

function handleSubmit(e) {
    e.preventDefault();

    if (!isPrivacyChecked()) return handlePrivacyError();
    if (!isFormValid()) return handleFieldsError();

    handleSuccess();
    return false;
}

function isFormValid() {
    return isNameValid && isEmailValid;
}

function handlePrivacyError() {
    showPrivacyError();
}

function handleFieldsError() {
    showFormError();
}

function handleSuccess() {
    showSuccessMessage();
    resetContactForm();
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

function showPrivacyError() {
    let error = document.getElementById("privacyError");

    if (!canShowPrivacy(error)) return;

    startPrivacy(error, "Please accept the privacy policy.");
    schedulePrivacyHide(error);
}

function hidePrivacyError(error) {
    error.textContent = "";
    error.classList.remove("visible");
    isPrivacyErrorVisible = false;
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

function scheduleHide(el, duration) {
    feedbackTimer = setTimeout(function () {
        hideFeedback(el);
    }, duration);
}

function hideFeedback(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isFeedbackVisible = false;
}

function showFeedback(el, text, duration = 3000) {
    if (!canShowFeedback(el)) return;

    startFeedback(el, text);
    scheduleHide(el, duration);
}

function hideFeedback(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isFeedbackVisible = false;
}

function showFormError() {
    let error = document.getElementById("privacyError");
    showFeedback(error, "Please fill all required fields.");
}

function showSuccessMessage() {
    let message = document.getElementById("formMessage");
    showFeedback(message, "Your message has been sent successfully.");
}

function showSuccessMessage() {
    let message = document.getElementById("formMessage");

    if (!canShowFeedback(message)) return;

    startFeedback(message, "Your message has been sent successfully.");

    feedbackTimer = setTimeout(function () {
        endFeedback(message);
    }, 6000);
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

function endFeedback(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isFeedbackVisible = false;
}