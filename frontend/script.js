const API_URL = "https://trinity-salary-bare-guam.trycloudflare.com";

document.getElementById("extractBtn").addEventListener("click", async () => {

    const notes = document.getElementById("notes").value;

    document.getElementById("result").innerHTML = "Processing...";

    try {

        const response = await fetch(API_URL + "/extract-tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes })
        });

        const data = await response.json();

        // Handles both array and text responses safely
        let tasks = [];

        if (Array.isArray(data.tasks)) {
            tasks = data.tasks;
        } else {
            tasks = data.tasks
                .split("\n")
                .filter(task => task.trim() !== "");
        }

        document.getElementById("result").innerHTML =
            "<h2>Extracted Tasks</h2>" +

            tasks.map(task => `
                <div class="task-item">
                    <input type="checkbox">
                    <span>${task}</span>
                </div>
            `).join("");

    } catch (error) {

        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Failed to fetch tasks</p>";
    }

});