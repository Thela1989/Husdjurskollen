import { useState } from "react";
import axios from "axios";

interface Props {
  onEditDone?: () => void;
  name: string;
  email: string;
}

function UserForm({
  name: initialName,
  email: initialEmail,
  onEditDone,
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/users/2", {
        name,
        email,
      });

      onEditDone?.(); // Stäng formuläret eller uppdatera användaren
    } catch (error) {
      console.error("Kunde inte uppdatera användare:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Redigera testanvändare</h2>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Spara ändringar</button>
    </form>
  );
}

export default UserForm;
