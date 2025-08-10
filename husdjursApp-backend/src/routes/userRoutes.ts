import { Router, Request, Response } from "express";
import pool from "../db";
import jwt from "jsonwebtoken"

const router = Router();
//Middleware för att verifiera JWT-token
function authenticateToken(req:any, res:Response, next: any){
  const authHeader=req.header["authorization"];
  const token= authHeader && authHeader.split(" ")[1];
   if (!token) return res.sendStatus(401); //ingen token skickad

   jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any)=>{
    if(err) return res.sendStatus(403); //Ogiltig token
    req.user = user; //user innehäller userId from jwt.sign()

   })

}


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id =
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
  }
});

export default router;
