/** Current language loaded from localStorage or defaulting to English. */
window.currentLang = localStorage.getItem("lang") || "en";

const translations = {
    en: {
        nav: {
            about: "About me",
            skills: "My skills",
            portfolio: "Portfolio"
        },
        hero: {
            scroll: "Scroll Down"
        },
        about: {
            title: "About me",
            text: "I decided to pursue software development and currently focus on frontend development.\n\nMy work focuses on structured, clear solutions and clean implementation. I aim to understand how applications work and how they can be improved.\n\nI work independently and in an organized way, and I also contribute effectively in a team.",
            location: "Based in Straßwalchen",
            remote: "Open to remote work",
            cta: "Let’s talk"
        },
        skills: {
            title: "My skills",
            question: "Don’t see the skill you’re looking for?",
            contact: "Contact me",
            ready: "I’m always open to learning new things."
        },
        projects: {
            title: "Portfolio",
            intro: "Explore a selection of my work here. Interact with the projects to see my skills in action.",
            github: "Github",
            join: {
                title: "Join",
                desc: "Task manager inspired by the Kanban system. Create and organize tasks with drag and drop, assign users, and manage categories."
            },
            pollo: {
                title: "El Pollo Loco",
                desc: "A simple jump-and-run game built with an object-oriented approach. Help Pepe collect chili bottles and use them to defeat the crazy chicken."
            },
            pokedex: {
                title: "Pokédex",
                desc: "Based on the PokéAPI, this application provides and displays Pokémon information in a clear and structured way."
            },
            delivery: {
                title: "Order App",
                desc: "A food delivery application inspired by Lieferando. Users can browse restaurants, explore menus, and place orders through a simple interface."
            }
        },
        references: {
            title: "References",
            intro: "I work well both independently and as part of a team. Here’s what my colleagues say about working with me.",
            roleTeam: "Team Partner",
            roleFrontend: "Frontend Engineer",
            text1: "Michael kept the team together with strong organization and clear communication. We wouldn’t have come this far without his commitment.",
            text2: "Michi was a great team member at DA. His positive attitude and willingness to take responsibility made a strong contribution to achieving our goals.",
            text3: "It was a great pleasure to work with Michael. He knows how to motivate and encourage team members to deliver their best work. He always contributed to brainstorming sessions and was present, supportive, and approachable when it came to the well-being of the group — with a great sense of humor as well."
        },
        contact: {
            title: "Say Hi!",
            subtitle: "Want to discuss a new project?",
            text: "Let’s talk about your ideas and bring them to life."
        },
        form: {
            name: "Your name",
            email: "Your email",
            message: "Your message",
            nameError: "Your name is required",
            emailError: "Your email is required",
            messageError: "Your message is required",
            privacyStart: "I have read the",
            privacyPolicy: "privacy policy",
            privacyEnd: "and agree to the processing of my data.",
            send: "Send message",
            success: "Your message has been sent successfully.",
            fail: "Sending failed. Please use the email link below.",
            network: "Network error. Please use the email link below."
        },
        footer: {
            legal: "Legal notice"
        }
    },

    de: {
        nav: {
            about: "Über mich",
            skills: "Meine Skills",
            portfolio: "Portfolio"
        },
        hero: {
            scroll: "Runterscrollen"
        },
        about: {
            title: "Über mich",
            text: "Ich habe mich bewusst für die Softwareentwicklung entschieden und konzentriere mich aktuell auf Frontend Development.\n\nMeine Arbeit steht für strukturierte, klare Lösungen und saubere Umsetzung. Ich möchte verstehen, wie Anwendungen funktionieren und wie man sie verbessern kann.\n\nIch arbeite selbstständig und organisiert, kann aber auch effektiv im Team beitragen.",
            location: "Wohnhaft in Straßwalchen",
            remote: "Offen für Remote-Arbeit",
            cta: "Lass uns sprechen"
        },
        skills: {
            title: "Meine Skills",
            question: "Du siehst den Skill nicht, den du suchst?",
            contact: "Kontakt aufnehmen",
            ready: "Ich bin immer offen dafür, Neues zu lernen."
        },
        projects: {
            title: "Portfolio",
            intro: "Hier findest du eine Auswahl meiner Arbeiten. Interagiere mit den Projekten, um meine Fähigkeiten in Aktion zu sehen.",
            github: "Github",
            join: {
                title: "Join",
                desc: "Task-Manager inspiriert vom Kanban-System. Aufgaben erstellen, per Drag and Drop organisieren, Nutzer zuweisen und Kategorien verwalten."
            },
            pollo: {
                title: "El Pollo Loco",
                desc: "Ein einfaches Jump-and-Run-Spiel mit objektorientiertem Ansatz. Hilf Pepe, Chili-Flaschen zu sammeln und damit das verrückte Huhn zu besiegen."
            },
            pokedex: {
                title: "Pokédex",
                desc: "Basierend auf der PokéAPI stellt diese Anwendung Pokémon-Informationen klar und strukturiert dar."
            },
            delivery: {
                title: "Liefer App",
                desc: "Eine Liefer-App inspiriert von Lieferando. Hier können Sie sich ganz einfach eine Mahlzeit bestellen."
            }
        },
        references: {
            title: "Referenzen",
            intro: "Ich arbeite zuverlässig eigenständig und im Team. Das sagen meine Kollegen über die Zusammenarbeit mit mir.",
            roleTeam: "Team Partner",
            roleFrontend: "Frontend Engineer",
            text1: "Michael hat das Team mit starker Organisation und klarer Kommunikation zusammengehalten. Ohne seinen Einsatz wären wir nicht so weit gekommen.",
            text2: "Michi war bei DA ein sehr guter Teamkollege. Seine positive Haltung und seine Bereitschaft, Verantwortung zu übernehmen, haben stark dazu beigetragen, dass wir unsere Ziele erreicht haben.",
            text3: "Es war eine große Freude, mit Michael zu arbeiten. Er weiß, wie man Teammitglieder motiviert und unterstützt, damit sie ihre bestmögliche Arbeit abliefern. Er brachte sich immer in Brainstormings ein und war beim Wohlbefinden der Gruppe präsent, unterstützend und ansprechbar — mit starkem Humor dazu."
        },
        contact: {
            title: "Sag Hi!",
            subtitle: "Möchtest du ein neues Projekt besprechen?",
            text: "Lass uns über deine Ideen sprechen und sie zum Leben bringen."
        },
        form: {
            name: "Dein Name",
            email: "Deine E-Mail",
            message: "Deine Nachricht",
            nameError: "Dein Name ist erforderlich",
            emailError: "Deine E-Mail ist erforderlich",
            messageError: "Deine Nachricht ist erforderlich",
            privacyStart: "Ich habe die",
            privacyPolicy: "Datenschutzerklärung",
            privacyEnd: "gelesen und stimme der Verarbeitung meiner Daten zu.",
            send: "Nachricht senden",
            success: "Deine Nachricht wurde erfolgreich gesendet.",
            fail: "Senden fehlgeschlagen. Bitte nutze die E-Mail unten.",
            network: "Netzwerkfehler. Bitte nutze die E-Mail unten."
        },
        footer: {
            legal: "Impressum"
        }
    }
};

