const codeInput = document.getElementById("code");
const output = document.getElementById("output");
const counter = document.getElementById("counter");

// Character Counter
codeInput.addEventListener("input", () => {
    counter.textContent = `${codeInput.value.length} / 5000`;
});

// Explain Code
async function explainCode() {

    const code = codeInput.value.trim();

    if (!code) {
        alert("Please paste some code first!");
        return;
    }

   output.innerHTML = `
    <div class="loading">

    <div class="loader"></div>

    <h3>🤖 Gemini AI is analyzing your code...</h3>

    <p>Please wait a few seconds.</p>

    </div>
    `;

    try {

        const response = await fetch("/explain", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                code
            })

        });

        const data = await response.json();

        output.textContent = data.answer;

    }

    catch (err) {

        output.innerHTML = `
        <div class="empty-state">

        <i class="fa-solid fa-circle-xmark"></i>

        <h3>Something went wrong</h3>

        <p>Please try again.</p>

        </div>
        `;

    }

}

// Copy Output
function copyOutput() {

    navigator.clipboard.writeText(output.textContent);

    const btn = document.getElementById("copyBtn");

    btn.innerHTML = "✅ Copied!";

    setTimeout(() => {

        btn.innerHTML = `
<i class="fa-regular fa-copy"></i>
Copy
`;

    },1500);

}

// Clear Code
function clearCode(){

    codeInput.value="";

   output.innerHTML=`

<div class="empty-state">

<i class="fa-solid fa-robot"></i>

<h3>Ready to Explain</h3>

<p>
Paste your code and click
<b>Explain Code</b>.
</p>

</div>

`;

    counter.textContent="0 / 5000";

}
function toggleTheme(){

    document.body.classList.toggle("light");

    const btn = document.getElementById("themeBtn");

    if(document.body.classList.contains("light")){

        btn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';

    }else{

        btn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';

    }

}