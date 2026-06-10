const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const welcome = document.getElementById("welcome");
const historyList = document.getElementById("historyList");
const suggestions = document.querySelectorAll(".suggestions button");

let chatHistory = JSON.parse(localStorage.getItem("afzal-chat-history") || "[]");
let currentMessages = [];

const responses = {
    hello: "Hello! I'm Afzal AI, Mohammed Afzal's portfolio assistant. Ask me about his skills, projects, or experience.",
    hi: "Hi there! How can I help you today?",
    skills: "Mohammed specializes in HTML, CSS, JavaScript, React, Node.js, Python, Flask, MySQL, and MongoDB. He also builds AI-powered apps with Gemini.",
    projects: "Key projects: ResumeAI (ATS analyzer), Chatbot AI, Smart Task Analyzer, E-Commerce, Event Platform, Notes Pro, and TaskFlow. Check the portfolio for live demos!",
    experience: "Mohammed is a B.Tech CSE graduate (2026) and a working Full Stack Developer building production web applications.",
    contact: "Reach Mohammed at mohammedafzal1423@gmail.com or WhatsApp +91 84950 77385. GitHub: github.com/Afzal2004",
    resume: "You can download his CV from the portfolio homepage or email him directly.",
    html: "HTML5 provides semantic structure for modern web pages — headings, sections, forms, and accessibility.",
    css: "CSS3 enables responsive layouts, animations, flexbox, grid, and custom properties for beautiful UIs.",
    javascript: "JavaScript powers interactivity — DOM manipulation, APIs, async/await, and full stack development with Node.js.",
    react: "React is a component-based library for building fast, scalable user interfaces with reusable UI blocks.",
    python: "Python is used for backend development, automation, data processing, and AI integration with frameworks like Flask.",
    flask: "Flask is a lightweight Python web framework — perfect for APIs, SaaS tools, and AI-powered applications.",
    default: "I can help with Mohammed's skills, projects, experience, and contact info. Try asking about React, ResumeAI, or how to hire him!",
};

function getReply(msg) {
    const m = msg.toLowerCase();
    if (m.match(/\b(hello|hey|good morning|good evening)\b/)) return responses.hello;
    if (m.match(/\b(hi|hiya)\b/)) return responses.hi;
    if (m.includes("skill") || m.includes("tech") || m.includes("stack")) return responses.skills;
    if (m.includes("project") || m.includes("portfolio") || m.includes("resumeai")) return responses.projects;
    if (m.includes("experience") || m.includes("work") || m.includes("job")) return responses.experience;
    if (m.includes("contact") || m.includes("email") || m.includes("hire") || m.includes("reach")) return responses.contact;
    if (m.includes("resume") || m.includes("cv")) return responses.resume;
    if (m.includes("html")) return responses.html;
    if (m.includes("css")) return responses.css;
    if (m.includes("javascript") || m.includes(" js")) return responses.javascript;
    if (m.includes("react")) return responses.react;
    if (m.includes("python")) return responses.python;
    if (m.includes("flask")) return responses.flask;
    if (m.includes("bye") || m.includes("goodbye")) return "Goodbye! Feel free to explore the portfolio or get in touch.";
    if (m.includes("how are you")) return "I'm running smoothly! Ready to tell you about Mohammed's work.";
    if (m.includes("who are you") || m.includes("your name")) return "I'm Afzal AI — a demo assistant built for Mohammed Afzal's portfolio.";
    if (m.includes("thank")) return "You're welcome! Let me know if you need anything else.";
    return responses.default;
}

function addMessage(text, type) {
    welcome.style.display = "none";
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    currentMessages.push({ text, type });
}

function send() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";
    sendBtn.disabled = true;
    setTimeout(() => {
        addMessage(getReply(text), "ai");
        sendBtn.disabled = false;
        userInput.focus();
    }, 400);
}

sendBtn.addEventListener("click", send);
userInput.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
suggestions.forEach((btn) => { btn.addEventListener("click", () => { userInput.value = btn.textContent; send(); }); });

document.querySelector(".new-chat")?.addEventListener("click", () => {
    if (currentMessages.length) {
        chatHistory.unshift({ title: currentMessages[0]?.text?.slice(0, 30) || "Chat", messages: [...currentMessages] });
        chatHistory = chatHistory.slice(0, 8);
        localStorage.setItem("afzal-chat-history", JSON.stringify(chatHistory));
        renderHistory();
    }
    chatBox.innerHTML = "";
    currentMessages = [];
    welcome.style.display = "flex";
});

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = chatHistory.map((h, i) =>
        `<div class="history-item" data-i="${i}">${h.title}</div>`
    ).join("") || '<div class="history-item">No history yet</div>';
}

historyList?.addEventListener("click", (e) => {
    const item = e.target.closest(".history-item");
    if (!item?.dataset.i) return;
    const chat = chatHistory[+item.dataset.i];
    if (!chat) return;
    chatBox.innerHTML = "";
    welcome.style.display = "none";
    currentMessages = [];
    chat.messages.forEach((m) => addMessage(m.text, m.type));
});

renderHistory();

/* Theme */
const themeBtn = document.querySelector(".theme-btn");
const saved = localStorage.getItem("portfolio-theme");
if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    const icon = themeBtn?.querySelector("i");
    if (icon) { icon.classList.replace("fa-moon", "fa-sun"); }
}
themeBtn?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    document.documentElement.setAttribute("data-theme", isLight ? "dark" : "light");
    localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
    const icon = themeBtn?.querySelector("i");
    if (icon) {
        icon.classList.remove("fa-moon", "fa-sun");
        icon.classList.add(isLight ? "fa-moon" : "fa-sun");
    }
});

/* Particles */
const box = document.getElementById("particles");
if (box) {
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = 8 + Math.random() * 10 + "s";
        p.style.animationDelay = Math.random() * 5 + "s";
        box.appendChild(p);
    }
}
