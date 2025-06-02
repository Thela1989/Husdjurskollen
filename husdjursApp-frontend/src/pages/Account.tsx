import { useEffect, useState } from "react";
import axios from "axios";
import PetForm from "../components/PetForm";
import UserForm from "../components/UserForm";
import HealthForm from "../components/HealthForm";
import HealthList from "../components/HealthList";
import PetCareForm from "../components/PetCareForm";
import PetCareList from "../components/PetCareList";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash, FaPaw, FaHeart, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

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

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editUserMode, setEditUserMode] = useState(false);
  const [showHealthPetId, setShowHealthPetId] = useState<number | null>(null);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [healthRefreshKey] = useState(0);

  const [showCarePetId, setShowCarePetId] = useState<number | null>(null);
  const [careRefreshKey, setCareRefreshKey] = useState(0);

  const handlePetCreated = (newPet: Pet) => {
    setPets(prev => [...prev, newPet]);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort husdjuret:", error);
    }
  };

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
    <div style={{ padding: "2rem" }}>
      <div className="account-container">
        <Link className="BackBtn" to="/">
          Till startsidan
        </Link>
        <h1>Ditt konto</h1>

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
                <h2>
                  <span className="profile-image"></span>
                  <CgProfile></CgProfile> {user.name}
                </h2>
                <p>{user.email}</p>
                <button onClick={() => setEditUserMode(true)}>
                  Redigera användare
                  <span className="icon-spacing"></span>
                  <FaEdit></FaEdit>
                </button>{" "}
              </>
            )}

            {showForm && !editingPet && (
              <PetForm onPetCreated={handlePetCreated} ownerId={user.id} />
            )}

            <h3>Dina husdjur</h3>

            {pets.length > 0 ? (
              <div
                className="Pet-Container"
                style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
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
                    ) : showHealthPetId === pet.id ? (
                      <>
                        {showHealthForm ? (
                          <HealthForm
                            petId={pet.id}
                            onSaved={() => {
                              refreshingPets();
                              setShowHealthForm(false);
                            }}
                          />
                        ) : (
                          <button onClick={() => setShowHealthForm(true)}>
                            Lägg till hälsopost
                          </button>
                        )}
                        <HealthList
                          petId={pet.id}
                          petName={pet.name}
                          refreshKey={healthRefreshKey}
                        />
                        <button onClick={() => setShowHealthPetId(null)}>
                          Tillbaka till info
                        </button>
                      </>
                    ) : showCarePetId === pet.id ? (
                      <>
                        <PetCareForm
                          petId={pet.id}
                          onSaved={() => setCareRefreshKey(prev => prev + 1)}
                        />
                        <PetCareList
                          petId={pet.id}
                          petName={pet.name}
                          refreshKey={careRefreshKey}
                        />
                        <button onClick={() => setShowCarePetId(null)}>
                          Tillbaka till info
                        </button>
                      </>
                    ) : (
                      <>
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
                        <button onClick={() => setEditingPet(pet)}>
                          Redigera djur<span className="icon-spacing"></span>
                          <FaEdit></FaEdit>
                        </button>
                        <button onClick={() => handleDelete(pet.id)}>
                          {" "}
                          Ta bort <span className="icon-spacing"></span>
                          <FaTrash></FaTrash>
                        </button>
                        <button onClick={() => setShowHealthPetId(pet.id)}>
                          Djurhälsa<span className="icon-spacing"></span>
                          <FaHeart></FaHeart>
                        </button>
                        <button onClick={() => setShowCarePetId(pet.id)}>
                          Skötsel<span className="icon-spacing"></span>
                          <FaPaw />
                        </button>
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
            >
              {showForm ? (
                "Avbryt"
              ) : (
                <>
                  Lägg till nytt djur
                  <span className="icon-spacing"></span>
                  <FaPlus></FaPlus>
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
