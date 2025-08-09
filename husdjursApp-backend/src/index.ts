import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import petRoutes from "./routes/petRoutes";
import healthRoutes from "./routes/healthRoutes";
import careRoutes from "./routes/careRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Använd routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/care", careRoutes);

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
