import axios from 'axios';

const SPOONACULAR_API_KEY = '6118fb23aa364ed49fdda62008599e7d';  // Substitua pela sua chave da API do Spoonacular

// Função para buscar receitas na API do Spoonacular
export const fetchReceitas = async (searchQuery: string) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query: searchQuery,  // Filtro de busca por nome da receita
        number: 10,  // Número de receitas a serem retornadas
        addRecipeInformation: true,  // Inclui informações completas da receita
        apiKey: SPOONACULAR_API_KEY,  // Chave da API do Spoonacular
      },
    });
    return response.data.results;  // Retorna as receitas obtidas
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    throw error;  // Lança o erro para ser tratado no componente
  }
};
