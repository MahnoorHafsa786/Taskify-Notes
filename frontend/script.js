const API_URL = "https://algorithms-technical-occupational-sure.trycloudflare.com";

console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("extractBtn");

    console.log("Button found:", btn);

    if (!btn) {
        alert("Button not found - check HTML id");
        return;
    }

    btn.addEventListener("click", async function () {

        console.log("BUTTON CLICKED");

        const notes = document.getElementById("notes").value;
        const resultDiv = document.getElementById("result");

        try {
            const res = await fetch(API_URL + "/extract-tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes })
            });

            const data = await res.json();

            console.log("RESPONSE:", data);

            resultDiv.innerHTML = `
                <h3>Summary</h3>
                <pre>${data.summary}</pre>

                <h3>Tasks</h3>
                <ul>
                    ${data.tasks.map(t => `<li>${t}</li>`).join("")}
                </ul>
            `;

        } catch (err) {
            console.log("FETCH FAILED:", err);
            resultDiv.innerHTML = "❌ Backend not reachable";
        }

    });
});