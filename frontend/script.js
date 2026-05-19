const API_URL = "https://diagram-tcp-appears-asthma.trycloudflare.com";
document.getElementById("extractBtn").addEventListener("click", extractTasks);

async function extractTasks() {

    const notes = document.getElementById("notes").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Processing...";

    const response = await fetch(`${API_URL}/extract-tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes })
    });

    const data = await response.json();

    resultDiv.innerHTML = `
        <h3>📌 Clean Notes</h3>
        <pre>${data.summary}</pre>

        <h3>✅ Tasks</h3>
        <ul>
            ${data.tasks.map(t => `<li>${t}</li>`).join("")}
        </ul>
    `;
}