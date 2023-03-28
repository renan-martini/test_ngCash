import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((configuracoes) => {
  const token = localStorage.getItem("token");

  configuracoes.headers!.Authorization = token ? `Bearer ${token}` : "";
  return configuracoes;
});

export default API;
