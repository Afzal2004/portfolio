/* Loader */
window.addEventListener("load", () => {
    setTimeout(() => document.querySelector(".loader-wrapper")?.classList.add("fade-out"), 600);
});

/* Typed.js */
if (document.querySelector(".typing")) {
    new Typed(".typing", {
        strings: [
            "Full Stack Developer",
            "Software Engineer",
            "React Developer",
            "Python & Flask Developer",
        ],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
    });
}

/* Theme toggle */
const themeBtn = document.querySelector(".theme-btn");
const themeIcon = themeBtn?.querySelector("i");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) { themeIcon.classList.replace("fa-moon", "fa-sun"); }
}

themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    if (themeIcon) {
        themeIcon.classList.toggle("fa-moon", !isLight);
        themeIcon.classList.toggle("fa-sun", isLight);
    }
});

/* Mobile menu */
const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

menuBtn?.addEventListener("click", () => {
    mobileNav?.classList.toggle("open");
    menuBtn.querySelector("i")?.classList.toggle("fa-bars");
    menuBtn.querySelector("i")?.classList.toggle("fa-xmark");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

/* Active nav on scroll */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
});

/* Scroll progress */
const progressBar = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar) progressBar.style.width = `${(window.scrollY / h) * 100}%`;
});

/* Back to top */
const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
    backTop?.classList.toggle("visible", window.scrollY > 500);
});
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* Mouse glow (desktop only) */
const glow = document.querySelector(".mouse-glow");
if (glow && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

/* Particles */
if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 900 } },
            color: { value: "#2563eb" },
            opacity: { value: 0.25 },
            size: { value: 2.5, random: true },
            line_linked: { enable: true, distance: 140, color: "#2563eb", opacity: 0.12 },
            move: { enable: true, speed: 1.2 },
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 120, line_linked: { opacity: 0.2 } } },
        },
    });
}

/* Counter animation */
function animateCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
        const target = +el.dataset.count;
        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target) + (el.dataset.suffix || "");
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

/* Skill bars */
function animateSkills() {
    document.querySelectorAll(".skill-fill").forEach((bar) => bar.classList.add("animate"));
}

/* Project filter */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        projectCards.forEach((card) => {
            const show = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("hidden", !show);
        });
    });
});

/* GSAP animations */
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content", { x: -40, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".hero-visual", { x: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.15 });

    gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
        });
    });

    ScrollTrigger.create({
        trigger: ".stats-bar",
        start: "top 85%",
        onEnter: animateCounters,
        once: true,
    });

    ScrollTrigger.create({
        trigger: ".skills-wrap",
        start: "top 85%",
        onEnter: animateSkills,
        once: true,
    });
}

/* Contact form loading state */
const form = document.querySelector(".contact-form");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");

form?.addEventListener("submit", () => {
    if (btnText) btnText.textContent = "Sending...";
    if (submitBtn) submitBtn.disabled = true;
});

/* Current year in footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
