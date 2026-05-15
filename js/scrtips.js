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

/** Jumps directly to contact section. */
function jumpToContact() {
    let target = document.getElementById("contact");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

/** Jumps directly to about section. */
function jumpToAbout() {
    jumpToSection("about");
}

/** Jumps directly to skills section. */
function jumpToSkills() {
    jumpToSection("skills");
}

/** Jumps directly to project section. */
function jumpToProject() {
    jumpToSection("project");
}

/** Jumps directly to target section. */
function jumpToSection(id) {
    let target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
}

/** Toggles the language dropdown menu. */
function toggleLangMenu() {
    document.querySelector(".lang").classList.toggle("open");
}

let isMenuOpen = false;
let isMenuBusy = false;
let footerTimer = null;
document.body.classList.add("lang-hidden");

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
    document.body.classList.remove("lang-hidden");

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
    document.body.classList.add("lang-hidden");

    playBurgerClose();
    isMenuOpen = false;

    setTimeout(unlockMenu, 400);
}

/** Unlocks menu interaction after animations. */
function unlockMenu() {
    isMenuBusy = false;
}

document.onkeydown = closeMenuOnEscape;

/** Closes overlay menu with escape key. */
function closeMenuOnEscape(event) {
    if (event.key !== "Escape") return;
    if (!isMenuOpen || isMenuBusy) return;

    closeOverlayMenu();
}

/** Initializes mobile project hover by viewport position. */
function initProjectViewportHover() {
    if (!isTouchDevice()) return;

    let cards = document.querySelectorAll(".project-item");
    cards.forEach(observeProjectItem);
}

/** Observes one project item. */
function observeProjectItem(item) {
    let observer = new IntersectionObserver(handleProjectView, {
        threshold: 0.2,
        rootMargin: "-40px 0px -80px 0px"
    });

    observer.observe(item);
}

/** Toggles hover state by viewport visibility. */
function handleProjectView(entries) {
    entries.forEach(toggleProjectHover);
}

/** Applies hover class to project item. */
function toggleProjectHover(entry) {
    entry.target.classList.toggle("is-hovered", entry.isIntersecting);
}

/** Detects touch devices. */
function isTouchDevice() {
    return window.matchMedia("(hover: none)").matches;
}

window.addEventListener("load", initProjectViewportHover);

/** Reference cards */
const referenceCards = [i1, i2, i3];

/** Navigation dots */
const referenceDots = [d1, d2, d3];

/** Current active card index */
let currentReference = 0;


/**
* Updates card positions and active state.
*/
function updateReferences() {
    resetReferences();

    const leftCard = (currentReference + 2) % 3;
    const centerCard = currentReference;
    const rightCard = (currentReference + 1) % 3;

    setCardOrder(leftCard, 1);
    setCardOrder(centerCard, 2);
    setCardOrder(rightCard, 3);

    activateReference(centerCard);
}


/**
* Resets all cards and dots.
*/
function resetReferences() {
    for (let i = 0; i < referenceCards.length; i++) {
        referenceCards[i].className = 'reference-item';
        referenceCards[i].style.order = '';

        referenceDots[i].className = 'ref-dot';
    }
}


/**
* Sets visual order for one card.
*/
function setCardOrder(index, order) {
    referenceCards[index].style.order = order;
}


/**
* Activates one reference card and dot. 
* @param {number} index
*/
function activateReference(index) {
    referenceCards[index].classList.add('active');
    referenceDots[index].classList.add('active');
}


/**
* Shows previous reference.
*/
function showPreviousReference() {
    currentReference = (currentReference + 2) % 3;
    updateReferences();
}


/**
* Shows next reference.
*/
function showNextReference() {
    currentReference = (currentReference + 1) % 3;
    updateReferences();
}


prev.onclick = showPreviousReference;
next.onclick = showNextReference;

updateReferences();