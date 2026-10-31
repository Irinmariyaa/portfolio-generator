
const form = document.getElementById("portfolioForm");

// Add a simple input field
function addInput(containerId, name, placeholder) {
    const container = document.getElementById(containerId);

    const wrapper = document.createElement("div");
    wrapper.className = "repeatable-item";

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.placeholder = placeholder;
    input.required = true;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "secondary-button";
    removeButton.addEventListener("click", () => wrapper.remove());

    wrapper.appendChild(input);
    wrapper.appendChild(removeButton);
    container.appendChild(wrapper);
}

// Add an education entry
document.getElementById("addEducation").addEventListener("click", () => {
    const container = document.getElementById("educationFields");

    const wrapper = document.createElement("div");
    wrapper.className = "repeatable-item";

    wrapper.innerHTML = `
        <input type="text" name="institution" placeholder="Institution name">
        <input type="text" name="qualification" placeholder="Degree or qualification">
        <input type="text" name="year" placeholder="Year">
        <button type="button" class="secondary-button remove-item">Remove</button>
    `;

    wrapper.querySelector(".remove-item").addEventListener("click", () => {
        wrapper.remove();
    });

    container.appendChild(wrapper);
});

// Add skills
document.getElementById("addSkill").addEventListener("click", () => {
    addInput("skillFields", "skill", "Enter a skill");
});

// Add achievements
document.getElementById("addAchievement").addEventListener("click", () => {
    addInput("achievementFields", "achievement", "Enter an achievement");
});

// Add hobbies
document.getElementById("addHobby").addEventListener("click", () => {
    addInput("hobbyFields", "hobby", "Enter a hobby");
});

// Add projects
document.getElementById("addProject").addEventListener("click", () => {
    const container = document.getElementById("projectFields");

    const wrapper = document.createElement("div");
    wrapper.className = "repeatable-item";

    wrapper.innerHTML = `
        <input type="text" name="projectName" placeholder="Project name">
        <textarea name="projectDescription" placeholder="Project description"></textarea>
        <input type="text" name="projectLink" placeholder="Project link (optional)">
        <button type="button" class="secondary-button remove-item">Remove</button>
    `;

    wrapper.querySelector(".remove-item").addEventListener("click", () => {
        wrapper.remove();
    });

    container.appendChild(wrapper);
});

// Preview profile photo
let profileImageData = "";

document.getElementById("profileImage").addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        this.value = "";
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("Please select an image smaller than 2 MB.");
        this.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        profileImageData = event.target.result;

        document.getElementById("photoPreview").innerHTML = `
            <img src="${profileImageData}" alt="Profile photo preview">
        `;
    };

    reader.readAsDataURL(file);
});

// Collect input values
function getValues(name) {
    return Array.from(document.querySelectorAll(`[name="${name}"]`))
        .map(input => input.value.trim())
        .filter(value => value !== "");
}

// Submit portfolio form
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const education = [];

    document.querySelectorAll("#educationFields .repeatable-item")
        .forEach(item => {
            const institution = item.querySelector('[name="institution"]').value.trim();
            const qualification = item.querySelector('[name="qualification"]').value.trim();
            const year = item.querySelector('[name="year"]').value.trim();

            if (institution || qualification || year) {
                education.push({ institution, qualification, year });
            }
        });

    const projects = [];

    document.querySelectorAll("#projectFields .repeatable-item")
        .forEach(item => {
            const name = item.querySelector('[name="projectName"]').value.trim();
            const description = item.querySelector('[name="projectDescription"]').value.trim();
            const link = item.querySelector('[name="projectLink"]').value.trim();

            if (name || description || link) {
                projects.push({ name, description, link });
            }
        });

    const portfolioData = {
        name: document.getElementById("name").value.trim(),
        title: document.getElementById("title").value.trim(),
        about: document.getElementById("about").value.trim(),
        profileImage: profileImageData,
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        location: document.getElementById("location").value.trim(),
        education,
        skills: getValues("skill"),
        achievements: getValues("achievement"),
        hobbies: getValues("hobby"),
        projects
    };

    try {
        const response = await fetch("/api/portfolios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(portfolioData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save portfolio.");
        }

        localStorage.setItem("portfolioId", result.portfolio._id);

        window.location.href = "portfolio.html";

    } catch (error) {
        alert("Error saving portfolio: " + error.message);
        console.error(error);
    }
});
