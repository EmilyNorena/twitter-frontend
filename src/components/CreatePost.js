import React, { useState } from "react";
import api from "../api";

export default function CreatePost({ setPosts }) {
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body) return;

    try {
      const res = await api.post("/posts", { body });
      setBody("");

      // Actualizar la lista de posts agregando el nuevo al inicio
      setPosts((prevPosts) => [res.data, ...prevPosts]);
    } catch (err) {
      console.error(err);
      alert("Error al crear el post");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <textarea
        maxLength="140"
        placeholder="¿Qué estás pensando?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{ width: "80%", padding: "10px" }}
      />
      <br />
      <button type="submit" style={{ marginTop: "10px" }}>Publicar</button>
    </form>
  );
}
