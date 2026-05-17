async function extractTasks() {

    const notes = document.getElementById("notes").value;

    const response = await fetch(" http://127.0.0.1:8000/extract-tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            notes: notes
        })
    });

    const data = await response.json();

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "<h2>Extracted Tasks</h2>";

    const ul = document.createElement("ul");

    data.tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox">
            ${task}
        `;

        ul.appendChild(li);
    });

    resultDiv.appendChild(ul);
}