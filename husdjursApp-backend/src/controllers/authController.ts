import { RequestHandler } from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      [first_name, last_name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    res.status(201).json({ message: "Användare skapad", token, user: newUser });
  } catch (error) {
    console.error("Fel vid registrering", error);
    res.status(500).json({ error: "Något gick fel vid registreringen" });
  }
};

// Inloggning
export const login = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password } = req.body;

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

    //JWT-token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2d",
      }
    );

    // skickar token i svaret

    res.status(200).json({
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
    res.status(500).json({ error: "Något gick fel vid inloggning" });
  }
};
