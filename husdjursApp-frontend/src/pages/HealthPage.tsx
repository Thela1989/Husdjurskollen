import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import VaccinationSection from "../components/VaccinationSection";
import DewormingSection from "../components/DewormingSection";
import WeightSection from "../components/WeightSection";
import OtherSection from "../components/OtherSection";

interface Pet {
  id: number;
  name: string;
  type: string;
  owner_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const PetHealthPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    // Hämta användaren (mockad med id = 2 just nu)
    axios.get("http://localhost:5000/users").then(res => {
      const foundUser = res.data.find((u: User) => u.id === 2);
      setUser(foundUser);
    });

    // Hämta djuret
    axios.get(`http://localhost:5000/pets/${id}`).then(res => {
      setPet(res.data);
    });
  }, [id]);

  const toggleSection = (sectionName: string) => {
    setOpenSection(prev => (prev === sectionName ? null : sectionName));
  };

  if (!user || !pet) return <p className="p-4">Laddar...</p>;

  // 🚫 Om djuret inte tillhör användaren
  if (pet.owner_id !== user.id) {
    return (
      <p className="p-4 text-red-600">
        Du har inte behörighet att se detta djur.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-600 underline block mb-4">
        ← Till startsidan
      </Link>

      <h1 className="text-2xl font-bold mb-6">{pet.name} – Hälsa</h1>

      {/* 🔹 Knapparna */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => toggleSection("vaccination")}
          className="bg-black text-white py-2 px-4 rounded-full"
        >
          Vaccinationer
        </button>
        <button
          onClick={() => toggleSection("deworming")}
          className="bg-black text-white py-2 px-4 rounded-full"
        >
          Avmaskning
        </button>
        <button
          onClick={() => toggleSection("weight")}
          className="bg-black text-white py-2 px-4 rounded-full"
        >
          Vikt
        </button>
        <button
          onClick={() => toggleSection("other")}
          className="bg-black text-white py-2 px-4 rounded-full"
        >
          Övrigt
        </button>
      </div>

      {/* 🔻 Sektioner som visas */}
      <div className="mt-6 space-y-4">
        {openSection === "vaccination" && (
          <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Vaccinationer</h2>
            <VaccinationSection />
          </div>
        )}

        {openSection === "deworming" && (
          <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Avmaskning</h2>
            <DewormingSection />
          </div>
        )}

        {openSection === "weight" && (
          <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Vikt</h2>
            <WeightSection />
          </div>
        )}

        {openSection === "other" && (
          <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Övrigt</h2>
            <OtherSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default PetHealthPage;
