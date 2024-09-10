import axiosClient from "../utils/axiosClient";

// Função para buscar receita pelo ID
export const fetchRecipeById = async (id: string) => {
  try {
    const response = await axiosClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a receita:', error);
    throw error;
  }
};
