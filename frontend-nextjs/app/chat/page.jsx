"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Server error" },
      ]);
    }
    setLoading(false);
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="max-w-2xl mx-auto my-10 font-sans flex flex-col gap-4">
      <h2 className="text-2xl font-bold">✈️ Travel Chatbot</h2>

      <div className="chat-box border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto flex flex-col gap-2 bg-white">
        {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[80%] p-2 rounded-md mb-2 ${
            msg.role === "user" ? "bg-green-200 text-black self-end" : "bg-gray-200 text-black self-start"
          }`}
        >
          {msg.content}
        </div>

        ))}

        {loading && <div className="typing">Typing...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about travel, destinations, news..."
          className="flex-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
