// src/pages/HomePage.tsx
import { FaHeart, FaPaw, FaUserPlus } from "react-icons/fa";

import { useState } from "react";
import UserForm from "../components/user/UserForm";
import { Button } from "@mantine/core";

function HomePage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <main className="start-page">
      <section className="start-card">
        <div className="start-wave"></div>

        <FaPaw className="start-decoration-paw" />
        <FaHeart className="start-decoration-heart" />

        <div className="start-hero">
          <div className="start-title-area">
            <h1>Husdjurskollen</h1>
            <p>Håll koll på ditt husdjurs vardag, behov och hälsa.</p>
          </div>

          <img
            src="/images/dog-hero.jpg"
            alt="Hund och ägare"
            className="start-hero-image"
          />
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <Button
              onClick={handleLoginClick}
              variant={showLogin ? "filled" : "light"}
              className="auth-tab-button"
              leftSection={<FaPaw />}
            >
              Logga in
            </Button>

            <Button
              onClick={handleRegisterClick}
              variant={showRegister ? "filled" : "light"}
              className="auth-tab-button"
              leftSection={<FaUserPlus />}
            >
              Registrera
            </Button>
          </div>

          {showLogin && <UserForm mode="login" />}
          {showRegister && <UserForm mode="register" />}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
