import { Platform } from 'react-native';
import mime from 'mime';

const API_URL = 'https://d36b-179-125-213-249.ngrok-free.app/classificar'; // Altere para o IP correto, se necessário

const sendImageToAI = async (imageUri: string) => {
  if (!imageUri) {
    console.error('Nenhuma imagem selecionada');
    return null;
  }

  try {
    // Ajusta o URI da imagem no Android
    const newImageUri = Platform.OS === 'android' ? imageUri.replace('file:///', '') : imageUri;
    const mimeType = mime.getType(newImageUri) || 'image/jpeg';

    // Configura o FormData para enviar a imagem com o nome do campo `file`
    const formData = new FormData();
    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    } as any);

    console.log("Enviando imagem para o servidor...");
    console.log("URL do servidor:", API_URL);
    console.log("Dados da imagem:", {
      uri: newImageUri,
      name: newImageUri.split('/').pop(),
      type: mimeType,
    });

    // Envio da requisição POST para o servidor
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta do servidor: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Resposta do servidor:", responseData);

    return responseData.alimento || null; // Retorna o resultado ou null
  } catch (error) {
    console.error('Erro ao enviar a imagem:', error);
    return null;
  }
};

export default { sendImageToAI };
