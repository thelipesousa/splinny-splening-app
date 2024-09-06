import dotenv from 'dotenv';

// Carregar variáveis do arquivo .env
dotenv.config();

// Exportar as variáveis do .env para serem usadas no projeto
export const config = {
  spoonacularApiKey: process.env.SPOONACULAR_API_KEY,
  mongoUri: process.env.mongo_Uri,
  port: process.env.PORT,
};
