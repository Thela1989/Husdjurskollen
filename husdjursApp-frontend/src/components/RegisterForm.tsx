// src/components/RegisterForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

function RegisterForm() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const name = `${first_name} ${last_name}`.trim();

      // Antaget att backend returnerar { token, user: { id, name, email } }
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const { token, user } = res.data || {};

      if (!user?.id) {
        throw new Error("Kunde inte läsa ut user.id från svaret.");
      }

      // 🔹 Spara token och id så att /account kan ladda /auth/me
      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("userId", String(user.id));

      // Skicka användaren till konto-sidan direkt
      navigate("/account");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        "Något gick fel vid registreringen.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegisterForm">
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Förnamn"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Efternamn"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrerar..." : "Registrera"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
