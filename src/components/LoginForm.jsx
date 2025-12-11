import { useState } from "react";
import { supabase } from "../auth";
import { useNavigate, Link } from "react-router-dom";
import InputField from "./InputField.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        navigate("/");
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <div className="title-container">
                <h2 className="login-title">Welcome back</h2>
                <p className="sign-in-title">Sign in to your account</p>
            </div>

            <div className="input-element-container">
                <InputField type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                <InputField type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <ErrorMessage message={errorMessage} />

            <button className="login-btn">Sign In</button>
            <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
        </form>
    );
}
