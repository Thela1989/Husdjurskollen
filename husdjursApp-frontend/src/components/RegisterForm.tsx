import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/RegisterForm.css";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      //Spara JWT token om den som skickar tillbaks
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setMessage("Registrering lyckades! Du är nu inloggad");
        navigate("/account");
      } else {
        setMessage("Registreringen lyckades, men ingen token mottagen");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(
        error?.response?.data?.error || "Kunde inte registrera användare."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Registrera dig</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      ></input>

      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      ></input>

      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      ></input>

      <button type="submit">Skicka</button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default RegisterForm;
