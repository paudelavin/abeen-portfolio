"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SuZuAvatar = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor" fillOpacity="0.1"/>
    <rect x="6" y="8" width="12" height="10" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13H9.01M15 13H15.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
  </svg>
);

export function SuZuChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm SuZu, Abeen's AI assistant. Ask me anything about his experience, tech stack, or blog!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || typingMessage) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setTypingMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      const fullReply = data.reply || "Sorry, I couldn't process that.";
      
      setIsLoading(false);
      let currentText = "";
      let i = 0;
      
      const interval = setInterval(() => {
        currentText += fullReply[i];
        setTypingMessage(currentText);
        i++;
        
        if (i >= fullReply.length) {
          clearInterval(interval);
          setMessages((prev) => [...prev, { role: "assistant", content: fullReply }]);
          setTypingMessage("");
        }
      }, 15);
      
    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 group z-50 transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:scale-105"
        }`}
      >
        <div className="absolute inset-0 bg-amber rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-xl text-amber">
          <SuZuAvatar size={28} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
        </div>
      </button>

      <div
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber to-teal-500"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-amber shadow-sm">
              <SuZuAvatar size={24} />
            </div>
            <div>
              <h3 className="font-display text-gray-900 dark:text-white text-base leading-tight">
                SuZu
              </h3>
              <p className="font-mono text-[10px] text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1 bg-white/50 dark:bg-gray-900/50 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm ${msg.role === "user" ? "bg-gray-800 text-white" : "bg-white dark:bg-gray-900 text-amber border border-gray-200 dark:border-gray-700"}`}>
                {msg.role === "user" ? <User size={16} /> : <SuZuAvatar size={20} />}
              </div>
              <div className={`px-4 py-2.5 rounded-lg text-sm max-w-[75%] whitespace-pre-wrap ${
                msg.role === "user" 
                  ? "bg-gray-800 text-white rounded-tr-none" 
                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {typingMessage && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 text-amber border border-gray-200 dark:border-gray-700">
                <SuZuAvatar size={20} />
              </div>
              <div className="px-4 py-2.5 rounded-lg text-sm max-w-[75%] whitespace-pre-wrap bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm">
                {typingMessage}
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-amber animate-pulse align-middle"></span>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-amber border border-gray-200 dark:border-gray-700">
                <SuZuAvatar size={20} />
              </div>
              <div className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 bg-amber rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-amber rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-amber">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SuZu..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none placeholder:text-gray-400"
              disabled={isLoading || typingMessage !== ""}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || typingMessage !== ""}
              className="text-amber hover:text-amber-600 disabled:opacity-50 transition-colors p-1"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}