/** Toggles the language dropdown menu. */
function toggleLangMenu() {
    document.querySelector(".lang").classList.toggle("open");
}

/** Sets the active language and updates the UI. */
function setLang(event, lang) {
    if (event) event.stopPropagation();

    window.currentLang = lang;
    localStorage.setItem("lang", lang);

    renderTranslations();
    updateLangSwitch();
    document.querySelector(".lang").classList.remove("open");
}

/** Applies translations to all elements with data-i18n attributes. */
function renderTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(updateText);
}

/** Updates a single element's text based on its translation key. */
function updateText(element) {
    let key = element.dataset.i18n;
    let text = getTranslation(key);

    if (text) element.innerText = text;
}

/** Retrieves a translation value using a dot‑notation path. */
function getTranslation(path) {
    return path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations[window.currentLang]);
}

/** Shortcut for retrieving translations with fallback to key. */
function t(path) {
    return getTranslation(path) || path;
}

/** Updates the language switcher UI to reflect the active language. */
function updateLangSwitch() {
    let active = document.getElementById("activeLang");
    let options = document.getElementById("langOptions");

    active.textContent = window.currentLang.toUpperCase();
    let other = window.currentLang === "en" ? "de" : "en";

    options.innerHTML =
        `<button onclick="setLang(event, '${other}')">
            ${other.toUpperCase()}
        </button>`;
    active.classList.add("active");
}

/** Loads the saved language and initializes translations. */
function loadLang() {
    let saved = localStorage.getItem("lang");

    if (saved) window.currentLang = saved;

    renderTranslations();
    updateLangSwitch();
}

/** Initializes language system on DOM ready. */
document.addEventListener("DOMContentLoaded", loadLang);