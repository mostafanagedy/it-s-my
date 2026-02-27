import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Terminal,
  Minimize2,
  Loader2,
  User,
} from "lucide-react";
import { CHAT_SYSTEM_INSTRUCTION, BRAND_NAME } from "../constants";

interface Message {
  role: "user" | "model";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: `Hello! I'm nagy_bot. Ask me anything about Mostafa's skills, experience, or how to get in touch.`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Construct history for context
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: CHAT_SYSTEM_INSTRUCTION,
        },
        history: history,
      });

      const result = await chat.sendMessageStream({ message: userMessage });

      let fullResponse = "";
      setMessages((prev) => [...prev, { role: "model", text: "" }]); // Add placeholder

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponse += text;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Connection error. I'm currently offline (API key might be missing or invalid).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`
          transition-all duration-300 ease-out origin-bottom-right mb-4
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none absolute"}
        `}
      >
        <div className="w-[85vw] sm:w-96 h-[500px] max-h-[80vh] bg-slate-950/95 backdrop-blur-xl border border-primary/20 rounded-2xl flex flex-col shadow-2xl overflow-hidden font-sans ring-1 ring-white/10">
          {/* Header */}
          <div className="bg-slate-900/80 p-4 border-b border-white/5 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Terminal className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-primary">~/nagy_bot</span>
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  ONLINE
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                    ${msg.role === "user" ? "bg-primary text-slate-950" : "bg-slate-800 text-primary border border-primary/20"}
                  `}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-primary text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-800/80 text-gray-200 border border-white/5 rounded-tl-none font-mono"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-900/50 border-t border-white/5"
          >
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a command or question..."
                className="w-full bg-slate-950/50 border border-white/10 text-white text-sm rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-slate-950 disabled:opacity-50 disabled:hover:bg-primary/10 disabled:hover:text-primary transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-gray-600 text-center mt-2 font-mono">
              Powered by Gemini 3 Flash
            </div>
          </form>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300
          ${isOpen ? "bg-slate-800 text-white rotate-90" : "bg-primary text-slate-950 hover:scale-110 hover:shadow-primary/25"}
        `}
      >
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent ${!isOpen && isHovered ? "animate-ping border-primary/30" : ""}`}
        ></div>
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}

        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
