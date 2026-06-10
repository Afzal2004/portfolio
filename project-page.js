/* Optional interactive demos loaded per project page */
window.ProjectDemos = {
    notes() {
        const list = document.getElementById("notesList");
        const input = document.getElementById("noteInput");
        const addBtn = document.getElementById("addNote");
        if (!list) return;
        let notes = JSON.parse(localStorage.getItem("portfolio-notes-demo") || "[]");
        const render = () => {
            list.innerHTML = notes.length ? notes.map((n, i) =>
                `<li><span>${n}</span><button data-i="${i}" type="button">&times;</button></li>`
            ).join("") : "<li class='empty'>No notes yet. Add one above.</li>";
        };
        const addNote = () => {
            const v = input.value.trim();
            if (!v) return;
            notes.unshift(v);
            localStorage.setItem("portfolio-notes-demo", JSON.stringify(notes.slice(0, 20)));
            input.value = "";
            render();
        };
        addBtn?.addEventListener("click", addNote);
        input?.addEventListener("keydown", (e) => { if (e.key === "Enter") addNote(); });
        list.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                notes.splice(+e.target.dataset.i, 1);
                localStorage.setItem("portfolio-notes-demo", JSON.stringify(notes));
                render();
            }
        });
        render();
    },

    taskflow() {
        const input = document.getElementById("taskInput");
        const addBtn = document.getElementById("addTask");
        const todo = document.getElementById("colTodo");
        const done = document.getElementById("colDone");
        if (!todo) return;
        const addTask = (text, col) => {
            const li = document.createElement("li");
            const isTodo = col === todo;
            li.innerHTML = `<span>${text}</span><button type="button">${isTodo ? "Done" : "Undo"}</button>`;
            li.querySelector("button").onclick = () => {
                li.remove();
                addTask(text, isTodo ? done : todo);
            };
            col.appendChild(li);
        };
        addBtn?.addEventListener("click", () => {
            const v = input.value.trim();
            if (!v) return;
            addTask(v, todo);
            input.value = "";
        });
        input?.addEventListener("keydown", (e) => { if (e.key === "Enter") addBtn?.click(); });
    },

    ecom() {
        const grid = document.getElementById("productGrid");
        const cartCount = document.getElementById("cartCount");
        if (!grid) return;
        let count = 0;
        const products = [
            { name: "Wireless Headphones", price: 2499, emoji: "🎧" },
            { name: "Smart Watch", price: 3999, emoji: "⌚" },
            { name: "Laptop Stand", price: 1299, emoji: "💻" },
            { name: "USB-C Hub", price: 899, emoji: "🔌" },
        ];
        grid.innerHTML = products.map((p, i) => `
            <div class="shop-card">
                <div class="shop-emoji">${p.emoji}</div>
                <h4>${p.name}</h4>
                <p>₹${p.price.toLocaleString()}</p>
                <button type="button" data-i="${i}">Add to cart</button>
            </div>
        `).join("");
        grid.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                count++;
                cartCount.textContent = count;
                e.target.textContent = "Added ✓";
                e.target.disabled = true;
            }
        });
    },

    smarttask() {
        const input = document.getElementById("taskName");
        const addBtn = document.getElementById("addTaskBtn");
        const tbody = document.getElementById("taskTable");
        const total = document.getElementById("statTotal");
        const done = document.getElementById("statDone");
        if (!tbody) return;
        let tasks = JSON.parse(localStorage.getItem("smarttask-demo") || "[]");
        const render = () => {
            tbody.innerHTML = tasks.map((t, i) =>
                `<tr><td>${t.name}</td><td><span class="badge ${t.done ? "done" : "pending"}">${t.done ? "Done" : "Pending"}</span></td>
                <td><button data-i="${i}" type="button">${t.done ? "Undo" : "Complete"}</button></td></tr>`
            ).join("") || "<tr><td colspan='3'>No tasks yet</td></tr>";
            total.textContent = tasks.length;
            done.textContent = tasks.filter((t) => t.done).length;
        };
        const addTask = () => {
            const v = input.value.trim();
            if (!v) return;
            tasks.push({ name: v, done: false });
            localStorage.setItem("smarttask-demo", JSON.stringify(tasks));
            input.value = "";
            render();
        };
        addBtn?.addEventListener("click", addTask);
        input?.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });
        tbody.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const i = +e.target.dataset.i;
                tasks[i].done = !tasks[i].done;
                localStorage.setItem("smarttask-demo", JSON.stringify(tasks));
                render();
            }
        });
        render();
    },

    events() {
        const grid = document.getElementById("eventGrid");
        if (!grid) return;
        const events = [
            { title: "Tech Symposium 2026", date: "Mar 15", loc: "Main Auditorium" },
            { title: "Hackathon Finals", date: "Apr 2", loc: "Lab Block" },
            { title: "Career Fair", date: "Apr 20", loc: "Sports Complex" },
            { title: "Alumni Meet", date: "May 5", loc: "Conference Hall" },
        ];
        grid.innerHTML = events.map((e) => `
            <div class="event-card">
                <span class="event-date">${e.date}</span>
                <h4>${e.title}</h4>
                <p><i class="fa-solid fa-location-dot"></i> ${e.loc}</p>
                <button type="button">Register</button>
            </div>
        `).join("");
        grid.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                e.target.textContent = "Registered ✓";
                e.target.disabled = true;
            }
        });
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const demo = document.body.dataset.demo;
    if (demo && window.ProjectDemos[demo]) ProjectDemos[demo]();
});
