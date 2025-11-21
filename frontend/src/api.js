import axios from "axios";

const BASE = "http://localhost:3000"; // backend must run

export const fetchProducts = async () => {
  const res = await axios.get(`${BASE}/products`);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(`${BASE}/add-product`, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.patch(`${BASE}/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE}/products/${id}`);
  return res.data;
};
