import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/recipeModel';

// Obter todas as receitas
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    res.status(500).json({ message: 'Erro ao buscar receitas' });
  }
};

// Obter uma receita pelo ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Buscando receita com ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Erro ao buscar a receita:', error);
    res.status(500).json({ message: 'Erro ao buscar a receita' });
  }
};

// Adicionar uma nova receita
export const addRecipe = async (req: Request, res: Response) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ name, ingredients, instructions });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
    res.status(500).json({ message: 'Erro ao adicionar receita' });
  }
};

// Atualizar uma receita existente
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    res.status(500).json({ message: 'Erro ao atualizar receita' });
  }
};
