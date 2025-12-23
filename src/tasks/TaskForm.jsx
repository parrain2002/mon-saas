// src/tasks/TaskForm.jsx
import { useEffect, useState } from "react";
import { getProjectMembers } from "./taskService";

export default function TaskForm({ projects = [], onCreate }) {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [members, setMembers] = useState([]);
  const [assignedToId, setAssignedToId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // when projectId changes, fetch members
    if (!projectId) { setMembers([]); return; }
    let mounted = true;
    (async () => {
      try {
        const m = await getProjectMembers(projectId, token);
        if (!mounted) return;
        setMembers(m);
      } catch (err) {
        console.error("fetch members", err);
        setMembers([]);
      }
    })();
    return () => (mounted = false);
  }, [projectId]);

  useEffect(() => {
    // init projectId if not set
    if (!projectId && projects.length > 0) setProjectId(projects[0].id);
  }, [projects]);

  const submit = (e) => {
    e.preventDefault();
    if (!title || !projectId) {
      alert("Titre et projet requis");
      return;
    }
    const payload = { title, projectId: Number(projectId) };
    if (assignedToId) payload.assignedToId = Number(assignedToId);
    onCreate(payload);
    setTitle("");
    setAssignedToId("");
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Project</label>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">-- Choisir --</option>
          {projects.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label>Assign to (member)</label>
        <select value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)}>
          <option value="">-- Aucun --</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name ?? m.email}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Créer</button>
    </form>
  );
}
