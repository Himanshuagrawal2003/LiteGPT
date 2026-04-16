import React, { useState, useRef, useEffect } from "react";
import { sendPrompt, getChatMessages } from "../api/client";

// Separate CodeBlock component for interactive buttons
const CodeBlock = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block group/code relative mb-4 last:mb-0">
      <div className="code-header flex justify-between items-center px-4 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a] text-xs font-mono text-gray-400">
        <span>{lang}</span>
        <button
          onClick={copyCode}
          className="text-[10px] bg-[#333] hover:bg-[#444] px-2 py-1 rounded transition-colors flex items-center gap-1"
        >
          {copied ? "✅ COPIED" : "📋 COPY CODE"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-gray-300">
        <code className="block whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default function Chat({ setSidebarOpen, chatId, setChatId, onNewMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [explainMode, setExplainMode] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Load messages when chatId changes
  useEffect(() => {
    if (chatId) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getChatMessages(chatId);
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages");
    } finally {
      setLoading(false);
      scrollBottom();
    }
  };

  const scrollBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const parseBlocks = (text) => {
    if (!text) return [];
    const regex = /(```[\s\S]+?```)/g;
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      const trimmedPart = part.trim();
      if (trimmedPart.startsWith("```") && trimmedPart.endsWith("```")) {
        // Extract language and code body
        const match = trimmedPart.match(/^```(\w+)?\n?([\s\S]*?)```$/);
        if (match) {
          return {
            type: "code",
            lang: match[1] || "code",
            content: match[2].trim(),
            id: index
          };
        }
      }
      return {
        type: "text",
        content: part,
        id: index
      };
    });
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<span class='font-semibold'>$1</span>")
      .replace(/^- /gm, "👉 ")
      .replace(/\n/g, "<br/>");
  };

  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input, raw: input, _id: Date.now() };
    setMessages((m) => [...m, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await sendPrompt(currentInput, explainMode, chatId);
      
      const assistantMsg = { role: "assistant", content: res.reply, raw: res.reply, _id: Date.now() + 1 };
      setMessages((m) => [...m, assistantMsg]);
      
      // If a new chat was created, update the current chatId and refresh history
      if (!chatId && res.chatId) {
        setChatId(res.chatId);
        onNewMessage(); // Refetch history list in App.jsx
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", raw: "⚠ Error: Something went wrong.", _id: Date.now() + 2 },
      ]);
    } finally {
      setLoading(false);
      scrollBottom();
    }
  };

  const enter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d0d0d] text-white overflow-hidden">
      <div className="w-full p-4 border-b border-[#1f1f1f] bg-[#101010]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-2xl mr-4 hover:text-gray-400 transition">☰</button>
          <h2 className="text-lg font-bold tracking-tight">LiteGPT</h2>
        </div>
        <button
          onClick={() => setExplainMode(!explainMode)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition duration-300 ${
            explainMode ? "bg-blue-600 border-transparent text-white" : "bg-[#1a1a1a] border-[#333] text-gray-400"
          }`}
        >
          {explainMode ? "💡 EXPLAIN ON" : "💡 EXPLAIN OFF"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 max-w-5xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={msg._id || i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-black border border-gray-600 flex items-center justify-center text-gray-300 mr-4 shrink-0 shadow-lg">L</div>
            )}

            <div
              className={`max-w-[100%] md:max-w-[85%] px-5 py-4 rounded-3xl leading-relaxed break-words overflow-hidden relative group shadow-2xl transition-all duration-300
                ${msg.role === "user" ? "bg-[#2b2b2b] text-white rounded-br-none" : "bg-[#111] text-gray-300 border border-[#222] rounded-bl-none"}`}
              style={{ wordBreak: "break-word" }}
            >
              {msg.role === "assistant" ? (
                parseBlocks(msg.raw).map((block) => (
                  block.type === "code" ? (
                    <CodeBlock key={block.id} lang={block.lang} code={block.content} />
                  ) : (
                    <div 
                      key={block.id} 
                      className="whitespace-pre-wrap mb-4 last:mb-0"
                      dangerouslySetInnerHTML={{ __html: formatText(block.content) }}
                    />
                  )
                ))
              ) : (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              )}

              <div className="flex justify-end mt-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => copyToClipboard(msg.raw, i)}
                  className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-[9px] font-bold flex items-center justify-center transition hover:bg-black"
                  title="Copy Full Message"
                >
                  {copiedIndex === i ? "✅" : "📋"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {loading && messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-20 text-gray-500 animate-pulse">Loading history…</div>
        )}

        {loading && messages.length > 0 && (
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-600">L</div>
            <div className="bg-[#111] border border-[#222] px-5 py-4 rounded-3xl text-gray-500 text-sm italic">LiteGPT is thinking…</div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent">
        <div className="flex items-center gap-4 max-w-4xl mx-auto bg-[#1a1a1a] p-2 rounded-2xl border border-[#2a2a2a] shadow-2xl focus-within:border-[#444] transition-colors focus-within:ring-1 focus-within:ring-[#444]">
          <textarea
            ref={inputRef}
            placeholder="How can I help you today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={enter}
            className="flex-1 bg-transparent text-white p-3 h-[52px] min-h-[52px] max-h-40 rounded-xl resize-none outline-none text-sm placeholder:text-gray-600"
          />
          <button
            onClick={send}
            disabled={loading}
            className="w-11 h-11 bg-white text-black rounded-xl flex items-center justify-center text-xl hover:bg-gray-200 active:scale-95 transition-all disabled:bg-gray-800 disabled:text-gray-600 shrink-0"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
