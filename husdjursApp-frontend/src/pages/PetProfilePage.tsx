import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PetForm from "../components/pets/PetForm";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { api } from "../lib/api";

interface Pet {
  id: number;
  name: string;
  type: string;
  birth_date: string;
  gender: string;
  breed: string;
  color: string;
  owner_id?: number;
}

function PetProfilePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const loadUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setUserId(res.data.user.id);
    } catch (error) {
      console.error("Kunde inte hämta användare:", error);
    }
  }, []);

  const loadPets = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await api.get("/pets");
      const userPets = (res.data as Pet[]).filter(
        (pet) => pet.owner_id === userId,
      );

      setPets(userPets);
    } catch (error) {
      console.error("Kunde inte hämta husdjur:", error);
    }
  }, [userId]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`/pets/${id}`);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort husdjuret:", error);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  return (
    <div className="page-with-gradient">
      <Link to="/account">Till kontot</Link>

      <h1>Dina husdjur</h1>

      {showForm && !editingPet && userId && (
        <PetForm
          ownerId={userId}
          onPetCreated={(newPet) => {
            setPets((prev) => [...prev, newPet]);
            setShowForm(false);
          }}
        />
      )}

      {pets.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="border rounded-lg p-4 w-full sm:w-[250px] bg-gray-50"
            >
              {editingPet?.id === pet.id && userId ? (
                <PetForm
                  petToEdit={pet}
                  ownerId={userId}
                  onEditDone={() => {
                    setEditingPet(null);
                    loadPets();
                  }}
                  onPetCreated={(p) => {
                    setPets((prev) => [...prev, p]);
                    setEditingPet(null);
                  }}
                />
              ) : (
                <>
                  <p>
                    <strong>{pet.name}</strong>
                  </p>

                  <Link to={`/pet/${pet.id}`}>
                    <button>Visa djur</button>
                  </Link>

                  <button onClick={() => setEditingPet(pet)}>
                    Redigera djur <FaEdit />
                  </button>

                  <button onClick={() => handleDelete(pet.id)}>
                    Ta bort <FaTrash />
                  </button>

                  <Link to={`/pet/${pet.id}/health`}>
                    <button>{pet.name} – Hälsa</button>
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Inga husdjur hittades.</p>
      )}

      <button
        onClick={() => {
          setEditingPet(null);
          setShowForm((prev) => !prev);
        }}
      >
        {showForm ? (
          "Avbryt"
        ) : (
          <>
            Lägg till nytt djur <FaPlus />
          </>
        )}
      </button>
    </div>
  );
}

export default PetProfilePage;
