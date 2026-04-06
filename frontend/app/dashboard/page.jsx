"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clears the security token
    router.push("/"); // Sends you back to the login page
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "white", minHeight: "100vh", color: "black", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "gold", WebkitTextStroke: "1px black", fontSize: "3rem" }}>
        FRANNAS DASHBOARD
      </h1>
      <p>Welcome back! Your connection to the Backend is working perfectly.</p>
      
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
    </div>
  ); // Fixed: Added the closing parenthesis here
}