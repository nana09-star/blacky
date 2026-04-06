"use client";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    alert("System: Attempting to connect to Backend...");
    try {
      const res = await axios.post("http://127.0.0.1:8000/register", {
        username: username,
        email: email,
        password: password
      });
      alert("Success! User created.");
    } catch (err) {
      alert("Connection Error: Is the Python terminal running?");
    }
  };

  return (
    <div style={{ padding: "50px", color: "black", background: "white", minHeight: "100vh" }}>
      <h1>Frannas Registration</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px" }}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} style={{border: "1px solid #000", padding: "8px"}} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{border: "1px solid #000", padding: "8px"}} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{border: "1px solid #000", padding: "8px"}} />
        <button onClick={handleRegister} style={{ backgroundColor: "gold", padding: "10px", fontWeight: "bold", cursor: "pointer" }}>
          CLICK TO REGISTER
        </button>
      </div>
    </div>
  );
}