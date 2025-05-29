import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../services/password.service";
import prisma from "../models/user";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {

    if (!email) {
      res.status(400).json({ message: "El email es requerido" });
      return;
    }

    if (!password) {
      res.status(400).json({ message: "La contraseña es requerida" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    const token = generateToken(user);
    res.status(201).json({ token });

  } catch (error: any) {
    // TODO: Mejorar los errores

    if (error?.code === "P2002" && error?.meta?.target.includes("email")) {
      res.status(400).json({ message: "El email ingresado ya existe" });
    }

    console.log(error);

    res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {

    if (!email) {
      res.status(400).json({ message: "El email es requerido" });
      return;
    }

    if (!password) {
      res.status(400).json({ message: "La contraseña es requerida" });
      return;
    }

    const user = await prisma.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(404).json({ message: "El usuario no coincide con el email ingresado" });
      return;
    };

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Usuario y contraseña no coinciden" });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ token });
    
  } catch (error: any) {
    console.log('Error: ', error);
  }
}
