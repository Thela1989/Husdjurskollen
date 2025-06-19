import { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "E-postadressen är redan registrerad" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    return res.status(201).json({ message: "Användare skapad", user: newUser });
  } catch (error) {
    console.error("Fel vid registrering", error);
    return res.status(500).json({ error: "Något gick fel vid registreringen" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //hämtar användare fråm databasen
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Fel e-post eller lösenord" });
    }
    const user = userResult.rows[0];

    //Jämför lösenordet som andvändaren skrev in med det hashade
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Fel e-post eller lösenord" });
    }
    //skickar tillbaka användardata
    return res.status(200).json({
      message: "Inloggningen lyckades",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    return res.status(500).json({ error: "Något gick fel vid inloggning" });
  }
};
