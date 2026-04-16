import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export const sendPrompt = async (userPrompt, explain = false, chatId = null) => {
  const response = await axios.post(`${BACKEND_URL}/api/generate`, {
    prompt: userPrompt,
    explain: explain,
    chatId: chatId,
  });

  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/history`);
  return response.data;
};

export const getChatMessages = async (chatId) => {
  const response = await axios.get(`${BACKEND_URL}/api/history/${chatId}`);
  return response.data;
};

export const renameChat = async (chatId, title) => {
  const response = await axios.patch(`${BACKEND_URL}/api/history/${chatId}`, {
    title,
  });
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await axios.delete(`${BACKEND_URL}/api/history/${chatId}`);
  return response.data;
};
