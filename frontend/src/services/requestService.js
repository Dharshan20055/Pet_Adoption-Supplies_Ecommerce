import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createRequest = (data) => {
  return axios.post(`${BASE_URL}/requests/add`, data);
};

export const getBuyerRequests = (buyerId) => {
  return axios.get(`${BASE_URL}/requests/${buyerId}`);
};