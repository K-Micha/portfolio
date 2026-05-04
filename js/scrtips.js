/** Currently active language (default: English). */
let currentLang = "en";

/** Disables right‑click on the about image. */
document.getElementById("about-img").oncontextmenu = () => false;

/** Smoothly scrolls to the skills section. */
function scrollToSkills() {
    let target = document.getElementById("skills");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

/** Smoothly scrolls to the projects section. */
function scrollToProjects() {
    let target = document.getElementById("project");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

/** Smoothly scrolls to the contact section. */
function scrollToContact() {
    let target = document.getElementById("contact");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

/** Smoothly scrolls back to the top of the page. */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Toggles the language dropdown menu. */
function toggleLangMenu() {
    document.querySelector(".lang").classList.toggle("open");
}

