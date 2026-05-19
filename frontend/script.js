const API_URL = "https://disciplinary-resulting-chapters-animated.trycloudflare.com";

document.getElementById("extractBtn").addEventListener("click", extractTasks);

async function extractTasks() {
    const notes = document.getElementById("notes").value;
    const resultDiv = document.getElementById("result");

    if (!notes.trim()) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter some notes</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Processing...</p>";

    try {
        const response = await fetch(`${API_URL}/extract-tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes: notes })
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        resultDiv.innerHTML = "<h3>Extracted Tasks</h3>";

        const ul = document.createElement("ul");

        if (!data.tasks || data.tasks.length === 0) {
            resultDiv.innerHTML += "<p>No tasks found</p>";
            return;
        }

        data.tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox"> ${task}`;
            ul.appendChild(li);
        });

        resultDiv.appendChild(ul);

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}