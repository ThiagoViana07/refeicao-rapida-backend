import { Router } from "express";
import { authenticate, requireAuth } from "../middleware/auth.middleware";
import { createIngredient, deleteIngredient } from "../controllers/ingredients.controller";

const router = Router();

// Todas as rotas de refeições precisam de autenticação
router.use(authenticate);
router.use(requireAuth);

router.post("/", createIngredient);
router.delete("/:id", deleteIngredient);

export default router; 