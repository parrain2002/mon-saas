import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Auth.service.ts";
import "../styles/auth.css";


export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

   try {
      // 🚨 CORRECTION : Appeler la fonction login avec les deux arguments séparés
      // Le service frontend se chargera de former l'objet JSON {email, password}
      const res = await login(email, password); 

      // Assurez-vous que la déstructuration correspond au retour du backend :
      // Backend renvoie: { access_token: string, role: string }
      const { access_token, role } = res; // 👈 Déstructuration directe si res est déjà l'objet de données

      if (!access_token || !role) {
        setError("Réponse du serveur incomplète.");
        return;
      }


      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      if (role === "ADMIN") nav("/dashboard");
      else if (role === "MANAGER") nav("/dashboard");
      else nav("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        No account? <a href="/register">Register here</a>
      </p>
    </div>
  </div>
);

}
