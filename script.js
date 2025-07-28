// === DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
    // === AOS Init ===
    AOS.init({ duration: 800, once: true });

    // === Theme Toggle ===
  const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

// Apply saved theme on page load
if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    if (themeToggle) themeToggle.textContent = "🌙";
}

// Theme toggle handler
themeToggle?.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-mode");
    const isLight = document.documentElement.classList.contains("light-mode");

    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙" : "🌞";
});

    // === Load Projects from JSON ===
    fetch("projects.json")
        .then(res => res.json())
        .then(projects => {
            const projectContainer = document.querySelector("#projects .grid");
            if (!projectContainer) return;

            projectContainer.innerHTML = "";

            projects.forEach(project => {
                const card = document.createElement("div");
                card.className = "bg-gray-800 p-4 rounded shadow-md";
                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="rounded mb-3" loading="lazy">
                    <h3 class="text-xl font-semibold text-white">${project.title}</h3>
                    <p class="text-gray-300 text-sm">${project.description}</p>
                `;
                projectContainer.appendChild(card);
            });
        })
        .catch(err => console.error("❌ Failed to load projects:", err));

    // === Contact Form Submit ===
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                message: this.message.value.trim(),
            };

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.success) {
                    alert("✅ Message sent successfully!");
                    this.reset();
                } else {
                    alert("❌ Failed to send message.");
                }
            } catch (err) {
                console.error("❌ Submit error:", err);
                alert("❌ Server error.");
            }
        });
    }
});
