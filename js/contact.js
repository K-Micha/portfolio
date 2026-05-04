let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPrivacyErrorVisible = false;
let isFeedbackVisible = false;

let feedbackTimer;
let privacyTimer;

/** Timestamp when the form interaction started. */
window.formStartedAt = Date.now();

/** Validates a field and applies the correct visual state. */
function checkField(el) {
    resetField(el);

    if (stopEmptyField(el)) return;
    if (stopWrongEmail(el)) return;

    setValidField(el);
}

/** Handles empty-field validation. */
function stopEmptyField(el) {
    if (!isEmpty(el)) return false;

    setInvalid(el);
    updateButton();
    return true;
}

/** Handles invalid email validation. */
function stopWrongEmail(el) {
    if (!isEmailField(el)) return false;
    if (isValidEmail(el.value)) return false;

    showError(el, "This is not a valid email address");
    isEmailValid = false;
    updateButton();
    return true;
}

/** Marks a field as valid and updates state. */
function setValidField(el) {
    setSuccess(el);
    setState(el, true);
    updateButton();
}

/** Applies placeholder text and forces label to stay lifted. */
function fillField(icon) {
    let field = icon.parentElement;
    let el = field.children[0];

    if (!el) return;

    field.classList.add("force-label");

    if (isEmailField(el)) return fillEmailPlaceholder(el);
    if (isTextarea(el)) return fillMessagePlaceholder(el);

    fillNamePlaceholder(el);
}

/** Sets placeholder for the name field. */
function fillNamePlaceholder(el) {
    el.placeholder = "Max Mustermann";
}

/** Sets placeholder for the email field. */
function fillEmailPlaceholder(el) {
    el.placeholder = "info@MaxMustermann.de";
}

/** Sets placeholder for the message field. */
function fillMessagePlaceholder(el) {
    el.placeholder = "Hi Michael! I want to work with you on a new project.";
}

/** Forces an error state on a field (used for double-click testing). */
function triggerError(el) {
    resetField(el);
    showError(el, getRequiredText(el));
    setState(el, false);
    updateButton();
}

/** Clears visual error/success state of a field. */
function resetField(el) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    field.classList.remove("error", "success");
    error.textContent = "";
    error.classList.remove("visible");
}

/** Returns true if the field value is empty. */
function isEmpty(el) {
    return el.value.trim() === "";
}

/** Returns true if the element is an email input. */
function isEmailField(el) {
    return el.type === "email";
}

/** Returns true if the element is a textarea. */
function isTextarea(el) {
    return el.tagName.toLowerCase() === "textarea";
}

/** Validates email format. */
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Marks a field as invalid and shows an error message. */
function setInvalid(el) {
    setState(el, false);

    if (document.activeElement !== el) {
        showError(el, getRequiredText(el));
    }
}

/** Displays an error message for a field. */
function showError(el, text) {
    let field = el.parentElement;
    let error = field.nextElementSibling;

    clearTimeout(error.timer);

    field.classList.add("error");
    error.textContent = text;
    error.classList.add("visible");

    if (isEmpty(el)) startErrorTimer(el);
}

/** Hides the error message after a delay. */
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

/** Marks a field as visually successful. */
function setSuccess(el) {
    el.parentElement.classList.add("success");
}

/** Returns the required-field error text for a given element. */
function getRequiredText(el) {
    if (isEmailField(el)) return "Your email is required";
    if (isTextarea(el)) return "Your message is required";
    return "Your name is required";
}

/** Updates validation state variables based on field type. */
function setState(el, state) {
    if (isEmailField(el)) isEmailValid = state;
    else if (isTextarea(el)) isMessageValid = state;
    else isNameValid = state;
}

/** Enables or disables the submit button based on form validity. */
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

/** Handles form submission and validation flow. */
async function handleSubmit(e) {
    e.preventDefault();

    if (!isPrivacyChecked()) return handlePrivacyError();
    if (!isFormValid()) return handleFieldsError();

    await sendContactForm();
    return false;
}

/** Returns true if all fields are valid. */
function isFormValid() {
    return isNameValid && isEmailValid && isMessageValid;
}

