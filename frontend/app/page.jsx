"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // FastAPI expects Form Data (URLSearchParams), not raw JSON
    const params = new URLSearchParams();
    params.append("username", form.email); // FastAPI maps 'username' to the email field
    params.append("password", form.password);

    try {
      const res = await axios.post("http://127.0.0.1:8000/login", params, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded" 
        }
      });

      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        router.push("/dashboard"); // Redirect to your gold dashboard
      }
    } catch (err) {
      // Friendly error handling for the UI
      setError(err.response?.data?.detail || "Connection to Frannas Backend failed.");
    }
  };
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.detail || "Invalid email or password";
      setError(message);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", background: "white", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "gold", WebkitTextStroke: "1px black", fontSize: "4rem", marginBottom: "30px" }}>FRANNAS</h1>
      
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "320px" }}>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "15px", border: "2px solid black", borderRadius: "8px" }} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "15px", border: "2px solid black", borderRadius: "8px" }} 
        />
        
        <button type="submit" style={{ padding: "18px", backgroundColor: "gold", fontWeight: "bold", fontSize: "1.1rem", border: "2px solid black", borderRadius: "8px", cursor: "pointer" }}>
          SIGN IN
        </button>
      </form>
    </div>
  );
}