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

        const data = await res.json();

        document.getElementById("result").innerHTML =
            data.tasks.map(task => `
                <div class="task">
                    <input type="checkbox">
                    <span>${task}</span>
                </div>
            `).join("");

    } catch (err) {
        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Failed to fetch tasks</p>";
    }
});