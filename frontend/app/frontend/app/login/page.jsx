"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", category: "Coding" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Change "/login" to "/" because your login is now the home page
    if (!token) { router.push("/"); return; }
    
    axios.get("http://localhost:8000/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(() => router.push("/"));

    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/projects", newProject);
      setNewProject({ title: "", description: "", category: "Coding" });
      fetchProjects();
    } catch (err) {
      alert("Failed to save project. Is the backend running?");
    }
  };

  const deleteProject = async (id) => {
    if (confirm("Delete this project?")) {
      await axios.delete(`http://localhost:8000/projects/${id}`);
      fetchProjects();
    }
  };

  if (!user) return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <p style={{color: "gold", fontSize: "1.2rem", fontWeight: "bold"}}>Loading Blacky Dashboard...</p>
    </div>
  );

  return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", paddingBottom: "20px" }}>
        <h1 style={{ color: "gold", margin: 0, letterSpacing: "2px" }}>FRANNAS <span style={{color: "#fff"}}>IMPACT</span></h1>
        <div style={{textAlign: "right"}}>
          <p style={{margin: 0, fontSize: "14px", color: "#aaa"}}>Active: <strong>{user.username}</strong></p>
          <button onClick={() => { localStorage.removeItem("token"); router.push("/"); }} 
                  style={{ background: "none", color: "gold", border: "1px solid gold", padding: "5px 15px", marginTop: "10px", cursor: "pointer", borderRadius: "4px", fontWeight: "bold" }}>
            Logout
          </button>
        </div>
      </header>

      {/* PROJECT FORM */}
      <section style={{ backgroundColor: "#111", padding: "30px", borderRadius: "12px", marginTop: "30px", border: "1px solid #222" }}>
        <h2 style={{ color: "gold", marginTop: 0, fontSize: "1.5rem" }}>Create New Project</h2>
        <form onSubmit={handleSaveProject} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <input 
            placeholder="Project Title" 
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#222", color: "white", border: "1px solid #444" }}
            required
          />
          <select 
             value={newProject.category}
             onChange={(e) => setNewProject({...newProject, category: e.target.value})}
             style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#222", color: "white", border: "1px solid #444" }}>
             <option>Coding</option>
             <option>Content Creation</option>
             <option>Sustainability</option>
          </select>
          <textarea 
            placeholder="What are we building today?" 
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#222", color: "white", border: "1px solid #444", gridColumn: "span 2", minHeight: "80px" }}
          />
          <button type="submit" style={{ padding: "15px", backgroundColor: "gold", color: "black", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", gridColumn: "span 2", textTransform: "uppercase" }}>
            Deploy to Portfolio
          </button>
        </form>
      </section>

      {/* LIST SECTION */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ borderLeft: "4px solid gold", paddingLeft: "15px", color: "white" }}>Active Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {projects.length === 0 ? (
            <p style={{ color: "#666" }}>No projects deployed yet. Start creating!</p>
          ) : (
            projects.map((p) => (
              <div key={p.id} style={{ backgroundColor: "#111", padding: "20px", borderRadius: "10px", border: "1px solid #333", position: "relative", transition: "0.3s border-color" }}>
                <span style={{fontSize: "10px", color: "gold", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold"}}>{p.category}</span>
                <h3 style={{ margin: "5px 0", color: "#fff" }}>{p.title}</h3>
                <p style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.5" }}>{p.description}</p>
                <button onClick={() => deleteProject(p.id)} 
                        style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: "20px" }}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}