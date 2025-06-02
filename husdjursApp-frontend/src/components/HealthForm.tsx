import { useState } from "react";
import axios from "axios";

interface HealthFormProps {
  petId: number;
  onSaved?: () => void;
}
function HealthForm({ petId, onSaved }: HealthFormProps) {
  const [formData, setFormData] = useState<{
    type: string;
    description: string;
    health_date: string;
    vet: string;
    notes: string;
  }>({
    type: "",
    description: "",
    health_date: "",
    vet: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Skickar till backend:", formData);

    try {
      const response = await axios.post("http://localhost:5000/health", {
        ...formData,
        health_date:
          typeof formData.health_date === "string" &&
          formData.health_date.trim() !== ""
            ? formData.health_date
            : null,

        pet_id: petId,
      });
      if (response.status === 201) {
      }
      alert("Hälsa sparad!");
      onSaved?.();
    } catch (error) {
      console.error("Fel vid post:", error);
      alert("Något gick fel");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="type"
        placeholder="Typ av uppgift"
        value={formData.type}
        onChange={handleChange}
        required
      ></input>

      <input
        type="text"
        name="description"
        placeholder="Beskrivning av uppgift"
        value={formData.description}
        onChange={handleChange}
        required
      ></input>

      <input
        type="date"
        name="health_date"
        value={formData.health_date}
        onChange={handleChange}
        required
      ></input>

      <input
        type="text"
        name="vet"
        placeholder="veterinär"
        value={formData.vet}
        onChange={handleChange}
      ></input>
      <textarea
        name="notes"
        placeholder="Anteckningar"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Spara</button>
      <button>Avbryt</button>
    </form>
  );
}
export default HealthForm;
