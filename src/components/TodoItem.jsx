import { formatDueDate, getDueDistance } from "./DateHelpers";

export default function TodoItem({ task, setSelectedTask, setEditTask, setIsTaskModalOpen }) {
    const displayType = task.type || "Task";
    return (
        <li 
            className="task-item"
            onClick={() => {
                setSelectedTask(task);
                setEditTask({ ...task });
                setIsTaskModalOpen(true);
            }}
        >
            <div className="task-left">
                <strong style={{fontSize: "30px", fontWeight: "400"}}>{task.title}</strong>
                <em>{displayType}</em>
            </div>
            {task.type !== "Note" && task.due_date && (
                <div className="task-right">
                    <div className="date-container">{displayType === "Task" ? "Due: " : "When: "} 
                        {formatDueDate(task.due_date, task.time)}
                        <em>{getDueDistance(task.due_date)}</em>
                    </div>
                </div>
            )}
        </li>
    );
}
