import "./../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ data }) {
  const nav = useNavigate();

  const stats = [
    { label: "Total Projects", value: data.totalProjects },
    { label: "Total Tasks", value: data.totalTasks },
    { label: "Completed Tasks", value: data.completedTasks },
    { label: "Total Users", value: data.totalUsers },
    { label: "Completion Rate", value: data.completionRate },
  ];

  return (
    // Ajout de "page-animate" ici
    <div className="dashboard-container page-animate"> 
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-grid">
        {stats.map((s) => (
          // Ajout de "card-animate" ici
          <div className="stat-card card-animate" key={s.label}>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
          </div>
        ))}
      </div>

      <button className="dashboard-button" onClick={() => nav("/dashboard/analytics")}>
        Voir Analytics
      </button>
    </div>
  );
}