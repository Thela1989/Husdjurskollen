import { useEffect, useState } from "react";
import axios from "axios";

interface HealthEntry {
  id: number;
  type: string;
  description: string;
  health_date: string;
  vet: string;
  notes: string;
}

interface HealthListProps {
  petId: number;
  petName: string;
  onEdit?: (entry: HealthEntry) => void;
  refreshKey?: number;
}

function formateDate(dateString: string | null): string {
  if (!dateString) return "Okänt datum";
  return dateString.split("T")[0];
}

function HealthList(props: HealthListProps) {
  const { petId, petName, refreshKey } = props;
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formState, setFormState] = useState<Partial<HealthEntry>>({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/health?petid=${petId}`)
      .then(res => setHealthEntries(res.data))
      .catch(err => console.error("Fel vid hämtning av hälsodata", err));
  }, [petId, refreshKey]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  const handleEditClick = (entry: HealthEntry) => {
    setEditingId(entry.id);
    setFormState(entry);
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/health/${editingId}`, formState);
      setEditingId(null);
      setFormState({});

      const res = await axios.get(
        `http://localhost:5000/health?petid=${petId}`
      );
      setHealthEntries(res.data);
    } catch (err) {
      console.error("Fel vid uppdatering", err);
    }
  };

  const handleDelete = async (id: number) => {
    console.log("Försöker ta bort hälsopost med id:", id);
    try {
      await axios.delete(`http://localhost:5000/health/${id}`);
      setHealthEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Fel vid borttagning", error);
    }
  };
  return (
    <div>
      <h3>Hälsoinformation för {petName}</h3>
      {healthEntries.length === 0 ? (
        <p>Det finns ingen hälsoinformation att visa.</p>
      ) : (
        <ul>
          {healthEntries.map(entry => (
            <li key={entry.id}>
              {editingId === entry.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    name="type"
                    value={formState.type || ""}
                    onChange={handleChange}
                  ></input>
                  <input
                    name="description"
                    value={formState.description || ""}
                    onChange={handleChange}
                  ></input>
                  <input
                    name="health_date"
                    type="date"
                    value={
                      formState.health_date
                        ? formState.health_date.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                  ></input>
                  <input
                    name="vet"
                    value={formState.vet || ""}
                    onChange={handleChange}
                  ></input>
                  <input
                    name="notes"
                    value={formState.notes || ""}
                    onChange={handleChange}
                  ></input>
                  <button type="submit">Spara</button>

                  <button type="button" onClick={() => setEditingId(null)}>
                    Avbryt
                  </button>
                </form>
              ) : (
                <>
                  <strong>{entry.type}</strong>
                  <br />
                  Beskrivning: {entry.description}
                  <br />
                  Datum: {formateDate(entry.health_date)}
                  <br />
                  Veterinär: {entry.vet}
                  <br />
                  Anteckningar: {entry.notes}
                  <br />
                  <div className="health-btn">
                    <button onClick={() => handleEditClick(entry)}>
                      Redigera
                    </button>
                    <button onClick={() => handleDelete(entry.id)}>
                      Ta bort{" "}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HealthList;
