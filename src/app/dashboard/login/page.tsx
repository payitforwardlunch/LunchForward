"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid username or password");
            } else if (res?.ok) {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6",
            padding: "1rem"
        }}>
            <div style={{
                maxWidth: "400px",
                width: "100%",
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>School Portal</h1>
                    <p style={{ color: "#6b7280" }}>Sign in to manage your lunch funds</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {error && (
                        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "0.75rem", borderRadius: "0.375rem", fontSize: "0.875rem" }}>
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.25rem" }}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.625rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.375rem",
                                outline: "none"
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.25rem" }}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.625rem",
                                border: "1px solid #d1d5db",
                                borderRadius: "0.375rem",
                                outline: "none"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            backgroundColor: "var(--primary-color, #16a34a)",
                            color: "white",
                            padding: "0.75rem",
                            borderRadius: "0.375rem",
                            fontWeight: "600",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            transition: "background-color 0.2s"
                        }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <a href="/" style={{ fontSize: "0.875rem", color: "#4b5563", textDecoration: "none" }}>&larr; Return to Public Site</a>
                </div>
            </div>
        </div>
    );
}
