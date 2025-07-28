// === AOS Init ===
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 800, once: true });

    // === Theme Load from LocalStorage ===
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "🌙";
    }

    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌞";
        }
    });

    // === Contact Form Submit ===
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value,
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
                console.error("Submit error:", err);
                alert("❌ Server error.");
            }
        });
    }
});
