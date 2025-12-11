import { useState } from "react";
import { supabase } from "../auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setErrorMessage("");

        const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
            }
        }
        });

        if (error) {
        setErrorMessage(error.message);
        return;
        }
        navigate("/");
    }

    return (
        <div className="login-form-container">
            <div className="form-container">
                <form
                    onSubmit={handleRegister}
                    className="login-form"
                >
                    <div className="title-container">
                        <h2 className="login-title">Create an account</h2>
                    </div>

                    
                    <div className = "input-element-container">
                        <div className="input-container">
                        <input
                            type="text"
                            className="input"
                            value={name}
                            placeholder="First Name"
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                        <input
                            type="email"
                            className="input"
                            value={email}
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-container">
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {errorMessage && (
                    <div className="error-msg">{errorMessage}</div>
                    )}

                    <button className="login-btn">
                    Register
                    </button>
                    <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}
