"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", form);
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Blacky Auth</h1>
      <div style={{ display: "inline-block", textAlign: "left", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>Login</h2>
        
        {/* Fix: This now properly displays the error text */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            style={{ padding: "8px", color: "black" }}
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            style={{ padding: "8px", color: "black" }}
            required 
          />
          
          <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          No account? <span style={{ color: "#0070f3", cursor: "pointer", textDecoration: "underline" }} onClick={() => router.push("/")}>Register</span>
        </p>
      </div>
    </div>
  );
}