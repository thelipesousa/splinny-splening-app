// translateController.ts
import axios from 'axios';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const DEEPL_AUTH_KEY = "c229525b-4c8e-4bfb-a3c6-461a884cba13:fx" // Armazene sua chave de autenticação no .env

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await axios.post(DEEPL_API_URL, null, {
      params: {
        auth_key: DEEPL_AUTH_KEY,
        text: text,
        target_lang: targetLang.toUpperCase(), // DeepL usa códigos de idioma em maiúsculas
      },
    });
    return response.data.translations[0].text; // Retorna o texto traduzido
  } catch (error) {
    console.error('Erro ao traduzir o texto:', error);
    throw new Error('Não foi possível traduzir o texto.');
  }
};
