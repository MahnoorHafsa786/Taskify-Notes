const API_URL = "https://algorithms-technical-occupational-sure.trycloudflare.com";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("extractBtn");

    if (!btn) {
        console.log("Button not found - check HTML id");
        return;
    }

    btn.addEventListener("click", extractTasks);

    loadHistory();
});

async function extractTasks() {

    const notesEl = document.getElementById("notes");
    const resultDiv = document.getElementById("result");

    if (!notesEl) {
        console.log("Notes input not found");
        return;
    }

    const notes = notesEl.value;

    try {
        const response = await fetch(`${API_URL}/extract-tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes })
        });

        const data = await response.json();

        resultDiv.innerHTML = `
            <h3>Summary</h3>
            <pre>${data.summary}</pre>

            <h3>Tasks</h3>
            <ul>
                ${data.tasks.map(t => `<li>${t}</li>`).join("")}
            </ul>
        `;

        loadHistory();

    } catch (error) {
        console.log("FETCH ERROR:", error);
        resultDiv.innerHTML = "Backend not reachable ❌";
    }
}

async function loadHistory() {

    try {
        const res = await fetch(`${API_URL}/history`);
        const data = await res.json();

        const div = document.getElementById("history");
        if (!div) return;

        div.innerHTML = "";

        data.forEach(item => {
            div.innerHTML += `
                <div style="margin-bottom:10px;">
                    <b>${item.time || ""}</b><br>
                    ${item.summary}
                </div>
            `;
        });

    } catch (err) {
        console.log("History error:", err);
    }
}