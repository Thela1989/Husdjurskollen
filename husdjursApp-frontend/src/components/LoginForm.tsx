import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginform() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      //Spara token i localstore
      localStorage.setItem("token", res.data.token);

      //navigera till konto-sidan
      navigate("/account");
    } catch (err) {
      setError("Fel e-post eller lösenord");
      console.error(err);
    }
  };

  return (
    <div className="LoginForm">
      <h1 className="LoginFormHeader">Logga in</h1>
      {error && <p className="ErrorMessage">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label className="Block text-sm mb-1">E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>{" "}
        <div>
          <label className="block text-sm mb-1">Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

export default Loginform;
