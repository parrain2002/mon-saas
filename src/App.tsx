// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Notifications from "./pages/Notifications.jsx";
import NotificationBadge from "./components/NotificationsBadge.jsx"; // ✅ Correction du nom
import { NotificationsProvider } from "./context/NotificationsContext";
import Projects from "./pages/Projects.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import ProjectsList from "./pages/ProjectsList.jsx";
import TaskPage from "./tasks/TaskPage.jsx";
import TeamPage from "./pages/team/TeamPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";

export default function App() {
  return (
    <NotificationsProvider>
      <>
        {/* Header global */}
        <header style={{ padding: "12px", background: "#f2f2f2" }}>
          <a href="/dashboard">Home</a> {" | "}
          <a href="/dashboard/analytics">Analytics</a> {" | "}
          <a href="/projects">Projets</a> {" | "}
          <a href="/notifications">Notifications</a> {" | "}
          <a href="/tasks">Tâches</a> {" | "}
          <a href="/team">Équipe</a> {" | "}
          <a href="/profile">Profil</a> {" | "}
          <NotificationBadge />
        </header>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />

          <Route path="/notifications" element={<Notifications />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/project/createproject" element={<CreateProject />} />
          <Route path="/projects/list" element={<ProjectsList />} />

          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Route par défaut */}
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    </NotificationsProvider>
  );
}
