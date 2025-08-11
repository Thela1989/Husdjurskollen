## 2025.07-26

satt mig igen efter sommaren och ska försöka strukturera hur jag går vidare!

## 2025-07-27

- AuthController.ts: Registrering och inloggning fungerar med bcrypt.
- Nästa steg (TODO):
  - Implementera JWT-inloggning för att hålla användaren inloggad
  - Skapa middleware som skyddar routes med token
  - Spara och skicka med token från frontend

✅ Vad jag har gjort
Backend:
Struktur med Express, TypeScript och PostgreSQL/SQLite ✅

Controllers för: auth, pets, users, health ✅

Routes indelade per resurs (bra struktur!) ✅

Användarregistrering och inloggning med bcrypt ✅

Databaskoppling (db.ts) och SQL-schema ✅

Frontend:
Setup med Vite + React + TypeScript + Tailwind ✅

Många komponenter byggda:

LoginForm, PetForm, UserForm, HealthForm etc ✅

Sektioner för vaccination, avmaskning, vikt, övrigt ✅

Pages: HomePage, HealthPage, PetCarePage, Account ✅

Stilade med egna bakgrundsbilder och ikoner ✅

Lägg till JWT så användare kan förbli inloggade ✅

🛠️ Din personliga TODO – Nästa steg för Husdjurskollen
🔐 Autentisering & Användarhantering

Skydda routes med token (middleware)

Knyt data till inloggad användare (userId)

🧾 Funktionalitet att utveckla
Redigera och ta bort hälsoposter och skötseluppgifter

Spara checkbox-status för skötsel

Lägg till notiser eller "Dagens att göra" (t.ex. "Ge medicin")

Lägg till påminnelsefunktion (t.ex. vaccin om 3 månader)

Använd dark/light mode med Context API

Visa meddelanden/feedback när något sparas

🌍 Visionära förbättringar
Dela husdjursdata med andra (t.ex. vid omplacering)

Flera användare kan ha tillgång till samma djur

Exportera hälsohistorik som PDF

Lägg till gamification – utmaningar & belöningar för skötsel

🧼 UX och design
Lägg till tom-states (“Inga uppgifter ännu – lägg till en!”)

Gör appen mer mobilvänlig och tillgänglig

Lägg till bilder på djuren i appen

🚀 När du är redo att lansera
Publicera backend (Render, Railway)

Publicera frontend (Netlify, Vercel)

Välj en affärsmodell (freemium, annonser, engångsköp?)

Marknadsför appen via sociala medier
