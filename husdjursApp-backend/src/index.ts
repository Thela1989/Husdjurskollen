import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
// import övriga routes vid behov

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (_req, res) => res.send("API OK"));

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes) osv

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server kör på http://localhost:${PORT}`));
