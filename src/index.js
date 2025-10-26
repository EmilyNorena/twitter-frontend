import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_4PfkJRMhW",
  client_id: "6fumdcr14b66magmhp633e4ek9",
  redirect_uri: "http://localhost:3000", //CAMBIAR EN DESPLIEGUE
  response_type: "code",
  scope: "email openid phone profile",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


