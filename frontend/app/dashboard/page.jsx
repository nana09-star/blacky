"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "white", minHeight: "100vh", color: "black", fontFamily: "sans-serif" }}>
      
      {/* --- HEADER --- */}
      <h1 style={{ color: "gold", WebkitTextStroke: "1px black", fontSize: "3rem", margin: "0" }}>
        FRANNAS DASHBOARD
      </h1>
      <p>Welcome back! Your connection to the Backend is working perfectly.</p>
      
      {/* --- ACTIVE SESSIONS --- */}
      <div style={{ marginTop: "20px", border: "2px solid gold", padding: "20px", borderRadius: "10px", maxWidth: "400px" }}>
        <h3 style={{ marginTop: "0" }}>Active Sessions</h3>
        <p><strong>User:</strong> admin@frannas.com</p>
        <p><strong>Status:</strong> <span style={{ color: "green" }}>● Online</span></p>
        
        <button 
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            backgroundColor: "black",
            color: "gold",
            border: "1px solid gold",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* --- HELIUM RIPPLES MONITOR --- */}
      <div style={{ 
        marginTop: "30px", 
        border: "2px solid #0056b3", 
        padding: "20px", 
        borderRadius: "10px", 
        maxWidth: "500px", 
        backgroundColor: "#f0f7ff" 
      }}>
        <h3 style={{ marginTop: "0", color: "#0056b3" }}>PROJECT: Helium Ripples Monitor</h3>
        <p>Tracking the impact of helium shortages on MRI medical services.</p>
        <hr style={{ border: "0.5px solid #0056b3", margin: "15px 0" }} />
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>Inventory Level:</p>
            <strong style={{ fontSize: "1.2rem" }}>65%</strong>
          </div>
          <div>
            <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>MRI Delay Index:</p>
            <strong style={{ fontSize: "1.2rem", color: "#d9534f" }}>12 Days</strong>
          </div>
        </div>

        <div style={{ 
          marginTop: "15px", 
          padding: "10px", 
          backgroundColor: "white", 
          borderLeft: "4px solid #0056b3",
          fontSize: "0.85rem",
          fontStyle: "italic"
        }}>
          <strong>System Log:</strong> Helium ripples in medicine detected. Supply chain monitoring active.
        </div>
      </div>

    </div>
  );
}