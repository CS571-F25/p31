import { formatDueDate } from "./DateHelpers";
import { useState } from "react";

export default function ItemDetail({
    task, editTask, setEditTask, isEditing, setIsEditing,
    handleUpdateTask, handleDeleteTask, handleCompleteTask, setIsTaskModalOpen, isTaskModalOpen
}) {
    const [errors, setErrors] = useState([]);
        const handleEditUpdateClick = () => {
            const newErrors = {};
    
            if (!editTask.title.trim()) newErrors.title = true;
            if (editTask.type !== "Note" && !editTask.due_date) newErrors.due_date = true;
            if (editTask.type !== "Note" && !editTask.time) newErrors.time = true;
    
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
    
            setErrors({});
            handleUpdateTask();
        };
    
        const inputStyle = (field) => ({
            border: errors[field] ? "3px solid red" : "1px solid #ccc",
            padding: "5px",
            borderRadius: "5px",
            marginBottom: "10px"
        });
    return (
        <div>
            <div className={`popup-wrapper ${isTaskModalOpen  ? "visible" : ""}`} onClick={() => setIsTaskModalOpen(false)}>
                <div
                    className={`popup-container ${isTaskModalOpen  ? "open" : ""}`}
                    onClick={(e) => e.stopPropagation()} 
                >
                {!isEditing ? (
                    <>
                        <h2 style={{color: "white", fontSize: "40px"}}>{task.title}</h2>
                        <p style={{color: "white", fontSize: "20px"}}><strong>Type:</strong> {task.type}</p>
                        {task.type !== "Note" && task.due_date && (
                            <p style={{color: "white", fontSize: "20px"}}>
                                <strong>{task.type === "Task" ? "Due: " : "When: "}</strong>
                                {formatDueDate(task.due_date, task.time)}
                            </p>
                        )}
                        {task.description && <p style={{color: "white", fontSize: "20px"}}><strong>Notes:</strong> {task.description}</p>}
                        <div className="btn-container">
                            {!task.complete && (
                                <button className="complete-btn" onClick={() => handleCompleteTask(task.id)}>Mark as Completed</button>
                            )}
                            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteTask(editTask.id)}>Delete</button>
                            <button className="close-btn" onClick={() => setIsTaskModalOpen(false)}>Close</button>
                        </div>
                    </>
                ) : (
                    <>
                        <input
                            placeholder="Title"
                            type="text"
                            value={editTask.title}
                            style={inputStyle("title")}
                            onChange={(e) => setEditTask(({ ...editTask, title: e.target.value }))}
                        />
                        <select
                            value={editTask.type}
                            style={inputStyle("type")}
                            onChange={(e) => setNewTask(({
                                ...editTask,
                                type: e.target.value,
                                due_date: e.target.value === "Note" ? "" : editTask.due_date,
                                time: e.target.value === "Note" ? "" : editTask.time
                            }))}
                        >
                            <option value="Task">Task</option>
                            <option value="Event">Event</option>
                            <option value="Note">Note</option>
                        </select>

                        {task.type !== "Note" && (
                            <>
                                <input 
                                    type="date" 
                                    value={
                                        editTask.due_date
                                            ? new Date(editTask.due_date).toISOString().split("T")[0]
                                            : ""
                                    } 
                                    style={inputStyle("due_date")}
                                    onChange={(e) => setEditTask(({ ...editTask, due_date: e.target.value }))} 
                                />
                                <input 
                                    type="time" 
                                    value={editTask.time || ""} 
                                    style={inputStyle("time")}
                                    onChange={(e) => setEditTask(({ ...editTask, time: e.target.value }))} 
                                />
                            </>
                        )}

                        <textarea
                            placeholder="Additional Info (optional)"
                            value={editTask.description}
                            onChange={(e) => setEditTask(({ ...editTask, description: e.target.value }))}
                            style={{ padding: "5px", paddingBottom: "70px", borderRadius: "5px", marginBottom: "10px" }}
                        />

                        <div className="btn-container">
                            <button onClick={() => setIsOpen(false)} className="cancel-btn">Cancel</button>
                            <button onClick={handleEditUpdateClick} className="add-btn">Update</button>
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}
