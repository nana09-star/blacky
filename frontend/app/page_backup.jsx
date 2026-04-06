"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  
  // FastAPI's OAuth2PasswordRequestForm expects "username" and "password"
  const params = new URLSearchParams();
  params.append("username", email); // We put the email here
  params.append("password", password);

  try {
    // We use /login because that's what is in your main.py
    const res = await axios.post("http://127.0.0.1:8000/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      alert("Success! Entering Frannas...");
      window.location.href = "/dashboard";
    }
  } catch (err) {
    console.error(err);
    alert("Login failed. Check the terminal for details.");
  }
};
    } catch (err) {
      console.error(err);
      setError("Login failed. Check your email/password or Backend terminal.");
      alert("Error: " + (err.response?.data?.detail || "Could not connect to backend"));
    }
  };

  return (
    <div style={{ padding: "100px", textAlign: "center", background: "white", color: "black", minHeight: "100vh" }}>
      <h1 style={{ color: "gold", WebkitTextStroke: "1px black" }}>Frannas Login</h1>
      
      <form onSubmit={handleLogin} style={{ display: "inline-flex", flexDirection: "column", gap: "15px", width: "300px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid black" }} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "12px", border: "1px solid black" }} 
        />
        
        <button type="submit" style={{ padding: "15px", backgroundColor: "gold", fontWeight: "bold", cursor: "pointer" }}>
          SIGN IN
        </button>
        
        <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => router.push("/")}>
          Don't have an account? Register here
        </p>
      </form>
    </div>
  );
}