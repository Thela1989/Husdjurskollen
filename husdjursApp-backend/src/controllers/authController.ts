import { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Registrering
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { first_name, last_name, email, password } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: "Alla fält krävs" });
  }

  try {
    // Kolla om e-post redan finns
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "E-postadressen är redan registrerad" });
    }

    // Kryptera lösenord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Spara användare i databasen
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, first_name, last_name, email`,
      [first_name, last_name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // Skapa JWT-token
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    return res.status(201).json({
      message: "Användare skapad",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    return res.status(500).json({ error: "Något gick fel vid registreringen" });
  }
};

// ✅ Inloggning
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Hämta användare via e-post
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Fel e-post eller lösenord" });
    }

    const user = userResult.rows[0];

    // Jämför lösenord
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Fel e-post eller lösenord" });
    }

    // Skapa JWT-token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    return res.status(200).json({
      message: "Inloggningen lyckades",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    return res.status(500).json({ error: "Något gick fel vid inloggning" });
  }
};
