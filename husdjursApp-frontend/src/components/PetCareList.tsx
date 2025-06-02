import { useEffect, useState } from "react";
import axios from "axios";

interface Entry {
  id: number;
  title: string;
  done: boolean;
}

interface Props {
  petId: number;
  petName: string;
  refreshKey: number;
}

function PetCareList({ petId, petName, refreshKey }: Props) {
  const [careEntries, setCareEntries] = useState<Entry[]>([]);
  const handleToggleDone = async (entry: Entry) => {
    try {
      await axios.put(`http://localhost:5000/petcare/${entry.id}`, {
        done: !entry.done,
      });
      setCareEntries(prev =>
        prev.map(e => (e.id === entry.id ? { ...e, done: !e.done } : e))
      );
    } catch (error) {
      console.error("Kunde inte uppdatera skötselstatus:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/petcare/${id}`);
      setCareEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort skötseluppgift:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/petcare?petId=${petId}`)
      .then(res => setCareEntries(res.data))
      .catch(err => console.error("Fel vid hämtning:", err));
  }, [petId, refreshKey]);

  return (
    <div>
      <h4>Skötselinformation för {petName}</h4>
      {careEntries.length === 0 ? (
        <p>Inga uppgifter.</p>
      ) : (
        <ul>
          {careEntries.map(entry => (
            <li
              key={entry.id}
              style={{ textDecoration: entry.done ? "line-through" : "none" }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={entry.done}
                  onChange={() => handleToggleDone(entry)}
                />
                {entry.title}
              </label>
              <button
                className="pet-check"
                onClick={() => handleDelete(entry.id)}
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PetCareList;
