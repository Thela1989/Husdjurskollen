import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET - hämta alla hälsoposter för ett specifikt husdjur
router.get("/", async (req: Request, res: Response) => {
  const petID = req.query.petid;

  try {
    const result = await pool.query(
      "SELECT * FROM health WHERE pet_id = $1 ORDER BY health_date DESC",
      [petID]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fel vid hämtning av hälsodata:", error);
    res.status(500).send("Serverfel vid hämtning av hälsodata");
  }
});

// POST - lägg till ny hälsopost
router.post("/", async (req: Request, res: Response) => {
  const { pet_id, type, description, health_date, vet, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO health (pet_id, type, description, health_date, vet, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [pet_id, type, description, health_date, vet, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid insättning i health:", error);
    res.status(500).send("Serverfel vid sparande av hälsodata");
  }
});

// PUT - uppdatera en hälsopost
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, description, health_date, vet, notes } = req.body;

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
    console.error("Fel vid uppdatering av hälsodata:", error);
    res.status(500).send("Serverfel vid uppdatering av hälsodata");
  }
});

// DELETE - ta bort en hälsopost
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM health WHERE id = $1", [id]);
    res.status(200).send("Hälsopost raderad");
  } catch (error) {
    console.error("Fel vid borttagning av hälsopost:", error);
    res.status(500).send("Serverfel vid borttagning");
  }
});

export default router;
