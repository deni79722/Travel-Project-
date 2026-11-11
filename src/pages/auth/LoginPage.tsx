
import { useState } from "react";
import AuthLayout from "../../features/auth/components/AuthLayout";
import "./AuthPages.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !password) {
            setError("Please complete all fields.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");

        console.log("Login form submitted:", { email, password });
    }

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="Sign in to continue planning your trips."
        >
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="auth-button">
                    Login
                </button>

                <p className="auth-switch">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </AuthLayout>
    );
}

export default LoginPage;
