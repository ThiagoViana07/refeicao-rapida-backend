import { Router } from "express";
import { authenticate, requireAuth } from "../middleware/auth.middleware";
import { createMeal, getMealById, getMeals, updateMeal, deleteMeal } from "../controllers/meal.controller";

const router = Router();

// Todas as rotas de refeições precisam de autenticação
router.use(authenticate);
router.use(requireAuth);

router.post("/", createMeal);
router.get("/", getMeals);
router.get("/:id", getMealById);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router; 