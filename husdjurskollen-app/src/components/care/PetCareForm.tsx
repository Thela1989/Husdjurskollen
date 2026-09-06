import { useState } from "react";
import axios from "axios";

interface Props {
  petId: number;
  onSaved?: () => void;
}

function PetCareForm({ petId, onSaved }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/petcare", {
        pet_id: petId,
        title,
      });
      console.log("Uppgift sparad:", res.data);
      setTitle("");
      onSaved?.();
    } catch (err) {
      console.error("Fel vid post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="T.ex Kloklippning"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type="submit">Lägg till uppgift</button>
    </form>
  );
}

export default PetCareForm;
