import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    getProjects(token)
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Projects</h1>

      <button onClick={() => nav("/project/createproject")}>+ Create Project</button>

      {projects.length === 0 && <p>No projects found.</p>}

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
