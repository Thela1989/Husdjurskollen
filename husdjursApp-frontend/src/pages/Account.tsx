import { useEffect, useState } from "react";
import axios from "axios";
import PetForm from "../components/PetForm";
import UserForm from "../components/UserForm";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

// Typdefinitioner
interface User {
  id: number;
  name: string;
  email: string;
  style: string;
}

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

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editUserMode, setEditUserMode] = useState(false);

  // Lägg till nytt husdjur
  const handlePetCreated = (newPet: Pet) => {
    setPets(prev => [...prev, newPet]);
    setShowForm(false);
  };

  // Ta bort husdjur
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort husdjuret:", error);
    }
  };

  // Hämta husdjur
  const refreshingPets = () => {
    axios.get("http://localhost:5000/pets").then(res => {
      const userPets = res.data.filter((pet: Pet) => pet.owner_id === user?.id);
      setPets(userPets);
    });
  };

  // Hämta användare
  useEffect(() => {
    axios.get("http://localhost:5000/users").then(res => {
      const found = res.data.find((u: User) => u.id === 2); // <-- justera om du har inloggning
      setUser(found);
    });
    refreshingPets();
  }, []);

  return (
    <div className="page-wrapper p-6">
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <Link className="text-blue-600 underline mb-2 inline-block" to="/">
          Till startsidan
        </Link>
        <h1 className="text-2xl font-bold mb-4">Ditt konto</h1>

        {!user ? (
          <p>Laddar användare...</p>
        ) : (
          <>
            {editUserMode ? (
              <UserForm
                name={user.name}
                email={user.email}
                onEditDone={() => {
                  setEditUserMode(false);
                  axios.get("http://localhost:5000/users").then(res => {
                    const found = res.data.find((u: User) => u.id === 2);
                    setUser(found);
                  });
                }}
              />
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <CgProfile /> {user.name}
                </h2>
                <p className="mb-2">{user.email}</p>
                <button
                  onClick={() => setEditUserMode(true)}
                  className="bg-black text-white px-4 py-2 rounded-full mb-4"
                >
                  Redigera användare <FaEdit className="inline ml-2" />
                </button>
              </>
            )}

            {showForm && !editingPet && (
              <PetForm onPetCreated={handlePetCreated} ownerId={user.id} />
            )}

            <h3 className="text-lg font-semibold mt-6 mb-2">Dina husdjur</h3>

            {pets.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {pets.map(pet => (
                  <div
                    key={pet.id}
                    className="border rounded-lg p-4 w-full sm:w-[250px] bg-gray-50"
                  >
                    {editingPet?.id === pet.id ? (
                      <PetForm
                        petToEdit={pet}
                        ownerId={user.id}
                        onEditDone={() => {
                          setEditingPet(null);
                          refreshingPets();
                        }}
                        onPetCreated={handlePetCreated}
                      />
                    ) : (
                      <>
                        <p>
                          <strong>Namn:</strong> {pet.name}
                        </p>
                        <p>
                          <strong>Född:</strong>{" "}
                          {new Date(pet.birth_date).toLocaleDateString("sv-SE")}
                        </p>
                        <p>
                          <strong>Typ:</strong> {pet.type}
                        </p>
                        <p>
                          <strong>Ras:</strong> {pet.breed}
                        </p>
                        <p>
                          <strong>Färg:</strong> {pet.color}
                        </p>
                        <p>
                          <strong>Kön:</strong> {pet.gender}
                        </p>

                        <div className="mt-3 space-y-2">
                          <button
                            onClick={() => setEditingPet(pet)}
                            className="bg-gray-800 text-white px-3 py-1 rounded-full w-full"
                          >
                            Redigera djur <FaEdit className="inline ml-1" />
                          </button>

                          <button
                            onClick={() => handleDelete(pet.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-full w-full"
                          >
                            Ta bort <FaTrash className="inline ml-1" />
                          </button>

                          {/* 🔗 Knapp till hälsoöversikt */}
                          <Link to={`/pet/${pet.id}/health`}>
                            <button className="bg-black text-white px-3 py-1 rounded-full w-full">
                              {pet.name} – Hälsa
                            </button>
                          </Link>
                        </div>
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
                setShowForm(prev => !prev);
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full"
            >
              {showForm ? (
                "Avbryt"
              ) : (
                <>
                  Lägg till nytt djur <FaPlus className="inline ml-1" />
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
