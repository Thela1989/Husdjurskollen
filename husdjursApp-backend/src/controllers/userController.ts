import { Request, Response } from "express";
import pool from "../db";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Användare hittades inte" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    res.status(500).send("Serverfel vid hämtning");
  }
};
