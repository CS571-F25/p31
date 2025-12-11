import { useState, useEffect } from "react";
import { supabase } from "../auth";
import TodoList from "../components/TodoList";

export default function PastEventsPage() {
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

    const pastEvents = tasks.filter(task =>
        task.type === "Event" && new Date(task.due_date) < new Date()
    );

    if (loading) return <p></p>;

    if (pastEvents.length === 0) {
        return (
            <div className="overlay other">
                <h1 style={{color: "white"}}>Past Events</h1>
                <p style={{paddingTop: "20px", color: "white"}}>There are no past events!</p>
            </div>
        )
    }

    return (
        <div className="overlay other">
            <h1 style={{color: "white"}}>Past Events</h1>
            <TodoList tasks={pastEvents} />
        </div>
    );
}
