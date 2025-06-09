import dotenv from "dotenv";
import cors from "cors";
import pool from "./db";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GETanrop endast testanvändaren
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1;", [2]);
    res.json(result.rows);
  } catch (error) {
    console.error("Felmeddelande:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});
//Lägger in ny användare
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Felmeddelande:", (error as Error).message);
    res.status(500).send("Server error");
  }
});
//Skickar put anrop när man redigera användare
app.put("/users/2", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = 2 RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering:", error);
    res.status(500).send("Serverfel");
  }
});

// GET alla pets för user 2
app.get("/pets", async function (req, res) {
  const userId = 2;
  try {
    const result = await pool.query("SELECT * FROM pets WHERE owner_id = $1;", [
      userId,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Felmeddelande:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

app.post("/pets", async function (req, res) {
  const { name, type, birth_date, owner_id, breed, gender, color } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pets (name, type, birth_date, owner_id, breed, gender, color)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, type, birth_date, owner_id, breed, gender, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Felmeddelande:", (error as Error).message);
    res.status(500).send("Server error");
  }
});

app.put("/pets/:id", async function (req, res) {
  const { id } = req.params;
  const { name, type, birth_date, owner_id, breed, gender, color } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pets
       SET name = $1, type = $2, birth_date = $3, owner_id = $4, breed = $5, gender = $6, color = $7
       WHERE id = $8 RETURNING *`,
      [name, type, birth_date, owner_id, breed, gender, color, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av husdjur:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

app.delete("/pets/:id", async function (req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM pets WHERE id = $1", [id]);
    res.status(200).send("Husdjur raderat");
  } catch (error) {
    console.error("Fel vid borttagning:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

//Lägg till ny skötsel

//Uppdatera statusen på skötsel
app.put("/petcare/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    const result = await pool.query(
      "UPDATE petcare SET done = $1 WHERE id = $2 RETURNING *",
      [done, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av skötsel", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

//Ta bort skötseluppgift
app.delete("/petcare/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM petcare WHERE id = $1", [id]);
    res.status(200).send("Skötseluppgift borttagen");
  } catch (error) {
    console.error("Fel vid  borttagning", error);
    res.status(500).send("Serverfel");
  }
});

//Hälsa
app.get("/health", async (req, res) => {
  const petID = req.query.petid;

  try {
    const result = await pool.query(
      "SELECT * FROM  health WHERE pet_id = $1 ORDER BY health_date DESC",
      [petID]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Felmvid hämtning av health:", (error as Error).message);
    res.status(500).send("Serverfel vid hämtning av health");
  }
});

app.post("/health", async (req, res) => {
  const { pet_id, type, description, health_date, vet, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO health (pet_id, type, description, health_date, vet, notes)
 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,

      [pet_id, type, description, health_date, vet, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid insättning i health:", error);
    res.status(500).send("Serverfel vid hälsodata");
  }
});

app.put("/health/:id", async (req, res) => {
  const { id } = req.params as { id: string };
  const { pet_id, type, description, health_date, vet, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE health
       SET type = $1, description = $2, health_date = $3, vet = $4, notes = $5
       WHERE id = $6
       RETURNING *`,
      [type, description, health_date, vet, notes, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av hälsodata", error);
    res.status(500).send("Serverfel vid uppdatering");
  }
});
app.delete("/health/:id", async (req, res) => {
  const { id } = req.params as { id: string };

  try {
    await pool.query("DELETE FROM health WHERE id = $1", [id]);
    res.status(200).send("Hälsodata raderad");
  } catch (error) {
    console.error("Fel vid borttagning av hälsodata", error);
    res.status(500).send("Serverfel vid borttagning av hälsodats");
  }
});

//PetCare

app.get("/petcare", async (req, res) => {
  const petId = Number(req.query.petId);

  try {
    const result = await pool.query(
      "SELECT * FROM petcare WHERE pet_id = $1 ORDER BY id ASC ",
      [petId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fel vid hämtning av skötseluppgifter", error);
    res.status(500).send("Serverfel vid hämtning av skötseldata");
  }
});
app.post("/petcare", async (req, res) => {
  const { pet_id, title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO petcare (pet_id, title, done) VALUES ($1, $2, false) RETURNING *",
      [pet_id, title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid skaåpande av skötseluppgift", error);
    res.status(500).send("serverfel");
  }
});

app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
