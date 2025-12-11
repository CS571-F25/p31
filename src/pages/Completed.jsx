import { useState, useEffect } from "react";
import { supabase } from "../auth";
import TodoList from "../components/TodoList";

export default function CompletedPage() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            .order("due_date", { ascending: false });

        if (error) console.error("Error fetching tasks:", error);
        else setTasks(data || []);

        setLoading(false);
    };

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const completedTasks = tasks.filter(task => task.completed);

    if (loading) return <p></p>
    if (completedTasks.length === 0) {
        return (
            <div className="overlay other">
                <h1 style={{color: "white"}}>Completed Tasks</h1>
                <p style={{paddingTop: "20px", color: "white"}}>There are no completed tasks!</p>
            </div>
        )
    }

    const groupByMonthYear = (tasks) => {
        const groups = {};
        tasks.forEach(task => {
            if (!task.due_date) return;
            const date = new Date(task.due_date);
            const key = date.toLocaleString("en-US", { month: "long", year: "numeric" });
            if (!groups[key]) groups[key] = [];
            groups[key].push(task);
        });
        return groups;
    };

    const completedGrouped = groupByMonthYear(completedTasks);

    return (
        <div className="overlay other">
            <h1 style={{color: "white"}}>Completed Tasks</h1>
            {Object.entries(completedGrouped).map(([monthYear, tasks]) => (
                <div key={monthYear}>
                    <h2 style={{color: "white", fontWeight: 400}}>{monthYear}</h2>
                    <TodoList tasks={tasks} />
                </div>
            ))}
        </div>
    );
}
