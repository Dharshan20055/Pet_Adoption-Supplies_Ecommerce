import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getCart = (buyerId) => {
  return axios.get(`${BASE_URL}/cart/${buyerId}`);
};

export const addToCart = (data) => {
  return axios.post(`${BASE_URL}/cart/add`, data);
};

export const removeCartItem = (cartId) => {
  return axios.delete(`${BASE_URL}/cart/remove/${cartId}`);
};

export const checkoutCart = (buyerId) => {
  return axios.post(`${BASE_URL}/cart/checkout/${buyerId}`);
};