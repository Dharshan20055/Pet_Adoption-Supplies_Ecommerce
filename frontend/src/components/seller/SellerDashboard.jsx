import { useEffect, useState } from "react";
import axios from "axios";
import ChatUI from "./ChatUI";
import { fetchSellerRequests, approveRequest, rejectRequest } from "../../services/sellerService";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const getSellerId = () => localStorage.getItem("userId");
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default function SellerDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatRequestId, setActiveChatRequestId] = useState(null);

  useEffect(() => {
    const sellerId = getSellerId();
    axios
      .get(`${API}/requests/seller/${sellerId}`, authHeaders())
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Failed to fetch requests", err))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.post(`${API}/requests/${requestId}/approve`, {}, authHeaders());
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "ACCEPTED" } : r))
      );
      alert("Request approved! Order created.");
    } catch (err) {
      alert("Failed to approve request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`${API}/requests/${requestId}/reject`, {}, authHeaders());
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "REJECTED" } : r))
      );
    } catch (err) {
      alert("Failed to reject request");
    }
  };

  const statusBadge = (status) => {
    const colors = {
      PENDING: "#f59e0b",
      ACCEPTED: "#10b981",
      REJECTED: "#ef4444",
    };
    return (
      <span
        style={{
          background: colors[status] || "#6b7280",
          color: "#fff",
          borderRadius: "999px",
          padding: "2px 10px",
          fontSize: "0.75rem",
          fontWeight: 600,
        }}
      >
        {status}
      </span>
    );
  };

  if (loading) return <p style={{ padding: 24 }}>Loading requests...</p>;

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 900 }}>
      <h2 style={{ marginBottom: 16 }}>📋 Buyer Requests</h2>

      {requests.length === 0 && <p>No requests yet.</p>}

      {requests.map((req) => (
        <div
          key={req.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>Request #{req.id}</strong> &nbsp;
              {statusBadge(req.status)}
              <p style={{ margin: "4px 0", color: "#6b7280", fontSize: "0.875rem" }}>
                Pet ID: {req.petId} | Buyer ID: {req.buyerId} | Offered: ₹{req.offeredPrice}
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {req.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleApprove(req.id)}
                    style={btnStyle("#10b981")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    style={btnStyle("#ef4444")}
                  >
                    ❌ Reject
                  </button>
                </>
              )}
              <button
                onClick={() =>
                  setActiveChatRequestId(
                    activeChatRequestId === req.id ? null : req.id
                  )
                }
                style={btnStyle("#3b82f6")}
              >
                💬 Chat
              </button>
            </div>
          </div>

          {/* Inline chat panel */}
          {activeChatRequestId === req.id && (
            <div style={{ marginTop: 16 }}>
              <ChatUI
                requestId={req.id}
                senderId={Number(getSellerId())}
                senderRole="SELLER"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const btnStyle = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "6px 14px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: 600,
});