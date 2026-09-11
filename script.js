/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }

});


/* Close menu when clicking navigation link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuButton.textContent = "☰";

    });

});


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeButton =
    document.getElementById("themeButton");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.textContent = "🌙";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    if (isLight) {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        themeButton.textContent = "☀";

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    }

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById("typingText");


const words = [

    "CSE Student",
    "AI & ML Learner",
    "Web Developer",
    "Programmer",
    "Tech Enthusiast"

];


let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeWriter() {

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        characterIndex++;

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeWriter,
                1500
            );

            return;
        }

    } else {

        characterIndex--;

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                words.length
            ) {
                wordIndex = 0;
            }

        }

    }


    setTimeout(
        typeWriter,
        deleting ? 50 : 90
    );

}


typeWriter();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        if (
            elementTop <
            windowHeight - 80
        ) {

            element.classList.add(
                "visible"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            alert(
                "Please fill in all fields."
            );

            return;
        }


        /*
           This is a frontend-only form.

           It does not send an email yet.

           We open the visitor's email application
           with the message prepared.
        */


        const yourEmail =
            "your@email.com";


        const subject =
            encodeURIComponent(
                "Portfolio Contact from " +
                name
            );


        const body =
            encodeURIComponent(
                "Name: " +
                name +
                "\n\nEmail: " +
                email +
                "\n\nMessage:\n" +
                message
            );


        window.location.href =
            `mailto:${yourEmail}?subject=${subject}&body=${body}`;


        contactForm.reset();

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();
