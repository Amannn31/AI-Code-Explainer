async function explainCode() {

    const code = document.getElementById("code").value;

    if (code.trim() === "") {
        alert("Please paste some code first!");
        return;
    }

    document.getElementById("output").textContent = "Loading...";

    try {

        const response = await fetch("/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json();

        document.getElementById("output").textContent = data.answer;

    } catch (error) {
        document.getElementById("output").textContent =
            "Error connecting to the server.";
    }
}