/** 
* Margin offset for triggering arrow animation. 
*/
const ARROW_MARGIN = "0px 0px -120px 0px";

/**
* Stores last scroll position. 
*/
let lastScrollY = window.scrollY;

/** 
* Initializes all arrow dividers on the page. 
*/
function initArrowDividers() {
    const dividers = document.getElementsByClassName("section-divider");

    for (let i = 0; i < dividers.length; i++) {
        initArrowDivider(dividers[i]);
    }
}

/** 
* Sets up a single arrow divider. 
*/
function initArrowDivider(divider) {
    let parts = getArrowParts(divider);
    if (!parts) return;

    observeArrow(divider, parts);
}

/** 
* Gets arrow and tail elements from divider. 
*/
function getArrowParts(divider) {
    let arrow = getFirst(divider, "arrow");
    let tail = getFirst(divider, "tail");

    if (!arrow || !tail) return null;

    return { arrow: arrow, tail: tail };
}

/** 
* Returns first element by class name. 
*/
function getFirst(parent, className) {
    return parent.getElementsByClassName(className)[0];
}

/** 
* Observes divider visibility for animation control. 
*/
function observeArrow(divider, parts) {
    let observer = new IntersectionObserver(function (entries) {
        handleArrow(entries[0], parts);
        lastScrollY = window.scrollY;
    }, getObserverOptions());

    observer.observe(divider);
}

/**
* Handles arrow animation logic based on scroll state. 
*/
function handleArrow(entry, parts) {
    if (!entry || !parts) return;

    if (shouldRunArrow(entry)) {
        restartArrow(parts);
        return;
    }

    if (shouldResetArrow(entry)) {
        resetArrow(parts);
    }
}

/** 
* Checks if arrow should animate. 
*/
function shouldRunArrow(entry) {
    return isScrollingDown() && entry.isIntersecting;
}

/** 
* Checks if arrow should reset.
*/
function shouldResetArrow(entry) {
    return !entry.isIntersecting && entry.boundingClientRect.top > 0;
}

/** 
* Detects downward scrolling. 
*/
function isScrollingDown() {
    return window.scrollY > lastScrollY;
}

/** 
* Restarts arrow animation. 
*/
function restartArrow(parts) {
    resetArrow(parts);
    forceAnimationRestart(parts.arrow);
    activateArrow(parts);
}

/** 
* Forces CSS animation restart. 
*/
function forceAnimationRestart(el) {
    void el.offsetWidth;
}

/** 
* Activates arrow animation classes. 
*/
function activateArrow(parts) {
    parts.arrow.classList.add("arrow-active");
    parts.tail.classList.add("arrow-active");
}

/** 
* Resets arrow animation state. 
*/
function resetArrow(parts) {
    parts.arrow.classList.remove("arrow-active");
    parts.tail.classList.remove("arrow-active");
}

/** 
* Returns IntersectionObserver options.
*/
function getObserverOptions() {
    return {
        threshold: 0,
        rootMargin: ARROW_MARGIN
    };
}

initArrowDividers();