import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/account");
  };
  const handlRegisterClick = () => {
    alert("Registrering är inte implementerat än, men det kommer!");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Hälkommen till Husdjurskollen 🐾</h1>
      <p>Håll koll på ditt husdjurs vardag, behov och hälsa</p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleLoginClick}>Logga in</button>
        <button onClick={handlRegisterClick}>Registrera dig</button>
      </div>
    </div>
  );
}

export default HomePage;
