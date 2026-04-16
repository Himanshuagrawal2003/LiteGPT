require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Schemas
const ChatSchema = new mongoose.Schema({
  title: { type: String, default: "New Chat" },
  createdAt: { type: Date, default: Date.now },
});

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  role: { type: String, required: true }, // 'user' or 'assistant'
  content: { type: String, required: true }, // formatted for UI
  raw: { type: String, required: true }, // raw text for copying
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", ChatSchema);
const Message = mongoose.model("Message", MessageSchema);

// --- Routes ---

// Get all chat sessions
app.get("/api/history", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Get messages for a specific chat
app.get("/api/history/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Rename a chat
app.patch("/api/history/:chatId", async (req, res) => {
  const { title } = req.body;
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      { title },
      { new: true }
    );
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to rename chat" });
  }
});

// Delete a chat and its messages
app.delete("/api/history/:chatId", async (req, res) => {
  try {
    console.log("Attempting to delete chat:", req.params.chatId);
    await Chat.findByIdAndDelete(req.params.chatId);
    await Message.deleteMany({ chatId: req.params.chatId });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete chat", details: err.message });
  }
});

// Generate response and save to DB
app.post("/api/generate", async (req, res) => {
  const { prompt, explain, chatId } = req.body;

  try {
    let currentChatId = chatId;

    // If no chatId provided, create a new Chat session
    if (!currentChatId) {
      const newChat = new Chat({
        title: prompt.substring(0, 30) + (prompt.length > 30 ? "..." : ""),
      });
      const savedChat = await newChat.save();
      currentChatId = savedChat._id;
    }

    // Save user message
    await new Message({
      chatId: currentChatId,
      role: "user",
      content: prompt,
      raw: prompt,
    }).save();

    // Dynamically set system prompt based on explainMode
    const systemPrompt = explain
      ? "You are LiteGPT in EXPLAIN mode. Act as a teacher. Break down the logic OUTSIDE of code blocks. Inside code blocks, use only necessary, concise comments. Ensure code is optimized and follows best practices."
      : "You are LiteGPT in NORMAL mode. Be direct and concise. When providing code, keep it clean with minimal but helpful comments. Move detailed explanations outside the code block.";

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const result = response.data.choices?.[0]?.message?.content ?? "No response";

    // Save assistant message
    await new Message({
      chatId: currentChatId,
      role: "assistant",
      content: result,
      raw: result,
    }).save();

    res.json({ reply: result, chatId: currentChatId });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} (CRUD Enabled)`)
);
