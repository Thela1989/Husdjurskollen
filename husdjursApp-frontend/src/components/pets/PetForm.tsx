import { useEffect, useState } from "react";
import axios from "axios";

// 👇 Lägg till Pet-interfacet om det inte importeras från en gemensam types.ts
interface Pet {
  id: number;
  name: string;
  type: string;
  birth_date: string;
  breed: string;
  gender: string;
  color: string;
}

interface Props {
  onPetCreated: (newPet: Pet) => void;
  ownerId: number;
  petToEdit?: Pet;
  onEditDone?: () => void;
}

export default function PetForm({
  onPetCreated,
  ownerId,
  petToEdit,
  onEditDone,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  // 🔄 Fyll i fälten om vi redigerar
  useEffect(() => {
    if (petToEdit) {
      setName(petToEdit.name);
      setType(petToEdit.type);
      setBirthDate(new Date(petToEdit.birth_date).toISOString().split("T")[0]);
      setBreed(petToEdit.breed);
      setGender(petToEdit.gender);
      setColor(petToEdit.color);
    }
  }, [petToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      type,
      birth_date: birthDate,
      owner_id: ownerId,
      breed,
      gender,
      color,
    };

    try {
      if (petToEdit) {
        // Redigera djur
        await axios.put(`http://localhost:5000/pets/${petToEdit.id}`, payload);
        if (onEditDone) onEditDone();
      } else {
        // Lägg till nytt djur
        const response = await axios.post(
          "http://localhost:5000/pets",
          payload
        );
        onPetCreated(response.data);
      }

      // Rensa fälten
      setName("");
      setType("");
      setBirthDate("");
      setBreed("");
      setGender("");
      setColor("");
    } catch (error: any) {
      console.error("Fel vid inskick:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{petToEdit ? "Redigera husdjur" : "Lägg till ett husdjur"}</h2>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="date"
        value={birthDate}
        onChange={e => setBirthDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Typ av djur"
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ras"
        value={breed}
        onChange={e => setBreed(e.target.value)}
      />
      <input
        type="text"
        placeholder="Färg"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kön"
        value={gender}
        onChange={e => setGender(e.target.value)}
      />
      <button type="submit">
        {petToEdit ? "Spara ändringar" : "Lägg till husdjur"}
      </button>
    </form>
  );
}
