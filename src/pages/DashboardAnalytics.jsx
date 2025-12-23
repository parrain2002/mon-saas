// src/pages/DashboardAnalytics.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import { getDashboardAnalytics } from "./dashboard/dashboardService.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css"; // Assurez-vous d'importer votre CSS

export default function DashboardAnalytics() {
  const [data, setData] = useState(null);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) return nav("/login");
    if (role !== "ADMIN") return nav("/dashboard");

    getDashboardAnalytics(token)
      .then((res) => setData(res.data))
      .catch(() => {});
  }, [token, role, nav]);

  if (!data) return <div className="dashboard-container">Chargement...</div>;

  return (
    <DashboardLayout>
      {/* Remplacement de <Box> par <div className="dashboard-container"> */}
      <div className="dashboard-container page-animate">
        {/* Remplacement de <Heading> par <h1> */}
        <h1 className="dashboard-title">Analytics</h1>

        {/* Remplacement du Box du graphique par une div stylisée */}
        <div style={{ 
          height: "400px", 
          background: "white", 
          padding: "24px", 
          borderRadius: "16px", 
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" 
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.projects}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="tasks" 
                fill="#2563eb" // Bleu assorti à votre bouton dashboard
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}