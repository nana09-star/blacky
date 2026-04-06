"use client";

export default function Dashboard() {
  return (
    <div style={{ padding: "40px", backgroundColor: "white", minHeight: "100vh", color: "black" }}>
      <h1 style={{ color: "gold", WebkitTextStroke: "1px black" }}>FRANNAS DASHBOARD</h1>
      <p>Welcome back! Your connection to the Backend is working perfectly.</p>
      
      <div style={{ marginTop: "20px", border: "2px solid gold", padding: "20px", borderRadius: "10px" }}>
        <h3>Active Sessions</h3>
        <p>User: admin@frannas.com</p>
        <p>Status: <span style={{ color: "green", fontWeight: "bold" }}>● Online</span></p>
      </div>
    </div>
  );
}