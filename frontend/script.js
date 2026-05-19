const API_URL = "https://available-hobby-wallpaper-relate.trycloudflare.com";

console.log("JS LOADED OK");

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("extractBtn");

    console.log("Button:", btn);

    btn.addEventListener("click", async () => {

        console.log("CLICK WORKS");

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
                "<h3>Tasks</h3>" +
                data.tasks.map(t => `<li>${t}</li>`).join("");

        } catch (e) {
            console.log("ERROR:", e);
            alert("Backend not connected ❌");
        }
    });
});