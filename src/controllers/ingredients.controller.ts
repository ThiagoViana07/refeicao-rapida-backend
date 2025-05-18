import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createIngredient = async (req: Request, res: Response) => {
  const { name, amount, mealId } = req.body;

  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        amount,
        mealId,
      },
    });

    return res.status(201).json(ingredient);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar ingrediente" });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ingredient = await prisma.ingredient.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: "Ingrediente deletado com sucesso" });

  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ message: "Ingrediente não encontrado" });
    }
    return res.status(500).json({ message: "Erro ao deletar ingrediente" });
  }
};
