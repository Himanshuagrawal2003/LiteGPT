# LiteGPT 🚀  

A fast, minimalist, and powerful **AI Chat Application** built for speed, clarity, and seamless conversation management.  
Powered by the high-performance **Groq Llama-3.3 engine**, LiteGPT delivers near-instant responses with a clean, distraction-free experience. ⚡  

---

## ✨ Key Features

- ⚡ **Blazing Fast Responses**  
  Powered by `llama-3.3-70b-versatile` for ultra-low latency AI generation  

- 💾 **Full Chat Persistence**  
  Integrated with **MongoDB Atlas** to store every chat session and message  

- 🛠️ **Complete CRUD Functionality**
  - ➕ Create new chat sessions  
  - 📖 View chat history in sidebar  
  - ✏️ Rename chats inline  
  - 🗑️ Delete conversations permanently  

- 🧠 **Dual Interaction Modes**
  - 💬 **Normal Mode** – Clean and direct responses  
  - 📘 **Explain Mode** – Step-by-step explanations with logic  

- 💻 **Advanced Code Blocks**
  - 📋 One-click copy for code snippets  
  - 🎯 Clean formatting with separated explanations  

- 🎨 **Modern UI/UX**
  - Glassmorphic dark theme 🌙  
  - Fully responsive (Mobile 📱 / Tablet 💻 / Desktop 🖥️)  

---

## 🎯 Why LiteGPT?

Most AI chat applications are either slow, cluttered, or lack proper session handling.  

**LiteGPT solves this by focusing on:**

- ⚡ **Speed-first AI interaction:** (Groq inference engine)  
- 🧼 **Minimal and distraction-free UI:** Focusing on content  
- 💾 **Persistent chat system:** Like professional AI tools  
- 🧠 **Learning-focused:** Dedicated explain mode for deeper understanding  

---

## 🧩 Architecture Overview

```text
Frontend (React + Vite)
        ↓
API Layer (Axios)
        ↓
Backend (Node.js + Express)
        ↓
Groq API (LLM Processing)
        +
MongoDB Atlas (Database Storage)
```

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js (Vite ⚡)  
- Tailwind CSS + Custom CSS  
- Axios  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Environment-based configuration  

### 🤖 AI Engine
- Groq Cloud API (Llama-3.3 model)  

---

## 📂 Project Structure
```text
LiteGPT/
│
├── server/
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── src/
│   ├── api/
│   ├── components/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── package.json
└── README.md
```

---

## 🏆 Highlights

- 🚀 **Full-stack System:** Built a complete AI chat system with real-time response handling  
- 💾 **Persistence:** Implemented chat storage with full CRUD operations  
- ⚡ **Optimization:** Optimized API flow for low-latency responses  
- 🎨 **Design:** Crafted a clean and production-ready UI/UX  
- 🧠 **Intelligence:** Integrated dual-mode AI logic (Normal + Explain)  

---

## ⚙️ Key Challenges Solved

- Managing fast AI responses without UI lag  
- Designing scalable chat storage in MongoDB  
- Handling real-time session updates  
- Separating explanation logic from code output  

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Himanshuagrawal2003/LiteGPT.git
cd LiteGPT
```

### 2️⃣ Install Dependencies
```bash
npm install
cd server && npm install
```

### 3️⃣ Environment Configuration

#### Frontend `.env`
```env
VITE_BACKEND_URL=http://localhost:3001
```

#### Backend `server/.env`
```env
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_atlas_uri
```

### 4️⃣ Run Application
```bash
# Terminal 1 (Server)
cd server
node index.js

# Terminal 2 (Client)
npm run dev
```

---

## 🔮 Future Enhancements

- 🌐 **Live Deployment:** (Vercel + Render)  
- 🔔 **WebSockets:** Real-time updates  
- 🤖 **Multi-model:** Support for GPT, Claude, etc.  
- 📄 **Exports:** Export chats as PDF / Markdown  
- 👥 **Collaboration:** Shared session mode  

---

## 👨‍💻 Developer

**Himanshu Agrawal**  
🔗 [GitHub Profile](https://github.com/Himanshuagrawal2003)  

---

## 📜 License & Purpose

Built with ❤️ for learning, innovation, and showcasing full-stack AI development skills.