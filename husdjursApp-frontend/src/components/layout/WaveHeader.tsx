import "../assets/WaveHeader.css";

function WaveHeader() {
  return (
    <header className="wavy-header">
      <img
        className="wave"
        src="/Images/header.svg?v=6"
        alt=""
        aria-hidden="true"
      />

      <img
        className="profile-image"
        src="/Images/profile.jpg"
        alt="Profilbild"
      />

      <button className="menu-button" aria-label="Öppna meny">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default WaveHeader;
