import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createMeal = async (req: Request, res: Response) => {
  const { name, description, date, ingredients } = req.body;
  const userId = req.userId as string;

  try {
    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        userId,
        date,
        ingredients:{
          create: ingredients,
        },
      },
      include: { ingredients: true },
      omit: {
        userId: true,
        id: true,
      },
    });

    return res.status(201).json(meal);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Erro ao criar refeição", error: error });
  }
};

export const getMeals = async (req: Request, res: Response) => {
  const userId = req.userId as string;

  try {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
      omit: {
        userId: true,
        id: true,
      },

      include: { ingredients: true },
    });

    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar refeições" });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId as string;

  try {
    const meal = await prisma.meal.findFirst({
      where: {
        id,
        userId,
      },
      omit: {
        userId: true,
        id: true,
      },
      include: { ingredients: true },
    });

    if (!meal) {
      return res.status(404).json({ message: "Refeição não encontrada" });
    }

    return res.status(200).json(meal);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar refeição" });
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, date } = req.body;
  const userId = req.userId as string;

  try {
    const meal = await prisma.meal.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
        description,
        date,
      },
      omit: {
        userId: true,
        id: true,
      },
    });

    if (!meal) {
      return res.status(404).json({ message: "Refeição não encontrada" });
    }

    return res.status(200).json(meal);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ message: "Refeição não encontrada" });
    }

    return res.status(500).json({ message: "Erro ao atualizar refeição" });
  }
};

export const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId as string;

  try {
    const meal = await prisma.meal.delete({
      where: {
        id,
        userId,
      },
    });

    if (!meal) {
      return res.status(404).json({ message: "Refeição não encontrada" });
    }

    return res.status(200).json({ message: "Refeição deletada com sucesso" });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ message: "Refeição não encontrada" });
    }
    return res.status(500).json({ message: "Erro ao deletar refeição" });
  }
};
