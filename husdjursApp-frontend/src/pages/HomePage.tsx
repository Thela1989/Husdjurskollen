// src/pages/HomePage.tsx

import { useState } from "react";
import UserForm from "../components/user/UserForm";
import { Button, Divider, Title } from "@mantine/core";
import { FaPaw } from "react-icons/fa";

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

        <div className="start-hero">
          <div className="start-title-area">
            <Title order={1} className="start-title-with-paw">
              Husdjurskollen{" "}
              <FaPaw className="start-title-paw" aria-hidden="true" />
            </Title>
            <p>
              Håll koll på ditt husdjurs vardag,
              <br />
              behov och hälsa.
            </p>
          </div>

          <img
            src="/Images/Start-Image.jpg"
            alt="Hund och ägare"
            className="start-hero-image"
          />
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <Button
              onClick={handleLoginClick}
              variant="light"
              className={`auth-tab-button ${showLogin ? "auth-tab-button-active" : ""}`}
            >
              Logga in
            </Button>

            <Button
              onClick={handleRegisterClick}
              variant="light"
              className={`auth-tab-button ${showRegister ? "auth-tab-button-active" : ""}`}
            >
              Registrera
            </Button>
          </div>
          {showLogin && <UserForm mode="login" />}
          {showRegister && <UserForm mode="register" />}
          <Divider
            label={
              <FaPaw className="start-title-paw paw-small" aria-hidden="true" />
            }
            labelPosition="center"
            my="lg"
            styles={{
              label: { color: "var(--mantine-color-bright)", opacity: 0.85 },
            }}
          />
          <p
            className="no-account-text"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            Har du inget konto?{" "}
            <a style={{ color: "var(--color-teal)" }} href="/register">
              Registrera dig!
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
