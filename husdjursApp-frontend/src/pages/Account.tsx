// src/pages/Account.tsx
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/user/UserForm";
import { api, setAuthToken } from "../lib/api";
import PetHeader from "../components/pets/PetHeader";

const token = localStorage.getItem("token");

if (token) {
  setAuthToken(token);
}

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
  owner_id?: number;
}

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [editUserMode, setEditUserMode] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errUser, setErrUser] = useState("");

  const mapToUser = useCallback((data: any): User | null => {
    if (!data) return null;

    if (data.user?.id) {
      return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
    }

    if (data.id && data.name) {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
      };
    }

    return null;
  }, []);

  const loadUser = useCallback(async () => {
    setLoadingUser(true);
    setErrUser("");

    try {
      const res = await api.get("/auth/me");
      const currentUser = mapToUser(res.data);

      if (!currentUser) {
        throw new Error("Kunde inte läsa användaren.");
      }

      setUser(currentUser);
    } catch (error: any) {
      console.error("Kunde inte hämta användare:", error);
      setUser(null);
      setErrUser(error?.response?.data?.error || "Kunde inte hämta användare.");
    } finally {
      setLoadingUser(false);
    }
  }, [mapToUser]);

  const loadPets = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await api.get("/pets");
      const userPets = (res.data as Pet[]).filter(
        (pet) => pet.owner_id === user.id,
      );

      setPets(userPets);
    } catch (error) {
      console.error("Kunde inte hämta husdjur:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  return (
    <main className="app-screen">
      <PetHeader />

      <div className="profile-image">
        <img
          src="/images/profile-placeholder.png"
          alt="Profilbild"
          className="profile-avatar"
        />
      </div>

      <section className="home-content account-content">
        {loadingUser ? (
          <p>Laddar användare...</p>
        ) : errUser ? (
          <p className="error-text">{errUser}</p>
        ) : !user ? (
          <p>Ingen användare hittades. Prova logga in igen.</p>
        ) : editUserMode ? (
          <UserForm
            mode="edit"
            userId={user.id}
            name={user.name}
            email={user.email}
            onEditDone={async () => {
              setEditUserMode(false);
              await loadUser();
            }}
          />
        ) : (
          <>
            <h1 className="account-welcome-text">Hej {user.name}!</h1>

            <section className="pet-preview-section">
              <div className="section-title-row">
                <h2>Dina husdjur</h2>
                <span className="paw-small">🐾</span>
              </div>

              <div className="pet-avatar-row">
                {pets.map((pet) => (
                  <Link key={pet.id} to={`/pet/${pet.id}`}>
                    <div className="pet-avatar" aria-label={pet.name}>
                      {pet.name.charAt(0)}
                    </div>
                  </Link>
                ))}

                <Link to="/pets/new">
                  <button
                    className="add-pet-button"
                    aria-label="Lägg till husdjur"
                  ></button>
                </Link>
              </div>
            </section>

            <button
              className="edit-profile-link"
              onClick={() => setEditUserMode(true)}
            >
              Redigera profil
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Account;
