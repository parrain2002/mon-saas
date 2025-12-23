// src/tasks/TaskList.jsx
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onToggle, onDelete, projects = [] }) {
  const findProjectName = (projectId) => {
    const p = projects.find((x) => x.id === projectId);
    return p ? p.name : `#${projectId}`;
  };

  if (tasks.length === 0) return <p>Aucune tâche</p>;

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id} style={{ marginBottom: 12 }}>
          <TaskItem
            task={t}
            projectName={findProjectName(t.projectId)}
            onToggle={() => onToggle(t)}
            onDelete={() => onDelete(t.id)}
          />
        </li>
      ))}
    </ul>
  );
}
