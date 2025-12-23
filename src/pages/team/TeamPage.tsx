import { useEffect, useState } from "react";
import api from "../../services/api";
import TeamMemberCard from "../../components/team/TeamMemberCard";
import { useNavigate } from "react-router-dom";

interface TeamMember {
  id: number;
  email: string;
  role: string;
  [key: string]: any;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [userIdToAdd, setUserIdToAdd] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  // Récupération du token
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
    fetchMembers();
  }, []);

  // Charger les membres de l'équipe
  async function fetchMembers() {
    try {
      const res = await api.get("/team/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Error loading members:", err);
    } finally {
      setLoading(false);
    }
  }

  // Ajouter un membre
  async function handleAddMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userIdToAdd) return;

    try {
      await api.post(
        "/team/add-member",
        { memberId: Number(userIdToAdd) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserIdToAdd("");
      fetchMembers(); // Recharger
    } catch (err) {
      console.error("Error adding member:", err);
      alert("Impossible d’ajouter ce membre.");
    }
  }

  // Supprimer un membre
  async function handleRemove(memberId: number) {
    try {
      await api.delete(`/team/remove-member/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchMembers(); // rafraîchir
    } catch (err) {
      console.error("Error removing member:", err);
      alert("Impossible de retirer ce membre.");
    }
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Team Management</h1>

      {/* Ajouter un membre */}
      <form onSubmit={handleAddMember}>
        <input
          type="number"
          placeholder="Enter Member ID"
          value={userIdToAdd}
          onChange={(e) => setUserIdToAdd(e.target.value)}
        />
        <button type="submit">Ajouter un membre</button>
      </form>

      <h2>Team Members</h2>

      {members.length === 0 && <p>Aucun membre dans votre équipe.</p>}

      {/* Affichage des membres */}
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          onRemove={(id) => handleRemove(Number(id))}
        />
      ))}
    </div>
  );
}