/** Shows the privacy policy error message. */
function handlePrivacyError() {
    showPrivacyError();
}

/** Shows a general validation error message. */
function handleFieldsError() {
    let error = document.getElementById("privacyError");
    showFeedback(error, "Please fill all required fields.", 3000, "error");
}

/** Sends the form data to the server. */
async function sendContactForm() {
    let message = document.getElementById("formMessage");
    let data = getFormData();

    try {
        let result = await postContactData(data);
        handleContactResponse(result, message);
    } catch (error) {
        showFeedback(message, t("form.network"), 6000, "error");
    }
}

/** Sends a POST request with form data. */
async function postContactData(data) {
    let response = await fetch("contact.php", {
        method: "POST",
        headers: getJsonHeaders(),
        body: JSON.stringify(data)
    });

    return response.json();
}

/** Returns JSON headers for fetch requests. */
function getJsonHeaders() {
    return {
        "Content-Type": "application/json"
    };
}

/** Handles server response after form submission. */
function handleContactResponse(result, message) {
    if (result.success) {
        showFeedback(message, t("form.success"), 6000, "success");
        resetContactForm();
        return;
    }

    handleContactError(result, message);
}

/** Handles server response after form submission. */
function handleContactError(result, message) {
    if (result.error === "too_many_requests") {
        showFeedback(message, "Too many messages. Try again later.", 6000, "error");
        return;
    }

    if (result.error === "blocked") {
        showFeedback(message, "You are temporarily blocked.", 6000, "error");
        return;
    }

    showFeedback(message, t("form.fail"), 6000, "error");
}

/** Handles server-side error responses. */
function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        website: "",
        formStartedAt: window.formStartedAt || Date.now()
    };
}

/** Collects and returns sanitized form data. */
function isPrivacyChecked() {
    let privacy = document.getElementById("privacy-check");
    if (!privacy) return false;
    return privacy.checked;
}

/** Resets all form fields and validation states. */
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

/** Clears a specific input field and its error state. */
function resetInput(id) {
    let el = document.getElementById(id);
    let field = el.parentElement;
    let error = field.nextElementSibling;
    el.value = "";
    field.classList.remove("success", "error");
    error.textContent = "";
    error.classList.remove("visible");
}

/** Resets the privacy checkbox. */
function resetPrivacy() {
    let privacy = document.getElementById("privacy-check");
    if (!privacy) return;
    privacy.checked = false;
}

/** Displays the privacy error message. */
function showPrivacyError() {
    let error = document.getElementById("privacyError");
    if (!canShowPrivacy(error)) return;
    startPrivacy(error, "Please accept the privacy policy.");
    schedulePrivacyHide(error);
}

/** Returns true if the privacy error can be shown. */
function canShowPrivacy(el) {
    return !isPrivacyErrorVisible && !!el;
}

/** Shows the privacy error text. */
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

/** Schedules hiding of the privacy error. */
function hidePrivacyError(el) {
    el.textContent = "";
    el.classList.remove("visible");
    isPrivacyErrorVisible = false;
}

/** Shows a global feedback message. */
function showFeedback(el, text, duration = 3000, type = "success") {
    if (!canShowFeedback(el)) return;

    startFeedback(el, text, type);
    scheduleFeedbackHide(el, duration);
}

/** Returns true if feedback can be shown. */
function canShowFeedback(el) {
    return !isFeedbackVisible && !!el;
}

/** Displays a feedback message with styling. */
function startFeedback(el, text, type) {
    isFeedbackVisible = true;
    el.textContent = text;
    el.classList.remove("success", "error");

    if (type === "error") {
        el.classList.add("error");
    } else {
        el.classList.add("success");
    }
    el.classList.add("visible");
    clearTimeout(feedbackTimer);
}

/** Schedules hiding of the feedback message. */
function scheduleFeedbackHide(el, duration) {
    feedbackTimer = setTimeout(function () {
        hideFeedback(el);
    }, duration);
}

/** Hides the feedback message. */
function hideFeedback(el) {
    el.textContent = "";
    el.classList.remove("visible", "success", "error");
    isFeedbackVisible = false;
}