

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    formStatus.textContent = "Sending message...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong.");
        }

        formStatus.textContent = result.message;
        contactForm.reset();

    } catch (error) {
        formStatus.textContent =
            "Could not send the message. Please try again.";
        console.error(error);
    }
});





const themeToggle = document.getElementById("themeToggle");

function applyTheme() {
    const isDark = localStorage.getItem("portfolioTheme") === "dark";

    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

applyTheme();

themeToggle.addEventListener("click", function() {
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
    applyTheme();
});

const introScreen = document.getElementById("introScreen");
const enterPortfolio = document.getElementById("enterPortfolio");

enterPortfolio.addEventListener("click", function() {
    introScreen.classList.add("intro-hidden");
});

