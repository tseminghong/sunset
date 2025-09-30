import React from "react";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
            }}
        >
            <div
                style={{
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    padding: "48px 64px",
                    textAlign: "center",
                    maxWidth: "400px",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: 700,
                        color: "#222",
                        marginBottom: "16px",
                        letterSpacing: "2px",
                        textShadow: "0 2px 8px rgba(67,198,172,0.2)",
                    }}
                >
                    404
                </h1>
                <p
                    style={{
                        fontSize: "1.25rem",
                        color: "#333",
                        marginBottom: "24px",
                        fontWeight: 500,
                    }}
                >
                    Oops! Page not found.
                </p>
                <a
                    href="/"
                    style={{
                        display: "inline-block",
                        padding: "12px 32px",
                        borderRadius: "12px",
                        background: "linear-gradient(90deg, #43c6ac 0%, #f8ffae 100%)",
                        color: "#222",
                        fontWeight: 600,
                        textDecoration: "none",
                        boxShadow: "0 2px 8px rgba(67,198,172,0.15)",
                        transition: "background 0.2s",
                    }}
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}