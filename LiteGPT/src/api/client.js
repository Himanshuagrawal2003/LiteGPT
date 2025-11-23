import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const sendPrompt = async (userPrompt) => {
  const response = await axios.post(`${BACKEND_URL}/api/generate`, {
    prompt: userPrompt,
  });

  return response.data;
};
