# 🔐 Autentisering – Inloggning & Säkerhet

Appen använder **JWT-token-baserad inloggning** så att varje användare får tillgång till sin egen data och kan vara inloggad mellan sessioner.

## ✨ Funktioner

- Registrera ny användare (email, lösenord)
- Logga in
- Logga ut
- Automatisk inloggning (hålla användare inloggad)
- Skydda routes (backend och frontend)
- Visa felmeddelanden vid ogiltiga uppgifter

## 🧠 Teknik bakom

- **Frontend:** React + fetch/axios + localStorage
- **Backend:** Node.js + Express
- **Databas:** PostgreSQL
- **Hashing:** bcrypt för lösenord
- **Tokens:** JWT (jsonwebtokens)

## 🗃 Databasstruktur (tabell: `users`)
| Kolumn     | Typ     | Beskrivning                      |
|------------|---------|----------------------------------|
| id         | serial  | Primärnyckel                     |
| email      | text    | Unik e-postadress                |
| password   | text    | Hashat lösenord (bcrypt)         |

## 🔌 API-routes
- `POST /auth/register` – Skapa användare
- `POST /auth/login` – Logga in och få token
- `GET /auth/me` – Hämta användardata med token

## 🔄 Tokenflöde
```mermaid
sequenceDiagram
    participant Användare
    participant Frontend
    participant Backend
    participant Databas

    Användare->>Frontend: Skickar e-post & lösenord
    Frontend->>Backend: POST /auth/login
    Backend->>Databas: Kolla om användare finns
    Databas-->>Backend: Returnera hashat lösenord
    Backend->>Backend: bcrypt.compare()
    Backend-->>Frontend: JWT-token (om ok)
    Frontend->>LocalStorage: Sparar token
    Frontend->>Backend: Skickar token i headers vid API-anrop
