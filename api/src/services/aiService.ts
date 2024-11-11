import { Platform } from 'react-native';
import mime from 'mime';

const API_URL = 'https://64.181.180.186:8080/classificar';

const sendImageToAI = async (imageUri: string) => {
  if (!imageUri) {
    console.error('Nenhuma imagem selecionada');
    return null;
  }

  try {
    let newImageUri = imageUri;
    if (Platform.OS === 'android') {
      newImageUri = imageUri.replace('file:///', '');
    } else if (Platform.OS === 'ios') {
      // Ajustes específicos para iOS, se necessários
    }

    const mimeType = mime.getType(newImageUri) || 'image/jpeg';

    const formData = new FormData();
    const imageResponse = await fetch(newImageUri);
    const blob = await imageResponse.blob();
    formData.append('image', {
      uri: newImageUri,
      type: mimeType,
      name: newImageUri.split('/').pop(),
    } as any);

    console.log("Imagem URI ajustada:", newImageUri);
    console.log("Tipo MIME:", mimeType);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta do servidor: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Resposta do servidor:", responseData);
    return responseData.classificacao || null;
  } catch (error) {
    console.error('Erro no envio da imagem:', error);
    return null;
  }
};

export default{ sendImageToAI };