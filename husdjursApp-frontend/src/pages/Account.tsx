import { useEffect, useState } from "react";
import axios from "axios";
import PetForm from "../components/PetForm";
import UserForm from "../components/UserForm";
import HealthPage from "./HealthPage";

import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

//  Typdefinitioner för användare och husdjur
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
}

// Huvudkomponenten för kontosidan
function Account() {
  // 🔄 State för användaren, djur, formulär, vyer och uppdateringar
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editUserMode, setEditUserMode] = useState(false);

  // När ett nytt husdjur skapas, lägg till det i listan
  const handlePetCreated = (newPet: Pet) => {
    setPets(prev => [...prev, newPet]);
    setShowForm(false);
  };

  // 🗑 Funktion för att radera ett husdjur
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort husdjuret:", error);
    }
  };

  // Funktion för att hämta djur från databasen
  const refreshingPets = () => {
    axios.get("http://localhost:5000/pets").then(res => {
      setPets(res.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/users").then(res => {
      const found = res.data.find((u: User) => u.id === 2);
      setUser(found);
    });
    refreshingPets();
  }, []);

  return (
    <div className="page-wrapper">
      <div style={{ padding: "2rem" }}>
        <div className="account-container">
          {/* Länk tillbaka till startsidan */}
          <Link className="BackBtn" to="/">
            Till startsidan
          </Link>
          <h1>Ditt konto</h1>

          {/* ⏳ Laddar användardata */}
          {!user ? (
            <p>Laddar användare...</p>
          ) : (
            <>
              {/* Formulär för att redigera användare */}
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
                  {/* Visar användarinformation */}
                  <h2>
                    <span className="profile-image"></span>
                    <CgProfile /> {user.name}
                  </h2>
                  <p>{user.email}</p>
                  <button onClick={() => setEditUserMode(true)}>
                    Redigera användare
                    <span className="icon-spacing"></span>
                    <FaEdit />
                  </button>
                </>
              )}

              {/* Formulär för nytt husdjur */}
              {showForm && !editingPet && (
                <PetForm onPetCreated={handlePetCreated} ownerId={user.id} />
              )}

              <h3>Dina husdjur</h3>

              {/*Lista med användarens husdjur */}
              {pets.length > 0 ? (
                <div
                  className="Pet-Container"
                  style={{ flexWrap: "wrap", gap: "1rem" }}
                >
                  {pets.map(pet => (
                    <div
                      key={pet.id}
                      style={{
                        border: "1px solid #444",
                        borderRadius: "8px",
                        padding: "1rem",
                        width: "250px",
                      }}
                    >
                      {/*  Redigeringsläge för husdjur */}
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
                          {/* Visning av djurets information */}
                          <div className="PetInfo">
                            <p>
                              <strong>Namn:</strong> {pet.name}
                            </p>
                            <p>
                              <strong>Född:</strong>{" "}
                              {new Date(pet.birth_date).toLocaleDateString(
                                "sv-SE"
                              )}
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
                          </div>

                          {/*Åtgärdsknappar */}
                          <button onClick={() => setEditingPet(pet)}>
                            Redigera djur <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(pet.id)}>
                            Ta bort <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Inga husdjur hittades.</p>
              )}

              {/* Knapp för att lägga till nytt djur */}
              <button
                onClick={() => {
                  setEditingPet(null);
                  setShowForm(prev => !prev);
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
            </>
          )}
        </div>
      </div>
      <HealthPage></HealthPage>
    </div>
  );
}

export default Account;
