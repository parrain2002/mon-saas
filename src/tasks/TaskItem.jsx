// src/tasks/TaskItem.jsx
import React from "react";

export default function TaskItem({ task, projectName, onToggle, onDelete }) {
  return (
    <div>
      <div>
        <strong>{task.title}</strong> — <em>{projectName}</em>
      </div>
      <div>
        <small>Assigned to: {task.assignedTo ? (task.assignedTo.name ?? task.assignedTo.email) : "—"}</small>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={!!task.completed} onChange={onToggle} />
          Completed
        </label>
        {" "}
        <button onClick={onDelete}>Supprimer</button>
      </div>
    </div>
  );
}
