import express from 'express';
import { getRecipes, addRecipe, updateRecipe, getRecipeById } from '../controllers/recipeController';

const router = express.Router();

// Rota para obter todas as receitas
router.get('/recipes', getRecipes);

// Rota para obter uma receita específica
router.get('/recipes/:id', getRecipeById);

// Rota para adicionar uma nova receita
router.post('/recipes', addRecipe);

// Rota para atualizar uma receita
router.put('/recipes/:id', updateRecipe);

export default router;
