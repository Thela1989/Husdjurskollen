import { Router, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db";
import verifyToken from "../middleware/verifyToken";

const router = Router();

function signToken(userId: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET saknas");
  return jwt.sign({ userId }, secret, { expiresIn: "2d" });
}

/** POST /api/auth/register */
const registerUser: RequestHandler = async (req, res) => {
  const { first_name, last_name, email, password } = req.body ?? {};
  if (!first_name || !last_name || !email || !password) {
    res
      .status(400)
      .json({ error: "Förnamn, efternamn, e‑post och lösenord krävs" });
    return;
  }

  try {
    const exists = await pool.query("SELECT 1 FROM users WHERE email = $1", [
      String(email).toLowerCase().trim(),
    ]);
    if ((exists.rowCount ?? 0) > 0) {
      res.status(400).json({ error: "E‑postadressen är redan registrerad" });
      return;
    }

    const hash = await bcrypt.hash(String(password), 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1,$2,$3,$4)
       RETURNING id, first_name, last_name, email`,
      [
        String(first_name).trim(),
        String(last_name).trim(),
        String(email).toLowerCase().trim(),
        hash,
      ]
    );

    const user = result.rows[0];
    const token = signToken(user.id);
    res.status(201).json({ message: "Användare skapad", token, user });
  } catch (error: any) {
    if (error?.code === "23505") {
      res.status(400).json({ error: "E‑postadressen är redan registrerad" });
      return;
    }
    console.error("Fel vid registrering:", error);
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
};

router.post("/register", registerUser);

/** POST /api/auth/login */
const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "E‑post och lösenord krävs" });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      String(email).toLowerCase().trim(),
    ]);
    if ((result.rowCount ?? 0) === 0) {
      res.status(400).json({ error: "Fel e‑post eller lösenord" });
      return;
    }

    const u = result.rows[0];
    const ok = await bcrypt.compare(String(password), u.password);
    if (!ok) {
      res.status(400).json({ error: "Fel e‑post eller lösenord" });
      return;
    }

    const token = signToken(u.id);
    res.status(200).json({
      message: "Inloggning lyckades",
      token,
      user: {
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
      },
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    res.status(500).json({ error: "Serverfel vid inloggning" });
  }
};

/** GET /api/auth/me (skyddad) */
const meHandler: RequestHandler = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Saknar behörighet" });
      return;
    }

    const { rows, rowCount } = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
      [req.userId]
    );
    if (!rowCount) {
      res.status(404).json({ error: "Användare hittades inte" });
      return;
    }
    res.json({ user: rows[0] });
  } catch (e) {
    console.error("Fel vid /auth/me:", e);
    res.status(500).json({ error: "Serverfel" });
  }
};

router.post("/login", loginUser);
router.get("/me", verifyToken, meHandler);

export default router;
