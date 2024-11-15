import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { selectImageFromGallery, takePhotoWithCamera } from "../../../src/controllers/imageController";
import { useRouter } from "expo-router";
import mime from "mime";
import Footer from "@/components/footer";
import Header from "@/components/header";

const API_URL = 'https://divine-moving-yeti.ngrok-free.app/classificar'; //Pode usar também: http://127.0.0.1:8080/classificar ou IP da sua maquina local

export default function TelaCapturaImagem() {
  const [selectedImages, setSelectedImages] = useState<{ localUri: string }[]>([]);
  const [imageResults, setImageResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSelectImage = async () => {
    const imageUri = await selectImageFromGallery();
    if (imageUri) {
      setSelectedImages(prevImages => [...prevImages, { localUri: imageUri }]);
      console.log("Imagem selecionada da galeria:", imageUri);
    }
  };

  const handleTakePhoto = async () => {
    const imageUri = await takePhotoWithCamera();
    if (imageUri) {
      setSelectedImages(prevImages => [...prevImages, { localUri: imageUri }]);
      console.log("Foto tirada:", imageUri);
    }
  };

  const sendImageToServer = async () => {
    if (selectedImages.length === 0) {
      alert('Por favor, selecione uma imagem primeiro!');
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      const newImageUri = "file:///" + image.localUri.split("file:/").join("");
      formData.append('file', {
        uri: newImageUri,
        type: mime.getType(newImageUri) || 'image/jpeg',
        name: newImageUri.split("/").pop() || `photo${index}.jpg`
      } as any);
    });
  
    console.log("Enviando imagens para o servidor...");
    console.log("URL do servidor:", API_URL);
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
      });
  
      const data = await response.json();
      console.log("Resposta completa do servidor:", data);
  
      if (data.predictions) {
        data.predictions.forEach((prediction: { filename: string; classificacao: string }, index: number) => {
          console.log(`Imagem ${index + 1}:`);
          console.log(`  Nome do arquivo: ${prediction.filename}`);
          console.log(`  Classificação: ${prediction.classificacao}`);
        });
      } else {
        console.log("Nenhuma classificação foi recebida.");
      }
  
    } catch (error) {
      console.error('Erro ao enviar as imagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedImages.length > 0) {
      sendImageToServer();
      router.push('/telaReceitas'); // Redireciona para a TelaReceitas após o envio das imagens
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Escolha uma ou mais fotos:</Text>

        {/* Contêiner rolável para as imagens */}
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {selectedImages.length > 0 ? (
              selectedImages.map((image, index) => (
                <Image key={index} source={{ uri: image.localUri }} style={styles.image} />
              ))
            ) : (
              <Text style={styles.instructions}>Nenhuma imagem selecionada</Text>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Escolher da Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>

        {/* Exibe o botão "Analisar imagens" apenas se pelo menos uma imagem foi selecionada */}
        {selectedImages.length > 0 && (
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={loading}>
            <Text style={styles.continueButtonText}>{loading ? "Carregando..." : "Analisar imagens"}</Text>
          </TouchableOpacity>
        )}

        {/* Exibe o texto dos alimentos reconhecidos para cada imagem */}
        {/* {imageResults.length > 0 && (
          <View style={styles.resultsContainer}>
            {imageResults.map((result, index) => (
              <Text key={index} style={styles.result}>
                {result.filename}: {result.classificacao}
              </Text>
            ))}
          </View>
        )} */}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  scrollContainer: {
    height: 250,
    width: '100%',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "70%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "red",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    width: '70%',
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
