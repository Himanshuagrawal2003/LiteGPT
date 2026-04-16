# LiteGPT 🚀
A premium, minimalist AI chat interface built for speed and clarity. Powered by high-performance Large Language Models via **Groq**.

![LiteGPT Preview](https://github.com/Himanshuagrawal2003/LiteGPT/blob/main/preview.png?raw=true) *(Replace with your screenshot link later)*

## ✨ Key Features
- **⚡ Groq-Powered Speed:** Leveraging the `llama-3.3-70b-versatile` model for lightning-fast, ChatGPT-like responses.
- **🧠 Dual Personality Mode:**
  - **Normal Mode:** Concise, friendly, and direct answers.
  - **Explain Mode:** In-depth, educational breakdowns—perfect for learning and deep dives.
- **💻 Pro Code Management:**
  - **Dedicated Copy Buttons:** Every code block has its own independent "COPY CODE" button.
  - **Optimized Output:** Automatically generates well-commented and optimized code with usage examples.
- **📱 Responsive & Sleek:** Fully optimized for mobile and tablets with a modern, glassmorphic dark theme.
- **📋 Universal Copy:** A minimalist clipboard icon for copying the entire conversation effortlessly.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Vanilla CSS.
- **Backend:** Node.js, Express, Axios.
- **AI Engine:** Groq API (Llama 3.3).

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A **Groq API Key** (Get it for free at [Groq Cloud](https://console.groq.com/keys)).

### 2. Installation
Clone the repository and install dependencies for both the frontend and the server.

```bash
# Clone the repo
git clone https://github.com/Himanshuagrawal2003/LiteGPT.git
cd LiteGPT

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd server
npm install
```

### 3. Environment Setup
Create a `.env` file in the root and in the `/server` directory.

**Frontend (`.env`):**
```env
VITE_BACKEND_URL=http://localhost:3001
```

**Backend (`server/.env`):**
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Running the App
You need to run both the frontend and the backend server.

**Start the Server:**
```bash
cd server
node index.js
```

**Start the Frontend:**
```bash
# In a new terminal
npm run dev
```

Visit `http://localhost:5173` to start chatting!

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
Built with ❤️ by [Himanshu Agrawal](https://github.com/Himanshuagrawal2003)
