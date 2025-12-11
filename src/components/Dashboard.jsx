import { useEffect, useState } from "react";
import { supabase } from "../auth";

function Dashboard() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                console.log(data.session.user.user_metadata);
                setUserName(data.session.user.user_metadata.name);
            }
        });

        const { data:listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    setUserName(session.user.user_metadata.name);
                } else {
                    setUserName("");
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return <div className="home-container">
        <div className="home-wrapper">
            <h2>Welcome to your Task Board{userName ? `, ${userName}` : ""}!</h2>
        </div>
    </div>
}

export default Dashboard