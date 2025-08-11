import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import jwt from "jsonwebtoken";
import pool from "../db";

const router = Router();

interface AuthRequest extends Request {
  user?: any;
}

// Middleware: verifiera token
const authenticateToken: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return; // viktigt: returnera void, inte Response
  }

  jwt.verify(process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      res.sendStatus(403);
      return; // viktigt
    }
    req.user = user; // { userId: ... }
    next();
  });
};

// GET /api/users/me
router.get(
  "/me",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const result = await pool.query(
        "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
        [req.user?.userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ error: "Användare hittades inte" });
        return;
      }

      res.json(result.rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Serverfel" });
    }
  }
);

export default router;
