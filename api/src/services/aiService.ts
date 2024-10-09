import axiosClient from "../../../api/src/utils/axiosClient"; // Usando o cliente axios personalizado para fazer a requisição

const aiService = {
  sendImageToAI: async (imageUri: string | string[] ): Promise<string> => {
    try {
      const formData = new FormData();
      let imageBlob;
      if (typeof imageUri === 'string') {
        imageBlob = new Blob([imageUri], { type: 'image/jpeg' });
      } else {
        imageBlob = new Blob(imageUri, { type: 'image/jpeg' });
      }
      formData.append('image', imageBlob, 'photo.jpg');

      // Envia a imagem para o backend ou serviço de IA
      const response = await axiosClient.post('/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Retorna o alimento reconhecido pela IA
      return response.data.alimento;
    } catch (error) {
      console.error('Erro ao enviar imagem para IA:', error);
      throw new Error('Falha ao processar a imagem com a IA.');
    }
  },
};

export default aiService;
