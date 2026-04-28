import { useState } from "react";
import axios from "axios";

interface Props {
  userId?: number; // Om den finns: uppdatera, annars: registrera ny
  onEditDone?: () => void;
  name?: string;
  email?: string;
}

function UserForm({ userId, onEditDone, name = "", email = "" }: Props) {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userId) {
        // Uppdatera befintlig användare
        await axios.put(`http://localhost:5000/users/${userId}`, {
          name: userName,
          email: userEmail,
        });
        setMessage("Användare uppdaterad ✅");
      } else {
        // Registrera ny användare
        await axios.post("http://localhost:5000/api/register", {
          username: userName,
          email: userEmail,
          password: "test1234", // Tillfälligt – vi kan lägga till lösenordsfält också
        });
        setMessage("Användare registrerad 🎉");
      }

      onEditDone?.();
    } catch (error) {
      console.error("Fel vid användarhantering:", error);
      setMessage("Något gick fel ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <h2>{userId ? "Redigera användare" : "Registrera användare"}</h2>

      <input
        type="text"
        placeholder="Namn"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-post"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      {!userId && (
        <input
          type="password"
          placeholder="Lösenord"
          disabled
          className="opacity-50 cursor-not-allowed"
        />
      )}
      <button type="submit">{userId ? "Spara ändringar" : "Registrera"}</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UserForm;
