import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //return res.json({ id: user.id, name: user.name, email: user.email });
  return res.status(201).json({ message: "Usuário criado com sucesso" });

 
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if(!valid) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  //return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  
  return res.json({ token });
  
}


