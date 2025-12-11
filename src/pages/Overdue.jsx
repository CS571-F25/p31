import { useState, useEffect } from "react";
import { supabase } from "../auth";
import TodoList from "../components/TodoList";
import ItemDetail from "../components/ItemDetail";

export default function OverduePage() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, []);

    const fetchTasks = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("due_date", { ascending: true });

        if (error) console.error("Error fetching tasks:", error);
        else setTasks(data || []);

        setLoading(false);
    };

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const handleUpdateTask = async () => {
        if (!editTask) return;
        const { error } = await supabase
            .from("notes")
            .update({
                title: editTask.title,
                type: editTask.type,
                due_date: editTask.due_date,
                time: editTask.time,
                description: editTask.description,
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

        if (error) console.error("Error marking task complete:", error);
        else fetchTasks();
    };

    const overdueTasks = tasks.filter(task => 
        task.type === "Task" && !task.completed && new Date(task.due_date) < new Date()
    );

    if (loading) return <p></p>;

    if (overdueTasks.length === 0) {
        return (
            <div className="overlay other">
                <h1 style={{color: "white"}}>Overdue Tasks</h1>
                <p style={{paddingTop: "20px", color: "white"}}>There are no overdue tasks!</p>
            </div>
        );
    }

    return (
        <div className="overlay other">
            <h1 style={{color: "white"}}>Overdue Tasks</h1>
            <TodoList
                tasks={overdueTasks}
                setSelectedTask={setSelectedTask}
                setEditTask={setEditTask}
                setIsTaskModalOpen={setIsTaskModalOpen}
            />
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
