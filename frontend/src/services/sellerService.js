import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});

export const fetchSellerRequests = (sellerId) => axios.get(`${API}/requests/seller/${sellerId}`, auth());
export const approveRequest = (id) => axios.post(`${API}/requests/${id}/approve`, {}, auth());
export const rejectRequest = (id) => axios.post(`${API}/requests/${id}/reject`, {}, auth());
export const fetchSellerOrders = (sellerId) => axios.get(`${API}/orders/${sellerId}`, auth());
export const updateOrderStatus = (orderId, status) => axios.put(`${API}/orders/${orderId}/status`, { status }, auth());
export const fetchChatHistory = (requestId) => axios.get(`${API}/chat/${requestId}/history`, auth());

