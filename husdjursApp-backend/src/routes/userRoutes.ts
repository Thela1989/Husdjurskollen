import { Router, Request, Response } from "express";
import pool from "../db";
import jwt from "jsonwebtoken"

const router = Router();
<<<<<<< HEAD
<<<<<<< HEAD
=======
//Middleware för att verifiera JWT-token
function authenticateToken(req:any, res:Response, next: any){
  const authHeader=req.header["authorization"];
  const token= authHeader && authHeader.split(" ")[1];
   if (!token) return res.sendStatus(401); //ingen token skickad

   jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any)=>{
    if(err) return res.sendStatus(403); //Ogiltig token
    req.user = user; //user innehäller userId from jwt.sign()

   })
>>>>>>> parent of 8669658 (startat med login formuläret)

}


<<<<<<< HEAD
  if (!token) {
    res.sendStatus(401);
    return; // viktigt: returnera void, inte Response
=======

=======
>>>>>>> parent of 8669658 (startat med login formuläret)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
<<<<<<< HEAD
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Användare hittades inte" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    res.status(500).send("Serverfel");
>>>>>>> parent of 2923088 (Update userRoutes.ts)
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
        "SELECT id, name, email FROM users WHERE id = $1",
        [req.user?.userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ error: "Användare hittades inte" });
        return;
      }
=======
      "SELECT id, name, email FROM users WHERE id =
      [id]
    );
>>>>>>> parent of 8669658 (startat med login formuläret)

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Användare hittades inte" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    res.status(500).send("Serverfel");
  }
});

export default router;
