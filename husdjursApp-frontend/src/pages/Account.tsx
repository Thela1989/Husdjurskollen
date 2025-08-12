// src/pages/Account.tsx
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PetForm from "../components/PetForm";
import UserForm from "../components/UserForm";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
<<<<<<< HEAD
import api from "../lib/api";
=======
>>>>>>> parent of 8669658 (startat med login formuläret)

// Typdefinitioner
interface User {
  id: number;
  name: string;
  email: string;
  style?: string;
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
  const [loadingUser, setLoadingUser] = useState(true);
  const [errUser, setErrUser] = useState<string>("");

<<<<<<< HEAD
  // Hjälpare: mappa olika svarformat till vår User
  const mapToUser = useCallback((data: any): User | null => {
    if (!data) return null;
    // Vanligt: { user: { id, name, email } }
    if (data.user?.id) {
      return {
        id: data.user.id,
        name:
          data.user.name ??
          `${data.user.first_name ?? ""} ${data.user.last_name ?? ""}`.trim(),
        email: data.user.email,
      };
    }
    // Alternativt: { id, first_name, last_name, email }
    if (data.id && (data.name || data.first_name)) {
      return {
        id: data.id,
        name:
          data.name ??
          `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
        email: data.email,
      };
    }
    return null;
  }, []);

  // Ladda inloggad användare
  const loadUser = useCallback(async () => {
    setLoadingUser(true);
    setErrUser("");
    try {
      // 1) Primärt: /auth/me (kräver att backend har denna)
      const res = await api.get("/api/auth/me");
      const u = mapToUser(res.data);
      if (u) {
        setUser(u);
        return;
      }
      throw new Error("auth/me gav inget användarobjekt");
    } catch (e1: any) {
      console.warn(
        "GET /api/auth/me misslyckades:",
        e1?.response?.status,
        e1?.message
      );

      // 2) Fallback: använd userId från localStorage och hämta /api/users/:id
      const id = localStorage.getItem("userId");
      if (!id) {
        setUser(null);
        setErrUser("Ingen token eller userId — logga in igen.");
        setLoadingUser(false);
        return;
      }
      try {
        const res2 = await api.get(`/api/users/${id}`);
        const u2 = mapToUser(res2.data) ?? res2.data; // stöd både {user} och direkt fält
        if (!u2?.id) throw new Error("users/:id gav inget användarobjekt");
        setUser({
          id: u2.id,
          name:
            u2.name ?? `${u2.first_name ?? ""} ${u2.last_name ?? ""}`.trim(),
          email: u2.email,
        });
      } catch (e2: any) {
        console.error(
          "Fallback /api/users/:id misslyckades:",
          e2?.response?.status,
          e2?.message
        );
        setUser(null);
        setErrUser(e2?.response?.data?.error || "Kunde inte hämta användare.");
      } finally {
        setLoadingUser(false);
      }
      return;
    } finally {
      // Om första try:et lyckades går vi inte hit förrän efter setUser; bra att ha ändå
      setLoadingUser(false);
    }
  }, [mapToUser]);

  // Hämta husdjur (behöver user.id)
  const loadPets = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await api.get("/api/pets");
      const userPets = (res.data as Pet[]).filter(p => p.owner_id === user.id);
      setPets(userPets);
    } catch (e) {
      console.error("Kunde inte hämta husdjur:", e);
    }
  }, [user?.id]);
=======
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
>>>>>>> parent of 8669658 (startat med login formuläret)

  // Ta bort husdjur
  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`/api/pets/${id}`);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error("Kunde inte ta bort husdjuret:", e);
    }
  }, []);

  // När sidan mountar → hämta user
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // När user finns → hämta husdjur
  useEffect(() => {
    loadPets();
  }, [loadPets]);

  return (
    <div className="page-wrapper p-6">
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <Link className="text-blue-600 underline mb-2 inline-block" to="/">
          Till startsidan
        </Link>
        <h1 className="text-2xl font-bold mb-4">Ditt konto</h1>

        {loadingUser ? (
          <p>Laddar användare...</p>
        ) : errUser ? (
          <p className="text-red-600">{errUser}</p>
        ) : !user ? (
          <p>Ingen användare hittades. Prova logga in igen.</p>
        ) : (
          <>
            {editUserMode ? (
              <UserForm
                userId={user.id}
                name={user.name}
                email={user.email}
                onEditDone={async () => {
                  setEditUserMode(false);
<<<<<<< HEAD
                  await loadUser(); // uppdatera visningen efter PUT
=======
                  axios.get("http://localhost:5000/users").then(res => {
                    const found = res.data.find((u: User) => u.id === 2);
                    setUser(found);
                  });
>>>>>>> parent of 8669658 (startat med login formuläret)
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
              <PetForm
                onPetCreated={newPet => {
                  setPets(prev => [...prev, newPet]);
                  setShowForm(false);
                }}
                ownerId={user.id}
              />
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
                          loadPets();
                        }}
                        onPetCreated={p => {
                          setPets(prev => [...prev, p]);
                          setEditingPet(null);
                        }}
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
