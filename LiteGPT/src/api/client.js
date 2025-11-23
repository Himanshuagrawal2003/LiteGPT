const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const response = await axios.post(`${BACKEND_URL}/api/chat`, {
  prompt: userPrompt,
});
