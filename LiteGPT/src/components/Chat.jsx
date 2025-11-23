import React, { useState, useRef } from "react";
import { sendPrompt } from "../api/client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [explainMode, setExplainMode] = useState(false);
  const bottomRef = useRef(null);

  function formatResponse(text) {
    return text
      .replace(/^- /gm, "👉 ")
      .replace(/\*\*(.*?)\*\*/g, "<span class='font-semibold'>$1</span>")
      .replace(/\n\n/g, "<br/><br/>");
  }

  const send = async () => {
    if (!input.trim()) return;

    const wantsExplain = input.toLowerCase().includes("explain");

    setMessages((m) => [...m, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      let finalPrompt = input;

      if (!wantsExplain && !explainMode) {
        finalPrompt += " (give short direct answer only, no explanation)";
      }

      const res = await sendPrompt(finalPrompt);
      const formatted = formatResponse(res.reply);

      setMessages((m) => [...m, { role: "assistant", content: formatted }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "<b>⚠ Error:</b> Something went wrong." },
      ]);
    }

    setLoading(false);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const enter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d0d0d] text-white overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[#1f1f1f] bg-[#101010] flex justify-between">
        <h2 className="text-lg font-semibold">LiteGPT</h2>

        <button
          onClick={() => setExplainMode(!explainMode)}
          className={`px-3 py-1 rounded-lg text-sm border transition
            ${
              explainMode
                ? "bg-blue-600 border-blue-500"
                : "bg-[#1a1a1a] border-[#333]"
            }`}
        >
          Explain Mode: {explainMode ? "ON" : "OFF"}
        </button>
      </div>

      {/* Messages box */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-300 mr-3">
                G
              </div>
            )}

            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl leading-relaxed
                ${
                  msg.role === "user"
                    ? "bg-[#3e3e3e] text-white rounded-br-none"
                    : "bg-[#161616] text-gray-200 border border-[#2b2b2b] rounded-bl-none"
                }`}
            >
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-400">
              G
            </div>
            <div className="bg-[#161616] border border-[#2b2b2b] px-4 py-3 rounded-2xl text-gray-400 italic">
              Typing…
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-[#1f1f1f] bg-[#101010]">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <textarea
            placeholder="Message LiteGPT..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={enter}
            className="flex-1 bg-[#1a1a1a] text-white border border-[#333] p-4 h-16 rounded-xl resize-none outline-none focus:ring-2 focus:ring-[#555]"
          />

          <button
            onClick={send}
            disabled={loading}
            className="w-14 h-14 bg-[#2e2e2e] rounded-xl text-white flex items-center justify-center text-xl hover:bg-[#444] disabled:bg-[#666]"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
