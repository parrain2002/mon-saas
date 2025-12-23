import "./../../styles/dashboard.css";

export default function MemberDashboard({ data }) {
  const stats = [
    { label: "Assigned Tasks", value: data.assignedTasks },
    { label: "Completed Tasks", value: data.completedTasks },
    { label: "Performance Score", value: data.performance },
  ];

  return (
    // Ajout de "page-animate"
    <div className="dashboard-container page-animate">
      <h1 className="dashboard-title">Member Dashboard</h1>

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