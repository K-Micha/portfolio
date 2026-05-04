let currentLang = "en";

document.getElementById("about-img").oncontextmenu = () => false;

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

