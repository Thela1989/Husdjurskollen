import { RequestHandler } from "express";
import pool from "../db";
import bcrypt from "bcryptjs";

// Registrering
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      res.status(400).json({ error: "E-postadressen är redan registrerad" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json({ message: "Användare skapad", user: newUser });
  } catch (error) {
    console.error("Fel vid registrering", error);
    res.status(500).json({ error: "Något gick fel vid registreringen" });
  }
};

// Inloggning
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      res.status(400).json({ error: "Fel e-post eller lösenord" });
      return;
    }

    const user = userResult.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Fel e-post eller lösenord" });
      return;
    }

    res.status(200).json({
      message: "Inloggningen lyckades",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    res.status(500).json({ error: "Något gick fel vid inloggning" });
  }
};
