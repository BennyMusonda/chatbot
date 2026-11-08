// ======================================================
// MESSENGER AI
// BACKEND SERVER
// ======================================================

// ======================================================
// 1. IMPORT REQUIRED PACKAGES
// ======================================================

import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// ======================================================
// 2. LOAD ENVIRONMENT VARIABLES
// ======================================================

dotenv.config();

// ======================================================
// 3. CREATE EXPRESS APPLICATION
// ======================================================

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================================
// 4. CONFIGURE MIDDLEWARE
// ======================================================

app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));

// ======================================================
// 5. INITIALIZE GEMINI
// ======================================================

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// ======================================================
// 6. CHATBOT PERSONALITY
// ======================================================

const systemInstructions = `

You are Messenger AI, a friendly AI assistant created by Benny.

Your responsibilities:

1. Answer questions clearly and accurately.
2. Help users understand programming and technology.
3. Explain difficult concepts using simple English.
4. Help with HTML, CSS, JavaScript, Node.js and databases.
5. Be respectful, friendly and conversational.
6. Avoid unnecessarily complicated explanations.
7. Admit when you do not know something.
8. Do not invent facts.
9. Use examples when explaining technical concepts.
10. Keep answers reasonably concise unless the user requests more detail.

Your name is Messenger AI.

`;

// ======================================================
// 7. HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
    res.sendFile("chatbot.html", {
        root: "public"
    });
});

// ======================================================
// 8. CHECK AI CONNECTION
// ======================================================

app.get("/api/status", (req, res) => {
    res.json({
        server: "online",
        aiAvailable: Boolean(ai),
        model: MODEL
    });
});

// ======================================================
// 9. CHAT API ROUTE
// ======================================================

app.post("/api/chat", async (req, res) => {
    try {
        if (!ai) {
            return res.status(503).json({
                error: "Gemini API is not configured."
            });
        }

        const { message, history = [] } = req.body;

        if (
            typeof message !== "string" ||
            message.trim() === ""
        ) {
            return res.status(400).json({
                error: "Please provide a valid message."
            });
        }

        if (message.length > 4000) {
            return res.status(400).json({
                error: "Your message is too long."
            });
        }

        if (!Array.isArray(history)) {
            return res.status(400).json({
                error: "Invalid conversation history."
            });
        }

        const recentHistory = history
            .filter(chat =>
                chat &&
                ["user", "bot"].includes(chat.sender) &&
                typeof chat.message === "string"
            )
            .slice(-10);

        if (recentHistory.length > 0) {
            const lastMessage = recentHistory[recentHistory.length - 1];

            if (
                lastMessage.sender === "user" &&
                lastMessage.message === message
            ) {
                recentHistory.pop();
            }
        }

        const conversation = recentHistory.map(chat => ({
            role: chat.sender === "bot" ? "model" : "user",
            parts: [
                {
                    text: chat.message
                }
            ]
        }));

        conversation.push({
            role: "user",
            parts: [
                {
                    text: message
                }
            ]
        });

        const response = await ai.models.generateContent({
            model: MODEL,
            contents: conversation,
            config: {
                systemInstruction: systemInstructions,
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        });

        const aiReply = response.text;

        if (!aiReply || !aiReply.trim()) {
            return res.status(502).json({
                error: "Gemini did not return a response."
            });
        }

        res.json({
            reply: aiReply
        });
    } catch (error) {
        console.error("Gemini API error:", error.message);

        res.status(500).json({
            error: "Messenger AI could not generate a response. Please try again."
        });
    }
});

// ======================================================
// 10. START SERVER
// ======================================================

app.listen(PORT, () => {
    console.log("----------------------------------");
    console.log("MESSENGER AI SERVER");
    console.log("----------------------------------");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Gemini configured: ${Boolean(ai)}`);
    console.log(`Model: ${MODEL}`);
    console.log("----------------------------------");
});