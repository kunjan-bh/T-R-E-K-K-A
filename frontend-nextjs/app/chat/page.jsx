// ChatPage.jsx
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

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.response || "No response received" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Couldn't connect to server" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleExampleClick = (text) => {
    setMessage(text);
    // Optional: auto-send → just uncomment next line
    // sendMessage();
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo-chat">PlanGPT</h2>
          <button className="new-chat-btn">+ New Chat</button>
        </div>

        <div className="chat-history">
          {/* You can later map real history here */}
          <div className="history-item active">Current conversation</div>
          <div className="history-item">Pokhara 5-day itinerary</div>
          <div className="history-item">Kathmandu food tour</div>
          <div className="history-item">Chitwan jungle plan</div>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">You • Kathmandu</div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="chat-wrapper">
        <div className="chat-main">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h1 className="hero-title">What can I help you plan?</h1>
              <div className="examples-grid">
                <button
                  className="example-card"
                  onClick={() => handleExampleClick("Create a 7-day family trip to Pokhara under NPR 80,000")}
                >
                  7-day family trip to Pokhara under NPR 80,000
                </button>
                <button
                  className="example-card"
                  onClick={() => handleExampleClick("Best hidden cafes and restaurants in Thamel right now")}
                >
                  Best hidden cafes & restaurants in Thamel 2026
                </button>
                <button
                  className="example-card"
                  onClick={() => handleExampleClick("Road trip from Kathmandu to Chitwan – best stops & tips")}
                >
                  Kathmandu to Chitwan road trip – stops & tips
                </button>
                <button
                  className="example-card"
                  onClick={() => handleExampleClick("Winter trekking itinerary around Langtang – moderate difficulty")}
                >
                  Winter trekking around Langtang (moderate)
                </button>
              </div>
            </div>
          ) : (
            <h1 className="chat-title-small">Conversation</h1>
          )}

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.role === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.content}
              </div>
            ))}

            {loading && <div className="chat-typing">Thinking…</div>}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="chat-input-wrapper">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about travel…"
            className="chat-input"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="chat-send-btn"
            disabled={loading || !message.trim()}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}