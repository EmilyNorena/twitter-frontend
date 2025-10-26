import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { setAuthToken } from "./api";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import api from "./api";

function App() {
  const auth = useAuth();
  const token = auth.user?.id_token;

  const [posts, setPosts] = useState([]);

  // Configurar token para axios
  useEffect(() => {
    if (auth.isAuthenticated && token) {
      setAuthToken(token);
    }
  }, [auth.isAuthenticated, token]);

  // Sincronizar usuario en backend
  useEffect(() => {
    if (auth.isAuthenticated) {
      const email = auth.user?.profile.email;
      const name =
        auth.user?.profile.name ||
        auth.user?.profile["custom:Nombre"] ||
        "Usuario";

      api
        .post("/users/sync", { email, name })
        .then((res) => console.log("Usuario sincronizado:", res.data))
        .catch((err) => console.error("Error sincronizando usuario:", err));
    }
  }, [auth.isAuthenticated]);

  const signOutRedirect = () => {
    setAuthToken(null);
    auth.removeUser();
    const clientId = "6fumdcr14b66magmhp633e4ek9";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain =
      "https://us-east-14pfkjrmhw.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) return <div>Cargando...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;
  if (!auth.isAuthenticated)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button onClick={() => auth.signinRedirect()}>Iniciar sesión</button>
        <p>Si no tienes cuenta, regístrate en la página de login de Cognito</p>
      </div>
    );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={signOutRedirect}>Cerrar sesión</button>
      <h2>Stream de Posts</h2>
      <CreatePost setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
