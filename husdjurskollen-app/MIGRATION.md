# Migrering från egen PostgreSQL-backend till Supabase

## Bakgrund

Husdjurskollen använde tidigare en separat Node/Express-backend kopplad till PostgreSQL.

Den gamla strukturen såg ungefär ut så här:

Frontend → Express-backend → PostgreSQL

Databasen administrerades via pgAdmin och backend använde bland annat:

- `pg`
- `Pool`
- Express
- bcrypt
- JWT
- egen `users`-tabell

Målet med migreringen är att förenkla arkitekturen och använda Supabase för:

- PostgreSQL-databas
- autentisering
- API/dataåtkomst
- Row Level Security
- framtida fil- och bildlagring

Den nya strukturen blir:

Expo / React Native → Supabase → PostgreSQL

## Gammal backend

Den gamla backend-mappen innehåller bland annat:

- `db.ts`
- `controllers`
- `routes`
- `middleware`
- `database.sql`
- `types`

### db.ts

`db.ts` skapade anslutningen till PostgreSQL med hjälp av `Pool` från paketet `pg`.

Exempel:

```ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;
```
