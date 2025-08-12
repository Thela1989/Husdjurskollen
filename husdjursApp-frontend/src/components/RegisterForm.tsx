// src/components/RegisterForm.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL ?? ""; // om du använder proxy, kan vara tom

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        first_name,
        last_name,
        email,
        password,
      });

      // ✅ Spara token direkt
      localStorage.setItem("token", res.data.token);

      // ✅ Navigera till kontosidan
      navigate("/account");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error || "Något gick fel vid registreringen.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegisterForm">
      <h2 className="text-xl font-semibold text-center mb-4">Registrera dig</h2>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Förnamn</label>
          <input
            type="text"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Efternamn</label>
          <input
            type="text"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">E-post</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Registrerar…" : "Registrera dig"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
