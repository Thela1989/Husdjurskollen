import "./Header.css";

function Header() {
  return (
    <header className="pet-header">
      <svg
        className="pet-header__wave"
        viewBox="0 0 390 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="headerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cddecb" />
            <stop offset="100%" stopColor="#e0e9dd" />
          </linearGradient>
        </defs>

        <path
          d="
            M0 0
            H390
            V65
            C335 105 285 55 220 60
            C160 65 125 95 70 82
            C35 74 18 58 0 54
            Z
          "
          fill="url(#headerGradient)"
        />
      </svg>

      <div className="pet-header__icons">
        <button className="pet-header__icon-button" aria-label="Notifieringar">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
            <path d="M10 18a2 2 0 0 0 4 0" />
          </svg>
        </button>

        <button className="pet-header__icon-button" aria-label="Öppna meny">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
