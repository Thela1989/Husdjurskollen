// src/pages/Account.tsx
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/user/UserForm";
import PetForm from "../components/pets/PetForm";
import { api, setAuthToken } from "../lib/api";

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

interface TodoItem {
  id: string;
  done: boolean;
  text: string;
  meta: string;
}

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [editUserMode, setEditUserMode] = useState(false);
  const [addPetMode, setAddPetMode] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errUser, setErrUser] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>(
    localStorage.getItem("userAvatar") || "/images/profile-placeholder.png",
  );

  const getPetAvatar = (petId: number) =>
    localStorage.getItem(`petAvatar:${petId}`);

  const formatPetType = (type: string) => {
    if (!type) return "Husdjur";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const getAgeLabel = (birthDate: string) => {
    const date = new Date(birthDate);

    if (Number.isNaN(date.getTime())) {
      return "Okänd ålder";
    }

    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    const hasBirthdayPassed =
      now.getMonth() > date.getMonth() ||
      (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());

    if (!hasBirthdayPassed) {
      years -= 1;
    }

    if (years <= 0) {
      return "Under 1 år";
    }

    return `${years} år`;
  };

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
      const res = await api.get("/pets", {
        params: { ownerId: user.id },
      });

      setPets(res.data as Pet[]);
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

  useEffect(() => {
    setAvatarUrl(
      localStorage.getItem("userAvatar") || "/images/profile-placeholder.png",
    );
  }, [editUserMode]);

  const todoItems: TodoItem[] = [
    {
      id: "feed",
      done: true,
      text: pets[0]
        ? `Ge mat till ${pets[0].name}`
        : "Ge mat till ditt husdjur",
      meta: "08:00",
    },
    {
      id: "vaccine",
      done: false,
      text: pets[1]
        ? `Vaccination för ${pets[1].name} om 3 dagar`
        : "Planera nästa vaccination",
      meta: "26 maj",
    },
    {
      id: "claws",
      done: false,
      text: pets[0]
        ? `Kloklippning för ${pets[0].name}`
        : "Lägg till kloklippning i schemat",
      meta: "31 maj",
    },
  ];

  return (
    <main className="app-screen account-page">
      <section className="home-content account-content account-dashboard">
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
        ) : addPetMode ? (
          <PetForm
            ownerId={user.id}
            onPetCreated={async () => {
              setAddPetMode(false);
              await loadPets();
            }}
            onEditDone={() => setAddPetMode(false)}
          />
        ) : (
          <>
            <section className="account-hero">
              <div className="account-user-avatar-wrap">
                <img
                  src={avatarUrl}
                  alt="Profilbild"
                  className="account-user-avatar"
                />
              </div>

              <div>
                <h1 className="account-welcome-text">Hej {user.name}!</h1>
                <p className="account-welcome-subtitle">
                  Välkommen tillbaka till Husdjurskollen
                </p>
              </div>
            </section>

            <section className="account-pets-section">
              <div className="account-section-row">
                <h2 className="account-section-title">
                  Dina husdjur <span>🐾</span>
                </h2>

                <button
                  type="button"
                  className="account-add-pet-cta"
                  onClick={() => setAddPetMode(true)}
                >
                  <span>+</span> Lägg till husdjur
                </button>
              </div>

              <div className="account-pet-grid">
                {pets.map((pet) => (
                  <Link
                    key={pet.id}
                    to={`/pet/${pet.id}/profile`}
                    className="account-pet-card-link"
                  >
                    <article className="account-pet-card" aria-label={pet.name}>
                      <span className="account-pet-edit-pill">✎</span>

                      <div className="account-pet-avatar">
                        {getPetAvatar(pet.id) ? (
                          <img
                            src={getPetAvatar(pet.id) || ""}
                            alt={`${pet.name} avatar`}
                            className="account-pet-avatar-image"
                          />
                        ) : (
                          pet.name.charAt(0)
                        )}
                      </div>

                      <h3>{pet.name}</h3>
                      <p className="account-pet-type">
                        {formatPetType(pet.type)}
                      </p>

                      <p className="account-pet-age">
                        📅 {getAgeLabel(pet.birth_date)}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>

              {pets.length === 0 && (
                <p className="account-empty-pets">
                  Du har ännu inte lagt till några djur.
                </p>
              )}
            </section>

            <section className="account-todo-card" aria-label="Dagens att göra">
              <h2>
                <span>📅</span>
                Dagens att göra
              </h2>

              <ul>
                {todoItems.map((item) => (
                  <li key={item.id}>
                    <span className={item.done ? "todo-done" : "todo-open"}>
                      {item.done ? "✓" : "○"}
                    </span>
                    <span>{item.text}</span>
                    <span>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="account-stats-card">
              <article>
                <p>{pets.length}</p>
                <span>Husdjur</span>
              </article>
              <article>
                <p>{pets.length > 0 ? 1 : 0}</p>
                <span>Kommande vaccination</span>
              </article>
              <article>
                <p>{pets.length > 0 ? 3 : 0}</p>
                <span>Skötseluppgifter denna vecka</span>
              </article>
            </section>

            <button
              className="account-edit-profile-link"
              onClick={() => setEditUserMode(true)}
            >
              <span>👤</span>
              Redigera profil
              <span>›</span>
            </button>

            <nav className="account-bottom-nav" aria-label="Huvudnavigation">
              <Link to="/" className="account-nav-item">
                <span>🏠</span>
                <small>Hem</small>
              </Link>

              <Link to="/" className="account-nav-item">
                <span>🐾</span>
                <small>Husdjur</small>
              </Link>

              <Link to="/" className="account-nav-item">
                <span>📋</span>
                <small>Skötsel</small>
              </Link>

              <Link to="/account" className="account-nav-item is-active">
                <span>👤</span>
                <small>Konto</small>
              </Link>
            </nav>
          </>
        )}
      </section>
    </main>
  );
}

export default Account;
