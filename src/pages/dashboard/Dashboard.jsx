// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "./dashboardService";
import DashboardLayout from "../../Layouts/DashboardLayout";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import MemberDashboard from "./MemberDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const r = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    setRole(r);

    getDashboardStats(token)
      .then((res) => setData(res.data))
      .catch(() => navigate("/login"));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      {role === "ADMIN" && <AdminDashboard data={data} />}
      {role === "MANAGER" && <ManagerDashboard data={data} />}
      {role === "MEMBER" && <MemberDashboard data={data} />}
    </DashboardLayout>
  );
}
