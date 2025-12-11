import { useState } from "react"

export default function AddTask({ isOpen, setIsOpen, newTask, setNewTask, addTask }) {
    const [errors, setErrors] = useState([]);
    const handleAddClick = () => {
        const newErrors = {};

        if (!newTask.title.trim()) newErrors.title = true;
        if (newTask.type !== "Note" && !newTask.due_date) newErrors.due_date = true;
        if (newTask.type !== "Note" && !newTask.time) newErrors.time = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        addTask();
    };

    const inputStyle = (field) => ({
        border: errors[field] ? "3px solid red" : "1px solid #ccc",
        padding: "5px",
        borderRadius: "5px",
        marginBottom: "10px"
    });

    return (
        <div className={`popup-wrapper ${isOpen ? "visible" : ""}`} onClick={() => setIsOpen(false)}>
            <div
                className={`popup-container ${isOpen ? "open" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{color: "white"}}>Create</h2>
                <input
                    placeholder="Title"
                    type="text"
                    value={newTask.title}
                    style={inputStyle("title")}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <select
                    value={newTask.type}
                    style={inputStyle("type")}
                    onChange={(e) => setNewTask(prev => ({
                        ...prev,
                        type: e.target.value,
                        due_date: e.target.value === "Note" ? "" : prev.due_date,
                        time: e.target.value === "Note" ? "" : prev.time
                    }))}
                >
                    <option value="Task">Task</option>
                    <option value="Event">Event</option>
                    <option value="Note">Note</option>
                </select>

                {newTask.type !== "Note" && (
                    <>
                        <input 
                            type="date" 
                            value={newTask.due_date || ""} 
                            style={inputStyle("due_date")}
                            onChange={(e) => setNewTask(prev => ({ ...prev, due_date: e.target.value }))} 
                        />
                        <input 
                            type="time" 
                            value={newTask.time || ""} 
                            style={inputStyle("time")}
                            onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))} 
                        />
                    </>
                )}

                <textarea
                    placeholder="Additional Info (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    style={{ padding: "5px", paddingBottom: "70px", borderRadius: "5px", marginBottom: "10px" }}
                />

                <div className="btn-container">
                    <button onClick={() => setIsOpen(false)} className="cancel-btn">Cancel</button>
                    <button onClick={handleAddClick} className="add-btn">Add</button>
                </div>
            </div>
        </div>
    );
}
