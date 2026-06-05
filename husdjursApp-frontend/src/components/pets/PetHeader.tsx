import "./PetHeader.css";

function PetHeader() {
  return (
    <header className="pet-header">
      <svg
        className="pet-header__wave"
        viewBox="0 0 390 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="
            M0 0
            H390
            V55
            C335 90 285 48 220 48
            C165 48 135 78 82 74
            C45 71 22 55 0 48
            Z
          "
        />
      </svg>

      <div className="pet-header__icons">
        <button className="pet-header__icon-button" aria-label="Gå tillbaka">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <button className="pet-header__icon-button" aria-label="Öppna meny">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default PetHeader;
