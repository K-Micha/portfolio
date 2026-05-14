(function () {

    /** @type {string} Active language */
    let currentLang = localStorage.getItem("lang") || "en";
    let isMenuOpen = false;
    let isMenuBusy = false;
    let footerTimer = null;
    let burgerOpen = false;
    let burgerAnimating = false;

    const topL = document.getElementById("top");
    const midL = document.getElementById("mid");
    const botL = document.getElementById("bot");
    const FRAME_DELAY = 50;
    const framesOpen = [frame1, frame2, frame3, frame4, frame5];
    const framesClose = [...framesOpen].reverse();

    init();

    /** Initializes menu system */
    function init() {
        applyFrame(frame1());

        updateLangVisibility();
        updateLangButton(currentLang);
        renderLegalPage();

        window.addEventListener("resize", updateLangVisibility);

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeOverlayMenu();
            }
        });
    }

    /** Updates mobile language visibility */
    function updateLangVisibility() {
        if (window.innerWidth <= 650 && !isMenuOpen) {
            document.body.classList.add("lang-hidden");
        } else {
            document.body.classList.remove("lang-hidden");
        }
    }

    /** Toggles language dropdown */
    window.toggleLangMenu = function () {
        const lang = document.querySelector(".lang");

        if (!lang) return;

        lang.classList.toggle("open");
    };

    /** Changes active language */
    window.setLang = function (event, lang) {
        if (event) event.stopPropagation();

        currentLang = lang;

        localStorage.setItem("lang", lang);

        updateLangButton(lang);
        renderLegalPage();

        document.querySelector(".lang")
            ?.classList.remove("open");
    };

    /** Updates language button */
    function updateLangButton(lang) {
        const active = document.getElementById("activeLang");
        const toggle = document.querySelector("#langOptions button");

        if (active) {
            active.textContent = lang.toUpperCase();
        }

        if (!toggle) return;

        const nextLang = lang === "en" ? "de" : "en";

        toggle.textContent = nextLang.toUpperCase();

        toggle.onclick = (event) => setLang(event, nextLang);
    }

    /** Renders legal content */
    function renderLegalPage() {
        const content = document.getElementById("legalContent");

        if (!content || typeof legalPages === "undefined") return;

        const page = content.dataset.page;
        const html = legalPages[page]?.[currentLang];

        if (!html) return;

        content.innerHTML = html;
    }

    /** Toggles overlay menu */
    window.toggleOverlayMenu = function () {
        if (isMenuBusy) return;

        if (isMenuOpen) {
            closeOverlayMenu();
        } else {
            openOverlayMenu();
        }
    };

    /** Opens overlay menu */
    function openOverlayMenu() {
        const overlay = document.getElementById("menuOverlay");

        if (!overlay || isMenuBusy) return;

        isMenuBusy = true;
        isMenuOpen = true;

        activateOverlay(overlay);

        playBurgerOpen();

        setTimeout(() => isMenuBusy = false, 400);
    }

    /** Activates overlay state */
    function activateOverlay(overlay) {
        overlay.classList.add("open");

        document.body.classList.add("menu-locked");
        document.body.classList.remove("lang-hidden");

        clearTimeout(footerTimer);

        footerTimer = setTimeout(() => {
            overlay.classList.add("footer-open");
        }, 550);
    }

    /** Closes overlay menu */
    function closeOverlayMenu() {
        const overlay = document.getElementById("menuOverlay");

        if (!overlay || isMenuBusy) return;

        isMenuBusy = true;
        isMenuOpen = false;

        resetOverlay(overlay);

        playBurgerClose();

        setTimeout(() => isMenuBusy = false, 400);
    }

    /** Resets overlay state */
    function resetOverlay(overlay) {
        clearTimeout(footerTimer);

        overlay.classList.remove("footer-open", "open");

        document.body.classList.remove("menu-locked");

        document.querySelector(".lang")
            ?.classList.remove("open");

        updateLangVisibility();
    }

    /** Animates burger frames */
    function animateBurger(frames) {
        let i = 0;

        burgerAnimating = true;

        function step() {
            applyFrame(frames[i]());

            i++;

            if (i < frames.length) {
                setTimeout(step, FRAME_DELAY);
            } else {
                burgerAnimating = false;
            }
        }

        step();
    }

    /** Plays open animation */
    function playBurgerOpen() {
        if (burgerAnimating || burgerOpen) return;

        burgerOpen = true;

        animateBurger(framesOpen);
    }

    /** Plays close animation */
    function playBurgerClose() {
        if (burgerAnimating || !burgerOpen) return;

        burgerOpen = false;

        animateBurger(framesClose);
    }

    /** Applies burger frame */
    function applyFrame(f) {
        if (!topL || !midL || !botL) return;

        applyLine(topL, f.top);
        applyLine(midL, f.mid);
        applyLine(botL, f.bot);
    }

    /** Applies line transform */
    function applyLine(line, f) {
        line.style.width = f.w + "px";

        line.style.transform =
            "translate(-50%, -50%) translate(" +
            f.x +
            "px, " +
            f.y +
            "px) rotate(" +
            f.r +
            "deg)";
    }

    /** Returns default frame */
    function frame1() {
        return {
            top: { w: 40, x: 0, y: -14, r: 0 },
            mid: { w: 40, x: 0, y: 0, r: 0 },
            bot: { w: 40, x: 0, y: 14, r: 0 }
        };
    }

    /** Returns short frame */
    function frame2() {
        return {
            top: { w: 20, x: 0, y: -14, r: 0 },
            mid: { w: 40, x: 0, y: 0, r: 0 },
            bot: { w: 20, x: 0, y: 14, r: 0 }
        };
    }

    /** Returns shifted frame */
    function frame3() {
        return {
            top: { w: 20, x: 10, y: -14, r: 0 },
            mid: { w: 40, x: 0, y: 0, r: 0 },
            bot: { w: 20, x: -10, y: 14, r: 0 }
        };
    }

    /** Returns crossing frame */
    function frame4() {
        return {
            top: { w: 20, x: 10, y: -10, r: -45 },
            mid: { w: 40, x: 0, y: 0, r: 45 },
            bot: { w: 20, x: -10, y: 10, r: -45 }
        };
    }

    /** Returns final X frame */
    function frame5() {
        return {
            top: { w: 40, x: 0, y: 0, r: -45 },
            mid: { w: 40, x: 0, y: 0, r: 45 },
            bot: { w: 0, x: 0, y: 0, r: 0 }
        };
    }

})();