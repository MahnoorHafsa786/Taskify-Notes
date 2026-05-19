const API_URL = "https://involvement-parliament-continent-consider.trycloudflare.com";

document.getElementById("extractBtn").addEventListener("click", async () => {

    const notes = document.getElementById("notes").value;

    const res = await fetch(API_URL + "/extract-tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes })
    });

    const data = await res.json();

    document.getElementById("result").innerHTML =
        "<h3>Tasks</h3>" +
        data.tasks.map(t => `<p>• ${t}</p>`).join("");
});