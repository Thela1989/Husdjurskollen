import jwt from "jsonwebtoken";
import { Router, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import pool from "../db";
import { Result } from "pg";
import { Request, Response } from "express";
const router = Router();

// POST /api/auth/register
const registerUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { first_name, last_name, email, password } = req.body;

  // Kontrollera att alla fält finns
  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ error: "användarnamn, e-post och lösenord krävs" });
    return;
  }

  try {
    // Kontrollera om e-post redan finns
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      res.status(400).json({ error: "E-postadressen är redan registrerad" });
      return;
    }

    // Kryptera lösenord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa användare
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
      [first_name, last_name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      message: "Användare skapad",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
};

router.post("/register", registerUser);

//POST /api/auth/login
const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Epost och löseonod krävs" });
    return;
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Användare hittades inte" });
      return;
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ Error: "Ogiltige-post eller lösenord" });
      return;
    }
    res.status(200).json({
      message: "Inloggning lyckades",
      user: {
        id: user.id,
        first_name: user.firstname,
        last_name: user.last_name,
        email: user.email,
      },
    });
    //Skickar tillbaks användardata (ej lösenord)
  } catch (error) {
    console.error("Fel vid loggin:", error);
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
};
export default router;
