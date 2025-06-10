import { Request, response } from "express";
import db from  "../db"
import bcrypt from "bcryptjs"

export const register = async (req: Request, res: Response)=>{
    const {name, email, password} = req.body;

    try{
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0){
            return res.status(400).json({error: "E-postadressen är redan registrerad"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email", [name, email, hashedPassword]
        )
    }
}
