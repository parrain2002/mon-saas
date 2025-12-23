import axios from "axios";

const API_URL = "http://localhost:3000/dashboard";

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
