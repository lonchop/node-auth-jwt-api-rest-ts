import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

// Midleware de JWT para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Error en al autenticación: ", err);
        return res.status(403).json({ error: "No tienes acceso a este recurso" });
      }

      next();
  });
}

router.post("/", authenticateToken, createUser);

router.get("/", authenticateToken, getAllUsers);

router.get("/:id", authenticateToken, getUserById);

router.put("/:id", authenticateToken, updateUser);

router.delete("/:id", authenticateToken, deleteUser);

export default router;