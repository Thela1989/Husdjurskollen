import { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hjälpare: signera JWT
function signToken(userId: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET saknas i miljövariablerna");
  }
  return jwt.sign({ userId }, secret, { expiresIn: "2d" });
}

// Hjälpare: mappa DB-rad till user-objekt
function mapUser(row: any) {
  return {
    id: row.id,
    name: row.name,

    email: row.email,
  };
}

// =========================
// POST /api/auth/register
// =========================
export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    let { name, email, password } = req.body ?? {};

    // Trim & basvalidering
    name = (name ?? "").toString().trim();
    email = (email ?? "").toString().trim().toLowerCase();
    password = (password ?? "").toString();

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: "Alla fält krävs" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ ok: false, error: "Lösenordet måste vara minst 6 tecken" });
    }

    // Finns redan?
    const exists = await pool.query("SELECT 1 FROM users WHERE email = $1", [
      email,
    ]);
    if (exists.rowCount && exists.rowCount > 0) {
      return res
        .status(400)
        .json({ ok: false, error: "E-postadressen är redan registrerad" });
    }

    // Hash & spara
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hash],
    );

    const user = mapUser(result.rows[0]);
    const token = signToken(user.id);

    return res.status(201).json({
      ok: true,
      message: "Användare skapad",
      token,
      user,
    });
  } catch (err: any) {
    // Hantera unikhetsfel om det finns unik index på email
    // (Postgres error code 23505)
    if (err?.code === "23505") {
      return res
        .status(400)
        .json({ ok: false, error: "E-postadressen är redan registrerad" });
    }
    console.error("Fel vid registrering:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Något gick fel vid registreringen" });
  }
};

// ======================
// POST /api/auth/login
// ======================
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    let { email, password } = req.body ?? {};
    email = (email ?? "").toString().trim().toLowerCase();
    password = (password ?? "").toString();

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, error: "E-post och lösenord krävs" });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (userResult.rowCount === 0) {
      return res
        .status(400)
        .json({ ok: false, error: "Fel e‑post eller lösenord" });
    }

    const row = userResult.rows[0];
    const match = await bcrypt.compare(password, row.password);
    if (!match) {
      return res
        .status(400)
        .json({ ok: false, error: "Fel e‑post eller lösenord" });
    }

    const user = mapUser(row);
    const token = signToken(user.id);

    return res.status(200).json({
      ok: true,
      message: "Inloggningen lyckades",
      token,
      user,
    });
  } catch (err) {
    console.error("Fel vid inloggning:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Något gick fel vid inloggning" });
  }
};

// ===================================
// GET /api/auth/me  (skyddad route)
// kräver verifyToken som sätter req.userId
// ===================================
export const me = async (
  req: Request & { userId?: number },
  res: Response,
): Promise<Response> => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ ok: false, error: "Ingen token eller ogiltig token" });
    }
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.userId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }
    return res.status(200).json({ ok: true, user: mapUser(result.rows[0]) });
  } catch (err) {
    console.error("Fel vid /auth/me:", err);
    return res.status(500).json({ ok: false, error: "Något gick fel" });
  }
};
