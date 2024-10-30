import { Platform } from 'react-native';

const API_URL = 'http://64.181.180.186:8080/classificar';

export const sendImageToAI = async (imagemUri: string): Promise<string | null> => {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: Platform.OS === 'android' ? imagemUri : imagemUri.replace('file://', ''),
      name: 'imagem.jpg',
      type: 'image/jpeg',
    } as any);
    console.log("Imagem URI recebida:", imagemUri);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    const responseData = await response.json();
    return responseData.classificacao || null;
  } catch (error) {
    console.error('Erro no envio da imagem:', error);
    return null;
  }
};

export default { sendImageToAI };
