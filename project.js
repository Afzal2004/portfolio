/* Shared project page scripts */
(function () {
    const html = document.documentElement;
    const themeBtn = document.querySelector(".theme-btn");
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light") {
        html.setAttribute("data-theme", "light");
        const icon = themeBtn?.querySelector("i");
        if (icon) { icon.classList.replace("fa-moon", "fa-sun"); }
    }

    themeBtn?.addEventListener("click", () => {
        const isLight = html.getAttribute("data-theme") === "light";
        html.setAttribute("data-theme", isLight ? "dark" : "light");
        localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
        const icon = themeBtn.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-moon", "fa-sun");
            icon.classList.add(isLight ? "fa-moon" : "fa-sun");
        }
    });
    if (saved === "light" && themeBtn) {
        const icon = themeBtn.querySelector("i");
        if (icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
    }

    const bar = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
        const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (bar) bar.style.width = `${(window.scrollY / h) * 100}%`;
    });

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    reveals.forEach((el) => observer.observe(el));

    document.getElementById("year").textContent = new Date().getFullYear();
})();
