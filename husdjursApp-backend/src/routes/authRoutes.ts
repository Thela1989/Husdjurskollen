import { Router, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import pool from "../db";

const router = Router();

// POST /api/auth/register
const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  // Kontrollera att alla fält finns
  if (!name || !email || !password) {
    res.status(400).json({ error: "Namn, e-post och lösenord krävs" });
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
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Användare skapad",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
};

router.post("/register", registerUser);

export default router;
