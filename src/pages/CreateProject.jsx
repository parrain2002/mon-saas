import { useState } from "react";
import { createProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await createProject({ name, description }, token);
      alert("Project created !");
      nav("/projects");
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  return (
    <div>
      <h1>Create Project</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name :</label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Description :</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
