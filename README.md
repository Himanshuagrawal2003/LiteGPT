# LiteGPT – AI Chat Application

LiteGPT is a clean and modern AI chat application inspired by the classic ChatGPT interface.  
This project includes a React (Vite) frontend and a Node.js backend using the Google Gemini API.

---

## 📁 Project Structure

```
LiteGPT/
│── public/
│
│── server/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
│── src/
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

---

## 🚀 Features

- Classic ChatGPT-style UI  
- Responsive sidebar  
- Clean message bubbles  
- Auto-scroll chat  
- Gemini API integration  
- Smooth, modern UI  

---

## 🧩 Tech Stack

**Frontend:** React (Vite), TailwindCSS  
**Backend:** Node.js, Express  
**AI:** Google Gemini API  

---

## ⚙️ Installation

### Clone the project
```
git clone https://github.com/Himanshuagrawal2003/LiteGPT.git
cd LiteGPT
```

---

## 🖥 Backend Setup
```
cd server
npm install
```

Create a `.env` file:
```
GEMINI_API_KEY=your_api_key_here
```

Start backend:
```
npm run dev
```
Backend runs on:
```
http://localhost:3001
```

---

## 💻 Frontend Setup
```
cd ..
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 📡 API Example
Request:
```
POST /api/generate
{
  "prompt": "Hello"
}
```

Response:
```
{
  "reply": "Hi! How can I assist you today?"
}
```

---

## 📜 License
You are free to use and modify this project.

---

## ⭐ Support

If you like this project, consider giving it a star ⭐

