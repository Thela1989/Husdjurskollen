// src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    navigate("/account");
  };

  const handleRegisterClick = () => {
    setShowRegister(true); //visa formulär
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="welcomeText">
          Husdjurskollen <FaPaw />
        </h1>

        <p id="WelcomeP">Håll koll på ditt husdjurs vardag, behov och hälsa!</p>

        {!showRegister ? (
          <div className="button-row">
            <button onClick={handleLoginClick}>Logga in</button>
            <button onClick={handleRegisterClick}>Registrera dig</button>
          </div>
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}

export default HomePage;
