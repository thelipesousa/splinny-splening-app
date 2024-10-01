import apiSpoonacular from '../utils/apiSpoonacular';


export const fetchRandomRecipe = async () => {

  const API_KEY = "6118fb23aa364ed49fdda62008599e7d" 

  try {
    const response = await apiSpoonacular.get(`/recipes/random?apiKey=${API_KEY}`, {
      params: {
        number: 1, // Número de receitas aleatórias
        language: 'pt-BR', // Define o idioma como português do Brasil
      },
    });
    return response.data.recipes[0]; // Retorna a primeira receita do array
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
    throw error; // Lança o erro para ser tratado na tela
  }
};
console.log("Spoonacular API Key:", process.env.SPOONACULAR_API_KEY);