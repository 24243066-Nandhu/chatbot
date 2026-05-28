
async function sendMessage() {

    const input = document.getElementById("input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    // User Message

    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;

    chatBox.appendChild(userDiv);

    // Clear Input

    input.value = "";

    // Auto Scroll

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        // Send to Backend

        const response = await fetch("http://localhost:5000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        // Bot Message

        const botDiv = document.createElement("div");
        botDiv.className = "bot-message";

        botDiv.innerText = data.reply;

        chatBox.appendChild(botDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        console.log(error);

        const errorDiv = document.createElement("div");

        errorDiv.className = "bot-message";

        errorDiv.innerText = "⚠️ Server Error";

        chatBox.appendChild(errorDiv);
    }
}

