import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    fetchProfile(token);
  }, []);

  async function fetchProfile(token) {
    try {
      const res = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      nav("/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Chargement du profil...</p>;

  if (!profile) return <p>Impossible de récupérer le profil.</p>;

  return (
    <div>
      <h1>Mon Profil</h1>

      <p>
        <strong>ID :</strong> {profile.userId}
      </p>

      <p>
        <strong>Email :</strong> {profile.email}
      </p>

      <p>
        <strong>Role :</strong> {profile.role}
      </p>

      {/* Ajoute d'autres champs si ton JWT contient plus d'informations */}

    </div>
  );
}
