const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const routes = [
    { path: "/", file: "index.html" },
    { path: "/g", file: "games.html" },
    { path: "/a", file: "apps.html" },
    { path: "/r", file: "ai.html" },
    { path: "/s", file: "settings.html" },
    { path: "/m", file: "media.html" },
    { path: "/!", file: "search.html" },
    { path: "/404", file: "404.html" },
];

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, "public", route.file));
    });
});

let conversationHistory = [];

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const response = await axios.post(
            "https://api.groq.com/v1/chat/completions",
            {
                messages: conversationHistory.map(entry => ({
                    role: "user",
                    content: entry.user,
                })).concat([{ role: "user", content: message }]),
                model: "llama-3.3-70b-versatile",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
            }
        );

        const modelResponse = response.data.choices[0]?.message?.content || "No response received.";

        conversationHistory.push({ user: message, response: modelResponse });

        if (conversationHistory.length > 20) {
            conversationHistory.shift();
        }

        res.json({ response: modelResponse });
    } catch (error) {
        console.error("Error communicating with Groq API:", error);
        res.status(500).json({ error: "Error communicating with Groq API." });
    }
});

app.use((req, res) => {
    res.redirect("/404");
});

const bareServer = createBareServer("/bare/");
const server = http.createServer((req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
