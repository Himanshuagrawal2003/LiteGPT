# 🚀 LiteGPT – AI Chat Application

LiteGPT is a modern, clean AI chat application inspired by the ChatGPT interface.  
It features a React (Vite) frontend and a Node.js backend powered by the Google Gemini API.

## 📁 Project Structure

```
LiteGPT/
│── public/
│
│── server/                 # Backend
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env (ignored)
│
│── src/                    # Frontend
│   ├── api/
│   │   └── client.js
│   ├── assets/
│   │   └── Logo.png
│   ├── components/
│   │   └── Chat.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│
│── index.html
│── package.json
│── vite.config.js
│── eslint.config.js
│── README.md
```

## ✨ Features

- ChatGPT-style UI  
- Responsive design  
- Auto-scroll chat container  
- Google Gemini API integration  
- Clean modular code  

## 🧩 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- CORS
- Google Gemini API

## ⚙️ Installation

### Clone the project
```bash
git clone https://github.com/Himanshuagrawal2003/LiteGPT.git
cd LiteGPT
```

# 🖥 Backend Setup

```bash
cd server
npm install
```

Create `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

Start backend:
```bash
node index.js
```

Backend runs on:
```
http://localhost:3001
```

# 💻 Frontend Setup

```bash
cd ..
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

## 🌐 Frontend Environment Variable

Create `.env` in project root:

```
VITE_BACKEND_URL=http://localhost:3001
```

Deploy version:
```
VITE_BACKEND_URL=https://your-render-backend.onrender.com
```

## 📡 API Usage

### Request
```json
{
  "prompt": "Hello"
}
```

### Response
```json
{
  "reply": "Hi! How can I assist you today?"
}
```

## ☁️ Backend Deployment (Render)

1. Upload `/server` folder to separate GitHub repo  
2. Render → New Web Service  
3. Configure:

| Setting | Value |
|--------|--------|
| Build Command | npm install |
| Start Command | node index.js |
| Environment | Node |

Add env:
```
GEMINI_API_KEY=your_key
```

## 📜 License
Feel free to use and modify.

## ⭐ Support
Give the repo a star if you find it helpful!
