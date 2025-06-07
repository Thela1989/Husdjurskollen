// src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();
  // Navigerar till testkontot
  const handleLoginClick = () => {
    navigate("/account");
  };

  const handleRegisterClick = () => {
    alert("Registrering är inte implementerad än, men det kommer!");
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="welcomeText">
          Husdjurskollen <FaPaw />
        </h1>
        <p id="WelcomeP">Håll koll på ditt husdjurs vardag, behov och hälsa!</p>

        <div className="button-row">
          <button onClick={handleLoginClick}>Logga in</button>
          <button onClick={handleRegisterClick}>Registrera dig</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
