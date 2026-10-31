
const portfolioId = localStorage.getItem("portfolioId");

async function loadPortfolio() {
    if (!portfolioId) {
        document.getElementById("portfolioDisplay").innerHTML =
            "<p>No portfolio found. Please create one first.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/portfolios/${portfolioId}`);

        if (!response.ok) {
            throw new Error("Could not load portfolio.");
        }

        const data = await response.json();

        document.getElementById("displayName").textContent = data.name || "";
        document.getElementById("displayTitle").textContent = data.title || "";
        document.getElementById("displayAbout").textContent = data.about || "";

        const image = document.getElementById("displayImage");

        if (data.profileImage) {
            image.src = data.profileImage;
            image.style.display = "inline-block";
        } else {
            image.style.display = "none";
        }

        document.getElementById("displayEmail").textContent =
            data.email ? "Email: " + data.email : "";

        document.getElementById("displayPhone").textContent =
            data.phone ? "Phone: " + data.phone : "";

        document.getElementById("displayLocation").textContent =
            data.location ? "Location: " + data.location : "";

        showEducation(data.education || []);
        showList("displaySkills", data.skills || []);
        showList("displayAchievements", data.achievements || [], "ul");
        showList("displayHobbies", data.hobbies || []);
        showProjects(data.projects || []);

        document.querySelector(".loading-message")?.remove();

    } catch (error) {
        console.error(error);

        document.getElementById("portfolioDisplay").innerHTML =
            "<p>Unable to load your portfolio. Please try again.</p>";
    }
}

// EDUCATION

function showEducation(education) {
    const container = document.getElementById("displayEducation");
    container.innerHTML = "";

    education.forEach(item => {
        const card = document.createElement("div");
        card.className = "portfolio-item";

        const heading = document.createElement("h3");
        heading.textContent = item.qualification || "";

        const institution = document.createElement("p");
        institution.textContent = item.institution || "";

        const year = document.createElement("p");
        year.textContent = item.year || "";

        card.append(heading, institution, year);
        container.appendChild(card);
    });

    hideIfEmpty("educationSection", education.length);
}

// SKILLS, ACHIEVEMENTS AND HOBBIES

function showList(containerId, items, tag = "div") {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    items.forEach(item => {
        const element = document.createElement(
            tag === "ul" ? "li" : "span"
        );

        element.textContent = item;

        if (tag !== "ul") {
            element.className = "portfolio-tag";
        }

        container.appendChild(element);
    });

    const section = container.closest(".portfolio-section");

    if (section) {
        section.style.display = items.length ? "block" : "none";
    }
}

// PROJECTS

function showProjects(projects) {
    const container = document.getElementById("displayProjects");
    container.innerHTML = "";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "portfolio-item";

        const heading = document.createElement("h3");
        heading.textContent = project.name || "";

        const description = document.createElement("p");
        description.textContent = project.description || "";

        card.append(heading, description);

        if (project.link) {
            const link = document.createElement("a");

            link.href = project.link;
            link.textContent = "View Project";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);
        }

        container.appendChild(card);
    });

    hideIfEmpty("projectsSection", projects.length);
}

// HIDE EMPTY SECTIONS

function hideIfEmpty(sectionId, count) {
    document.getElementById(sectionId).style.display =
        count ? "block" : "none";
}

// DARK MODE

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("themeToggle");

    button.textContent =
        document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});


// LOAD PORTFOLIO

loadPortfolio();
