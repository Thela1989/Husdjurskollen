import { useEffect, useState } from "react";
import { AvatarUploader } from "../user/AvatarUploader";
import { api } from "../../lib/api";

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
  const petTypes = ["Hund", "Katt", "Kanin", "Fagel", "Annat"];
  const genderOptions = ["Hona", "Hane", "Okant"];

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!petToEdit) return;

    setName(petToEdit.name);
    setType(petToEdit.type);
    setBirthDate(new Date(petToEdit.birth_date).toISOString().split("T")[0]);
    setBreed(petToEdit.breed);
    setGender(petToEdit.gender);
    setColor(petToEdit.color);
    setSelectedAvatar(localStorage.getItem(`petAvatar:${petToEdit.id}`) || "");
  }, [petToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Du behöver ange ett namn på djuret.");
      return;
    }

    const payload = {
      name: name.trim(),
      type: type.trim() || null,
      birth_date: birthDate || null,
      owner_id: ownerId,
      breed: breed.trim() || null,
      gender: gender.trim() || null,
      color: color.trim() || null,
    };

    try {
      if (petToEdit) {
        await api.put(`/pets/${petToEdit.id}`, payload);

        if (selectedAvatar) {
          localStorage.setItem(`petAvatar:${petToEdit.id}`, selectedAvatar);
        }

        onEditDone?.();
      } else {
        const response = await api.post("/pets", payload);

        if (selectedAvatar && response.data?.id) {
          localStorage.setItem(`petAvatar:${response.data.id}`, selectedAvatar);
        }

        onPetCreated(response.data);
      }

      setMessage(petToEdit ? "Husdjur uppdaterat." : "Husdjur tillagt.");
      setName("");
      setType("");
      setBirthDate("");
      setBreed("");
      setGender("");
      setColor("");
      setSelectedAvatar("");
    } catch (error: any) {
      console.error("Fel vid inskick:", error);
      setMessage(
        error?.response?.data?.error || "Det gick inte att spara husdjuret.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pet-form-shell">
      <header className="pet-form-hero">
        <h2>{petToEdit ? "Redigera husdjur" : "Lagg till ett husdjur"}</h2>
        <p>
          Fyll i information om ditt nya familjemedlem
          <span className="pet-form-heart"></span>
        </p>
      </header>

      <section className="pet-form-card">
        <h3>
          <span className="pet-form-badge">i</span>
          Grundinformation
        </h3>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">*</span>
          <input
            type="text"
            placeholder="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">D</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">T</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Typ av djur</option>
            {petTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">R</span>
          <input
            type="text"
            placeholder="Ras"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">F</span>
          <input
            type="text"
            placeholder="Farg"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label className="pet-form-field">
          <span className="pet-form-field-icon">K</span>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Kon</option>
            {genderOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="pet-form-avatar-section">
        <h3>Profilbild</h3>
        <AvatarUploader onAvatarChange={setSelectedAvatar} />
      </section>

      <button className="pet-form-submit" type="submit">
        {petToEdit ? "Spara andringar" : "Lagg till husdjur"}
      </button>

      {message && <p className="pet-form-message">{message}</p>}
    </form>
  );
}
