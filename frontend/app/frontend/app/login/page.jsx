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
    if (!token) { router.push("/login"); return; }
    
    axios.get("http://localhost:8000/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(() => router.push("/login"));

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:8000/projects");
    setProjects(res.data);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/projects", newProject);
    setNewProject({ title: "", description: "", category: "Coding" });
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (confirm("Delete this project?")) {
      await axios.delete(`http://localhost:8000/projects/${id}`);
      fetchProjects();
    }
  };

  if (!user) return <p style={{color: "white", textAlign: "center", marginTop: "50px"}}>Loading Blacky Dashboard...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #333", paddingBottom: "20px" }}>
        <h1 style={{ color: "gold", margin: 0 }}>Frannas <span style={{color: "#fff"}}>Impact</span></h1>
        <div style={{textAlign: "right"}}>
          <p style={{margin: 0, fontSize: "14px"}}>Logged in as: <strong>{user.username}</strong></p>
          <button onClick={() => { localStorage.removeItem("token"); router.push("/login"); }} 
                  style={{ background: "none", color: "gold", border: "1px solid gold", padding: "5px 10px", marginTop: "10px", cursor: "pointer", borderRadius: "4px" }}>
            Logout
          </button>
        </div>
      </header>

      {/* FORM SECTION */}
      <section style={{ backgroundColor: "#111", padding: "30px", borderRadius: "12px", marginTop: "30px", border: "1px solid #222" }}>
        <h2 style={{ color: "gold", marginTop: 0 }}>Add New Project</h2>
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
            placeholder="Project Description" 
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#222", color: "white", border: "1px solid #444", gridColumn: "span 2" }}
          />
          <button type="submit" style={{ padding: "12px", backgroundColor: "gold", color: "black", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", gridColumn: "span 2" }}>
            Deploy Project
          </button>
        </form>
      </section>

      {/* PROJECT LIST */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ borderLeft: "4px solid gold", paddingLeft: "15px" }}>Active Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {projects.map((p) => (
            <div key={p.id} style={{ backgroundColor: "#111", padding: "20px", borderRadius: "10px", border: "1px solid #333", position: "relative" }}>
              <span style={{fontSize: "10px", color: "gold", textTransform: "uppercase", letterSpacing: "1px"}}>{p.category || "General"}</span>
              <h3 style={{ margin: "5px 0", color: "#fff" }}>{p.title}</h3>
              <p style={{ color: "#aaa", fontSize: "14px" }}>{p.description}</p>
              <button onClick={() => deleteProject(p.id)} 
                      style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "18px" }}>
                ×
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}