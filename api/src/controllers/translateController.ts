import axios from 'axios';

export const translateText = async (text: string, targetLanguage: string = 'pt') => {
  try {
    const response = await axios.post('https://libretranslate.de/translate', {
      q: text,          // Texto a ser traduzido
      source: 'en',     // Idioma de origem
      target: targetLanguage, // Idioma de destino (Português)
      format: 'text',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log da resposta completa
    console.log("Response data:", response.data);

    // Verifica se a resposta contém o campo `translatedText`
    if (response.data && response.data.translatedText) {
      return response.data.translatedText;
    } else {
      throw new Error('A resposta da API não contém o campo translatedText.');
    }
  } catch (error: any) {
    console.error('Erro ao tentar traduzir:', error?.response?.data || error.message);
    return text; // Retorna o texto original se a tradução falhar
  }
};
