import React, { useState, useRef, useEffect } from "react";
import Chat from "./components/Chat";

export default function App() {
  const [started, setStarted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const closeSidebarAndStart = (value) => {
    setStarted(value);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0e0e0e] text-white overflow-hidden">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0f0f0f] border-r border-[#262626] p-5 flex flex-col transition-transform duration-300 z-50 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <button
          onClick={() => closeSidebarAndStart(false)}
          className="bg-[#1d1d1d] hover:bg-[#2a2a2a] border border-[#333] rounded-xl px-4 py-2 flex items-center gap-2 mb-4 transition"
        >
          <span className="text-lg">＋</span> New Chat
        </button>

        <div className="mt-6">
          <div className="text-xs uppercase text-gray-500 mb-2">Your Chats</div>

          <button
            onClick={() => closeSidebarAndStart(true)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1b1b1b] transition"
          >
            Chat History
          </button>
        </div>

        <div className="mt-auto pt-4 border-t border-[#262626] flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          <div>
            <p className="font-semibold">Himanshu</p>
            <p className="text-sm text-gray-400">Go</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">

        {!started ? (
          <div className="flex flex-col flex-1 items-center justify-center text-center px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-200 mb-4">
              Hey, Himanshu. Ready to dive in?
            </h2>

            <div
              className="max-w-xl w-full bg-[#1b1b1b] border border-[#333] p-4 rounded-3xl mt-3 cursor-pointer hover:bg-[#252525] transition flex items-center px-6"
              onClick={() => closeSidebarAndStart(true)}
            >
              <span className="text-xl mr-3">＋</span>
              <span className="text-gray-300 flex-1">Ask anything…</span>
            </div>
          </div>
        ) : (
          <Chat setSidebarOpen={setSidebarOpen} />
        )}
      </main>
    </div>
  );
}
