import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Ingen token angiven" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Spara användar-ID på req-objektet så du kan använda det i routes
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.error("Tokenverifiering misslyckades:", error);
    return res.status(403).json({ error: "Ogiltig token" });
  }
};
