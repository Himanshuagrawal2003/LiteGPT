import axios from "axios";

export async function sendPrompt(prompt) {
  const res = await axios.post("http://localhost:3001/api/generate", {
    prompt,
  });
  return res.data;
}
