import axios from "axios";

// URL dynamique : utilise Render sur Netlify, sinon localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/dashboard`;

export const getDashboardStats = async (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardAnalytics = async (token) => {
  return axios.get(`${API_URL}/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
