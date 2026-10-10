const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    root.dataset.theme = savedTheme;
} else if (
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    root.dataset.theme = "dark";
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const dark = root.dataset.theme === "dark";

    themeToggle.textContent = dark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        dark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}

themeToggle?.addEventListener("click", () => {
    const dark = root.dataset.theme === "dark";
    const theme = dark ? "light" : "dark";

    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    updateThemeIcon();
});

updateThemeIcon();

/* --------------------------------------------------
   SMOOTH ANCHOR LINKS
-------------------------------------------------- */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {
        link.addEventListener("click", event => {
            const selector = link.getAttribute("href");
            const target = document.querySelector(selector);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

/* --------------------------------------------------
   SCROLL REVEAL
-------------------------------------------------- */

const animatedElements =
    document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });
} else {
    animatedElements.forEach(element => {
        element.classList.add("visible");
    });
}

/* --------------------------------------------------
   ACTIVE NAVIGATION
-------------------------------------------------- */

const currentPath =
    window.location.pathname.replace(/\/$/, "");

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {
        const linkPath =
            new URL(link.href).pathname.replace(/\/$/, "");

        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });

