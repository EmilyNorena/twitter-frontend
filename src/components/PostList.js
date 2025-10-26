import React, { useEffect } from "react";
import api from "../api";

export default function PostList({ posts, setPosts }) {
  // Cargar posts al montar
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosts();
  }, [setPosts]);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={post.id ?? index} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <h3>{post.authorName}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
