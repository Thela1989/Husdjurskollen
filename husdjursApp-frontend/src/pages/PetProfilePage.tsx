import PetProfileCard from "../components/pets/PetProfileCard";
import PetFeatureCard from "../components/pets/PetFeatureCard";
import PetStatusCard from "../components/pets/PetStatusCard";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

interface Pet {
  id: number;
  name: string;
  type: string;
  birth_date?: string;
}

function toYearsLabel(birthDate?: string): string {
  if (!birthDate) return "okänd ålder";
  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return "okänd ålder";

  const now = new Date();
  let years = now.getFullYear() - parsed.getFullYear();
  const monthDiff = now.getMonth() - parsed.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < parsed.getDate())) {
    years -= 1;
  }

  if (years < 0) return "okänd ålder";
  return years === 1 ? "1 år" : `${years} år`;
}

function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const petId = Number(id);
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      if (!petId) {
        setPet(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get("/pets");
        const pets = response.data as Pet[];
        const selectedPet = pets.find((item) => item.id === petId) || null;
        setPet(selectedPet);
      } catch (error) {
        console.error("Kunde inte hämta husdjur:", error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [petId]);

  const petAvatar = useMemo(() => {
    if (!petId) return null;
    return localStorage.getItem(`petAvatar:${petId}`);
  }, [petId]);

  const petName = pet?.name || "Husdjur";
  const petSubtitle = pet
    ? `${pet.type || "Okänd typ"} • ${toYearsLabel(pet.birth_date)}`
    : "Ingen data";

  return (
    <main className="pet-profile-page">
      <section className="pet-profile-title">
        <h1>{loading ? "Laddar..." : petName}</h1>
        <p>{loading ? "Hämtar husdjursdata" : petSubtitle}</p>
      </section>

      <PetProfileCard
        name={petName}
        subtitle={petSubtitle}
        avatarUrl={petAvatar}
      />

      <section className="pet-feature-grid">
        <PetFeatureCard title="Hälsa" />
        <PetFeatureCard title="Skötsel" />
        <PetFeatureCard title="Påminnelser" />
        <PetFeatureCard title="Trygghetsplan" />
      </section>

      <PetStatusCard />
    </main>
  );
}

export default PetProfilePage;
