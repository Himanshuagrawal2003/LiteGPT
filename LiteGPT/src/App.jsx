import React, { useState, useRef, useEffect } from "react";
import Chat from "./components/Chat";
import { getHistory, deleteChat, renameChat } from "./api/client";

export default function App() {
  const [started, setStarted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load history");
    }
  };

  // Global click-away listeners
  useEffect(() => {
    function handleClickOutside(e) {
      // Sidebar click-away
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
      // Dropdown menu click-away
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, activeMenuId]);

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
    setStarted(true);
    setSidebarOpen(false);
    setActiveMenuId(null);
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setStarted(true);
    setSidebarOpen(false);
    setActiveMenuId(null);
  };

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === chatId ? null : chatId);
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (confirm("Delete this chat?")) {
      try {
        await deleteChat(chatId);
        if (currentChatId === chatId) {
          setStarted(false);
          setCurrentChatId(null);
        }
        loadHistory();
      } catch (err) {
        alert("Failed to delete chat");
      }
    }
  };

  const startEditing = (e, chat) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditingChatId(chat._id);
    setEditTitle(chat.title);
  };

  const handleRename = async (e) => {
    e.preventDefault();
    try {
      await renameChat(editingChatId, editTitle);
      setEditingChatId(null);
      loadHistory();
    } catch (err) {
      alert("Failed to rename");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0e0e0e] text-white overflow-hidden font-sans">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 md:hidden z-40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0f0f0f] border-r border-[#262626] p-4 flex flex-col transition-all duration-300 z-50
        ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          onClick={startNewChat}
          className="bg-white text-black font-bold rounded-xl px-4 py-3 flex items-center justify-center gap-2 mb-6 hover:bg-gray-200 transition active:scale-95 w-full box-border shadow-lg"
        >
          <span className="text-xl">＋</span> New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-1">
          <div>
            <div className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-4 px-2 opacity-50">Recent History</div>

            <div className="space-y-1">
              {history.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => selectChat(chat._id)}
                  className={`group relative flex items-center w-full px-3 py-2.5 rounded-xl cursor-pointer transition select-none
                    ${currentChatId === chat._id ? "bg-[#222] text-white" : "text-gray-400 hover:bg-[#111] hover:text-gray-200"}
                  `}
                >
                  <span className="text-sm mr-2 opacity-30">💬</span>
                  
                  {editingChatId === chat._id ? (
                    <form onSubmit={handleRename} className="flex-1 mr-8" onClick={(e) => e.stopPropagation()}>
                      <input
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => setEditingChatId(null)}
                        className="bg-black border border-blue-500 text-white text-xs rounded px-2 py-1 w-full outline-none"
                      />
                    </form>
                  ) : (
                    <span className="flex-1 text-[11px] font-semibold truncate pr-6">{chat.title}</span>
                  )}

                  {!editingChatId && (
                    <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => toggleMenu(e, chat._id)}
                        className="p-1.5 hover:bg-[#333] rounded-md text-sm leading-none" 
                        title="Actions"
                      >⋮</button>
                      
                      {activeMenuId === chat._id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-0 top-8 bg-[#1a1a1a] border border-[#333] rounded-xl py-1 w-32 shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            onClick={(e) => startEditing(e, chat)}
                            className="w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-[#252525] transition flex items-center gap-2"
                          >
                            <span>✎</span> Rename
                          </button>
                          <button 
                            onClick={(e) => handleDelete(e, chat._id)}
                            className="w-full text-left px-4 py-2 text-[10px] font-bold text-red-400 hover:bg-red-900/20 transition flex items-center gap-2"
                          >
                            <span>🗑</span> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {history.length === 0 && (
                <p className="px-3 text-gray-600 text-[10px] italic">No past conversations</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#262626] flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xs shadow-inner">H</div>
          <div className="overflow-hidden">
            <p className="font-bold text-xs text-gray-200 truncate">Himanshu Agrawal</p>
            <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Enterprise Mode</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#0e0e0e]">
        {!started ? (
          <div className="flex flex-col flex-1 items-center justify-center text-center px-4 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-br from-white via-gray-400 to-gray-900 bg-clip-text text-transparent mb-10 tracking-tighter">
              Ready to create?
            </h2>

            <div
              className="w-full bg-[#161616] border border-[#262626] p-6 rounded-[2.5rem] 
                         cursor-pointer hover:bg-[#1c1c1c] hover:border-[#333] transition-all transform hover:-translate-y-1 
                         flex items-center px-8 shadow-2xl group"
              onClick={startNewChat}
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-2xl mr-6 group-hover:scale-110 transition">＋</div>
              <div className="text-left">
                <p className="text-gray-100 font-bold text-sm">Start a new chat</p>
                <p className="text-gray-500 text-[11px] font-medium">Your creative AI partner is ready to help.</p>
              </div>
            </div>
          </div>
        ) : (
          <Chat 
            setSidebarOpen={setSidebarOpen} 
            chatId={currentChatId} 
            setChatId={setCurrentChatId}
            onNewMessage={loadHistory} 
          />
        )}
      </main>
    </div>
  );
}
