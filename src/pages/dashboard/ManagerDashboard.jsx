import "./../../styles/dashboard.css";

export default function ManagerDashboard({ data }) {
  const stats = [
    { label: "Team Members", value: data.teamMembers },
    { label: "Active Projects", value: data.activeProjects },
    { label: "Progress Rate", value: data.progressRate },
  ];

  return (
    // Ajout de "page-animate"
    <div className="dashboard-container page-animate">
      <h1 className="dashboard-title">Manager Dashboard</h1>

      <div className="stats-grid">
        {stats.map((s) => (
          // Ajout de "card-animate"
          <div className="stat-card card-animate" key={s.label}>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}