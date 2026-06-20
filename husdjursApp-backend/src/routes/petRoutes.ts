import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET pets, filtrerat på owner_id om det skickas med
router.get("/", async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId ? Number(req.query.ownerId) : null;
  try {
    const result = ownerId
      ? await pool.query("SELECT * FROM pets WHERE owner_id = $1;", [ownerId])
      : await pool.query("SELECT * FROM pets;");
    res.json(result.rows);
  } catch (error) {
    console.error("Felmeddelande:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

// POST nytt husdjur
router.post("/", async (req: Request, res: Response) => {
  const { name, type, birth_date, owner_id, breed, gender, color } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pets (name, type, birth_date, owner_id, breed, gender, color)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, type, birth_date, owner_id, breed, gender, color],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid skapande av husdjur:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

// PUT uppdatera husdjur
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, birth_date, owner_id, breed, gender, color } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pets
       SET name = $1, type = $2, birth_date = $3, owner_id = $4, breed = $5, gender = $6, color = $7
       WHERE id = $8 RETURNING *`,
      [name, type, birth_date, owner_id, breed, gender, color, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av husdjur:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

// DELETE radera husdjur
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM pets WHERE id = $1", [id]);
    res.status(200).send("Husdjur raderat");
  } catch (error) {
    console.error("Fel vid borttagning:", (error as Error).message);
    res.status(500).send("Serverfel");
  }
});

export default router;
