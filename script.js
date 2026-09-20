const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];
const progress = document.getElementById("scrollProgress");
const backTop = document.querySelector(".back-top");

function updateScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) {
        progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
    }

    if (backTop) {
        backTop.classList.toggle("show", scrollTop > 500);
    }

    if (sections.length && navItems.length) {
        let current = "home";

        sections.forEach((section) => {
            if (scrollTop >= section.offsetTop - 180) {
                current = section.id;
            }
        });

        navItems.forEach((item) => {
            item.classList.toggle(
                "active",
                item.getAttribute("href") === `#${current}`,
            );
        });
    }
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

const message = document.getElementById("message");
const charCount = document.getElementById("charCount");

if (message && charCount) {
    message.addEventListener("input", () => {
        charCount.textContent = message.value.length;
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(contactForm);
        const note = document.getElementById("formNote");
        const subject = encodeURIComponent(
            data.get("subject") || "Portfolio enquiry",
        );
        const body = encodeURIComponent(
            `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
        );

        if (note) {
            note.textContent = "Opening your email application…";
        }

        window.location.href = `mailto:vayam1607@gmail.com?subject=${subject}&body=${body}`;
    });

    const loaderButton = contactForm.querySelector(".loader");

    if (loaderButton) {
        contactForm.addEventListener("submit", () => {
            loaderButton.classList.add("loading-active");
            loaderButton.disabled = true;
        });
    }
}

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const experienceYears = document.getElementById("experienceyears");

if (experienceYears) {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    experienceYears.textContent = `${currentYear - startYear}+`;
}
