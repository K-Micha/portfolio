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

let isMenuOpen = false;
let isMenuBusy = false;
let footerTimer = null;

/** Toggles overlay menu state. */
function toggleOverlayMenu() {
    if (isMenuBusy) return;

    if (isMenuOpen) {
        closeOverlayMenu();
        return;
    }

    openOverlayMenu();
}

/** Opens overlay menu. */
function openOverlayMenu() {
    let overlay = document.getElementById("menuOverlay");
    if (!overlay || isMenuBusy) return;

    isMenuBusy = true;
    isMenuOpen = true;

    overlay.classList.add("open");
    document.body.classList.add("menu-locked");

    playBurgerOpen();
    triggerFooter(overlay);

    setTimeout(unlockMenu, 400);
}

/** Starts footer phase animation. */
function triggerFooter(overlay) {
    footerTimer = setTimeout(() => {
        overlay.classList.add("footer-open");
    }, 550);
}

/** Closes overlay menu. */
function closeOverlayMenu() {
    let overlay = document.getElementById("menuOverlay");
    if (!overlay) return;

    isMenuBusy = true;
    clearTimeout(footerTimer);

    overlay.classList.remove("footer-open");
    overlay.classList.remove("open");
    document.body.classList.remove("menu-locked");

    playBurgerClose();
    isMenuOpen = false;

    setTimeout(unlockMenu, 400);
}

/** Unlocks menu interaction after animations. */
function unlockMenu() {
    isMenuBusy = false;
}