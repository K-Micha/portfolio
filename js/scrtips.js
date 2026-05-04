let currentLang = "en";

function scrollToSkills() {
    let target = document.getElementById("skills");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

function scrollToProjects() {
    let target = document.getElementById("project");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

function scrollToContact() {
    let target = document.getElementById("contact");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleLangMenu() {
    document.querySelector(".lang").classList.toggle("open");
}

function setLang(event, lang) {
    event.stopPropagation();

    currentLang = lang;
    localStorage.setItem("lang", lang);

    updateLangSwitch();
    document.querySelector(".lang").classList.remove("open");
}

function updateLangSwitch() {
    let active = document.getElementById("activeLang");
    let options = document.getElementById("langOptions");

    active.textContent = currentLang.toUpperCase();

    let other = currentLang === "en" ? "de" : "en";

    options.innerHTML =
        `<button onclick="setLang(event, '${other}')">
            ${other.toUpperCase()}
        </button>`;

    active.classList.add("active");
}

function loadLang() {
    let saved = localStorage.getItem("lang");
    if (saved) currentLang = saved;

    updateLangSwitch();
}

loadLang();