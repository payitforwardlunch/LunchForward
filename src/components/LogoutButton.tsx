"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
            style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
            Sign Out
        </button>
    );
}
