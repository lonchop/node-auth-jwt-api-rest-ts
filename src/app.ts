import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoute";

// Middleware para parsear el body de las peticiones a JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Hacer una API REST de usuarios

// Autenticación
// User

export default app

