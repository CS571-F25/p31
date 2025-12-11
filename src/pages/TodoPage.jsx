import { useState, useEffect } from "react";
import { supabase } from "../auth";
import AddTask from "../components/AddTask";
import ItemDetail from "../components/ItemDetail";
import TodoList from "../components/TodoList";

export default function TodoPage() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        type: "Task",
        due_date: "",
        time: "",
        description: "",
        completed: false
    });
    const [user, setUser] = useState(null);

    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [filterType, setFilterType] = useState("All");
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, []);

    const fetchTasks = async () => {
        if (!user) return;
        setLoading(true)
        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("id", { ascending: true });

        if (error) console.error("Error fetching tasks:", error);
        else setTasks(data || []);

        setLoading(false);
    };

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const addTask = async () => {
        if (!newTask.title.trim() || !user) return;

        const isNote = newTask.type === "Note"

        const { error } = await supabase.from("notes").insert([{
            title: newTask.title,
            type: newTask.type,
            due_date: isNote ? null : newTask.due_date,
            time: isNote ? null : newTask.time,
            description: newTask.description,
            completed: newTask.completed,
            user_id: user.id
        }]);

        if (error) console.error("Error adding task:", error);
        else {
            setNewTask({ title: "", type: "Task", due_date: "", time: "", description: "", completed: false });
            setIsModalOpen(false);
            fetchTasks();
        }
    };

    const handleUpdateTask = async () => {
        const { error } = await supabase
            .from("notes")
            .update({
                title: editTask.title,
                type: editTask.type,
                due_date: editTask.due_date,
                time: editTask.time,
                description: editTask.description
            })
            .eq("id", editTask.id);

        if (error) console.error("Error updating task:", error);
        else {
            fetchTasks();
            setIsEditing(false);
            setIsTaskModalOpen(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", taskId);

        if (error) console.error("Error deleting task:", error);
        else {
            fetchTasks();
            setIsTaskModalOpen(false);
        }
    };
    const handleCompleteTask = async (taskId) => {
        const { error } = await supabase
            .from("notes")
            .update({ completed: true })
            .eq("id", taskId);

        if (error) {
            console.error("Error marking task as completed:", error);
        } else {
            fetchTasks(); 
            setIsTaskModalOpen(false);
        }
    };


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const displayedTasks = tasks
    .filter(task => {
        if (task.completed) return false;

        if (task.type === "Event" && task.due_date) {
            const dueDate = new Date(task.due_date);
            dueDate.setHours(0,0,0,0);
            if (dueDate < today) return false;
        }

        if (task.type === "Task" && task.due_date) {
            const dueDate = new Date(task.due_date);
            dueDate.setHours(0,0,0,0);
            if (dueDate < today) return false;
        }
        return true;
    })

    .filter(task => filterType === "All" || task.type === filterType)
    .sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date) - new Date(b.due_date);
    });

    if (loading) return <p></p>

    return (
        <div className="overlay">
            <h1 style={{position: "absolute", color: "white", paddingTop: "103px"}}>My List</h1>
            <div className="top-bar">
                <button onClick={() => setIsModalOpen(true)} className="new-btn">+</button>
                <div>
                    <label className="filter-title">Filter: </label>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-options">
                        <option value="All">All</option>
                        <option value="Task">Task</option>
                        <option value="Event">Event</option>
                        <option value="Note">Note</option>
                    </select>
                </div>
            </div>

            <AddTask 
                isOpen={isModalOpen} 
                setIsOpen={setIsModalOpen} 
                newTask={newTask} 
                setNewTask={setNewTask} 
                addTask={addTask} 
            />

            {displayedTasks.length === 0 ? (
                <p style={{ color: "white", marginTop: "20px" }}>
                    Your todo list is empty!
                </p>
            ) : (
                <TodoList 
                    tasks={displayedTasks} 
                    setSelectedTask={setSelectedTask} 
                    setEditTask={setEditTask} 
                    setIsTaskModalOpen={setIsTaskModalOpen} 
                />
            )}
            <ItemDetail 
                task={selectedTask || {}} 
                editTask={editTask} 
                setEditTask={setEditTask} 
                isEditing={isEditing} 
                setIsEditing={setIsEditing} 
                handleUpdateTask={handleUpdateTask} 
                handleDeleteTask={handleDeleteTask} 
                handleCompleteTask={handleCompleteTask} 
                setIsTaskModalOpen={setIsTaskModalOpen}
                isTaskModalOpen={isTaskModalOpen}
            />
        </div>
    );
}
