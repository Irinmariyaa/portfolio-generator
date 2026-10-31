
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("feedbackName").value.trim();
    const rating = document.querySelector(
        'input[name="rating"]:checked'
    )?.value;

    const message = document.getElementById("feedbackMessage").value.trim();

    if (!rating) {
        alert("Please select a rating.");
        return;
    }

    const feedbackData = {
        name: name || "Anonymous",
        rating: Number(rating),
        message
    };

    const status = document.getElementById("feedbackStatus");
    const submitButton = feedbackForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to submit feedback.");
        }

        status.textContent = "Thank you! Your feedback was saved successfully.";
        status.className = "success-message";

        feedbackForm.reset();

    } catch (error) {
        status.textContent = error.message;
        status.className = "error-message";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Feedback";
    }
});
