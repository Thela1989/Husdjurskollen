//importera pool  från bilbioteket pg för att koppla upp till databasen
import { Pool } from "pg";
//importera dotenv för att läsa in hemliga inställningar som lösenord från .env fil
import dotenv from "dotenv";
// Den här funktionen laddr in innehåll från .env-filen
dotenv.config();

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
//exporterar poolen vilket gör den tillgänglig för andra delar i appen
export default pool;
