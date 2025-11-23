import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
<<<<<<< HEAD
=======
  server: {
    proxy: {
      "/api": "https://lite-gpt-96bf.vercel.app/",
    },
  },
>>>>>>> f1d5bdec40355990c25b67fbb69c2e3aaf55a822
});
