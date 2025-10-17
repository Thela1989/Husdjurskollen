# 🛠️ Backendstruktur – Express + PostgreSQL

Den här anteckningen visar hur backendkoden är organiserad, med routes, controllers, middleware och koppling till databasen.

## 📁 Projektstruktur

husdjurskollen-backend/  
├── controllers/  
│ ├── authController.ts  
│ ├── petsController.ts  
│ ├── healthController.ts  
│ └── careController.ts  
├── routes/  
│ ├── authRoutes.ts  
│ ├── petsRoutes.ts  
│ ├── healthRoutes.ts  
│ └── careRoutes.ts  
├── db/  
│ └── db.ts ← Pool-koppling till PostgreSQL  
├── middleware/  
│ └── verifyToken.ts  
├── app.ts  
├── server.ts  
├── .env  
└── package.json

yaml

KopieraRedigera

``---  ## ✨ Nyckelkoncept  ### 📌 app.ts - Initierar Express, middlewares (CORS, body-parser, etc.) - Importerar routes  ### 🚀 server.ts - Startar servern på angiven port - Använder `.env` för port/databas-url  ### 📦 controllers/ - Innehåller logiken för varje route - T.ex. `petsController.ts` hanterar GET/POST/PUT/DELETE för djur  ### 🌐 routes/ - Kopplar endpoints till rätt controllerfunktioner - Ex: `router.get("/pets/:id", getPetsByUser)`  ### 🔐 middleware/ - Innehåller t.ex. `verifyToken` för att skydda routes  ### 🐘 db/db.ts ```ts import pkg from 'pg'; const { Pool } = pkg;  export const pool = new Pool({   connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });``