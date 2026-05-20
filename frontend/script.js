const API_URL = "https://tonight-noon-syndrome-becoming.trycloudflare.com";

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

        document.getElementById("result").innerHTML =
            "<h2>Extracted Tasks</h2>" +

            data.tasks.map(task => `
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