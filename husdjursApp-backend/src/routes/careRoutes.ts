import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// Hämta skötseluppgifter för ett husdjur
router.get("/", async (req: Request, res: Response) => {
  const petId = Number(req.query.petId);

  try {
    const result = await pool.query(
      "SELECT * FROM petcare WHERE pet_id = $1 ORDER BY id ASC",
      [petId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fel vid hämtning av skötseluppgifter", error);
    res.status(500).send("Serverfel vid hämtning av skötseldata");
  }
});

// Lägg till ny skötseluppgift
router.post("/", async (req: Request, res: Response) => {
  const { pet_id, title } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO petcare (pet_id, title, done) VALUES ($1, $2, false) RETURNING *",
      [pet_id, title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid skapande av skötseluppgift", error);
    res.status(500).send("Serverfel");
  }
});

// Uppdatera status på en skötseluppgift (t.ex. bocka av)
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    const result = await pool.query(
      "UPDATE petcare SET done = $1 WHERE id = $2 RETURNING *",
      [done, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av skötsel", error);
    res.status(500).send("Serverfel");
  }
});

// Ta bort skötseluppgift
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM petcare WHERE id = $1", [id]);
    res.status(200).send("Skötseluppgift borttagen");
  } catch (error) {
    console.error("Fel vid borttagning", error);
    res.status(500).send("Serverfel");
  }
});

export default router;
