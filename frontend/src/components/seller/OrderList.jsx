import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSellerOrders, updateOrderStatus } from "../../services/sellerService";    
const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const getToken = () => localStorage.getItem("token");
const getSellerId = () => localStorage.getItem("userId");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

const STATUS_COLORS = {
  PENDING: { bg: "#fef3c7", text: "#92400e" },
  COMPLETED: { bg: "#d1fae5", text: "#065f46" },
  CANCELLED: { bg: "#fee2e2", text: "#991b1b" },
};

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sellerId = getSellerId();
    axios
      .get(`${API}/orders/${sellerId}`, authHeaders())
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `${API}/orders/${orderId}/status`,
        { status: newStatus },
        authHeaders()
      );
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? res.data : o))
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  if (loading) return <p style={{ padding: 24 }}>Loading orders...</p>;

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 900 }}>
      <h2 style={{ marginBottom: 16 }}>📦 My Orders</h2>

      {orders.length === 0 && (
        <p style={{ color: "#6b7280" }}>No orders yet. Approve some requests first!</p>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9fafb", textAlign: "left" }}>
            {["Order ID", "Pet ID", "Buyer ID", "Amount", "Status", "Created", "Action"].map(
              (h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const sc = STATUS_COLORS[order.status] || { bg: "#f3f4f6", text: "#374151" };
            return (
              <tr
                key={order.id}
                style={{ borderBottom: "1px solid #f3f4f6" }}
              >
                <td style={tdStyle}>#{order.id}</td>
                <td style={tdStyle}>{order.petId}</td>
                <td style={tdStyle}>{order.buyerId}</td>
                <td style={tdStyle}>₹{order.totalAmount?.toFixed(2) || "—"}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      background: sc.bg,
                      color: sc.text,
                      borderRadius: 999,
                      padding: "2px 10px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ ...tdStyle, fontSize: "0.8rem", color: "#9ca3af" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={tdStyle}>
                  {order.status === "PENDING" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => handleStatusUpdate(order.id, "COMPLETED")}
                        style={smallBtn("#10b981")}
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                        style={smallBtn("#ef4444")}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {order.status !== "PENDING" && (
                    <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>No action</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = { padding: "12px", fontSize: "0.875rem" };
const smallBtn = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "4px 10px",
  fontSize: "0.75rem",
  cursor: "pointer",
  fontWeight: 600,
});