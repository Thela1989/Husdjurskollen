// src/pages/HomePage.tsx
import { FaPaw } from "react-icons/fa";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

function HomePage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true); // visa loginformulär
    setShowRegister(false); // göm registerformulär om det var öppet
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="welcomeText">
          Husdjurskollen <FaPaw />
        </h1>

        <p id="WelcomeP">Håll koll på ditt husdjurs vardag, behov och hälsa!</p>

        {!showRegister && !showLogin && (
          <div className="button-row">
            <button onClick={handleLoginClick}>Logga in</button>
            <button onClick={handleRegisterClick}>Registrera dig</button>
          </div>
        )}

        {showLogin && <LoginForm />}
        {showRegister && <RegisterForm />}
      </div>
    </div>
  );
}

export default HomePage;
