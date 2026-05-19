const API_URL = "https://involvement-parliament-continent-consider.trycloudflare.com";";

document.getElementById("extractBtn").addEventListener("click", async () => {

    const notes = document.getElementById("notes").value;

    try {
        const res = await fetch(API_URL + "/extract-tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes })
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();

        // 🔥 SAME OUTPUT STYLE, just cleaner checklist
        document.getElementById("result").innerHTML =
            "<h3>Extracted Tasks</h3>" +
            data.tasks.map(task => `
                <label style="display:flex; gap:10px; align-items:center; margin:8px 0;">
                    <input type="checkbox">
                    <span>${task}</span>
                </label>
            `).join("");

    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Failed to fetch tasks</p>";
    }
});