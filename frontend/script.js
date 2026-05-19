const API_URL = "https://disciplinary-resulting-chapters-animated.trycloudflare.com";

console.log("JS LOADED SUCCESSFULLY");

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("extractBtn");

    console.log("Button found:", btn);

    if (!btn) {
        alert("Button NOT found - HTML issue");
        return;
    }

    btn.addEventListener("click", extractTasks);
});

async function extractTasks() {
    console.log("BUTTON CLICKED");

    const notes = document.getElementById("notes").value;
    console.log("Notes:", notes);

    const resultDiv = document.getElementById("result");

    try {
        resultDiv.innerHTML = "Processing...";

        const response = await fetch(`${API_URL}/extract-tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes })
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Data received:", data);

        resultDiv.innerHTML = "<h3>Extracted Tasks</h3>";

        const ul = document.createElement("ul");

        (data.tasks || []).forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<input type='checkbox'> ${task}`;
            ul.appendChild(li);
        });

        resultDiv.appendChild(ul);

    } catch (err) {
        console.error("ERROR:", err);
        resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}