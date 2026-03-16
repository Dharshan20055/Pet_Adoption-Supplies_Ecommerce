import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";
const getToken = () => localStorage.getItem("token");


export default function ChatUI({ requestId, senderId, senderRole }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/chat/${requestId}/history`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to load chat history", err));
  }, [requestId]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/chat/${requestId}`, (frame) => {
          const msg = JSON.parse(frame.body);
          setMessages((prev) => [...prev, msg]);
        });
      },
      onDisconnect: () => setConnected(false),
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [requestId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !connected) return;

    const payload = {
      requestId,
      senderId,
      senderRole,
      message: input.trim(),
    };

    stompClientRef.current?.publish({
      destination: `/app/chat/${requestId}`,
      body: JSON.stringify(payload),
    });

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 360,
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1e3a5f",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        <span>💬 Chat — Request #{requestId}</span>
        <span
          style={{
            fontSize: "0.7rem",
            background: connected ? "#10b981" : "#ef4444",
            borderRadius: 999,
            padding: "2px 8px",
          }}
        >
          {connected ? "● Connected" : "○ Disconnected"}
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", marginTop: 40 }}>
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map((msg, i) => {
          const isMine = msg.senderId === senderId;
          return (
            <div
              key={msg.id || i}
              style={{
                alignSelf: isMine ? "flex-end" : "flex-start",
                background: isMine ? "#1e3a5f" : "#fff",
                color: isMine ? "#fff" : "#111827",
                padding: "8px 12px",
                borderRadius: isMine ? "12px 12px 0 12px" : "12px 12px 12px 0",
                maxWidth: "70%",
                fontSize: "0.875rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: 2 }}>
                {msg.senderRole}
              </div>
              {msg.message}
              <div style={{ fontSize: "0.65rem", opacity: 0.5, marginTop: 4, textAlign: "right" }}>
                {msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString() : ""}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e5e7eb",
          background: "#fff",
          padding: 8,
          gap: 8,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send)"
          style={{
            flex: 1,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!connected || !input.trim()}
          style={{
            background: connected ? "#1e3a5f" : "#9ca3af",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            cursor: connected ? "pointer" : "not-allowed",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}