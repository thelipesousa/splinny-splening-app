import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { selectImageFromGallery, takePhotoWithCamera } from "../../../src/controllers/imageController";
import { useRouter } from "expo-router";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TelaCapturaImagem() {
  const [selectedImages, setSelectedImages] = useState<{ localUri: string }[]>([]);
  const router = useRouter();

  const handleSelectImage = async () => {
    const imageUri = await selectImageFromGallery();
    if (imageUri) {
      setSelectedImages(prevImages => [...prevImages, { localUri: imageUri }]);
    }
  };

  const handleTakePhoto = async () => {
    const imageUri = await takePhotoWithCamera();
    if (imageUri) {
      setSelectedImages(prevImages => [...prevImages, { localUri: imageUri }]);
    }
  };

  const handleContinue = () => {
    if (selectedImages.length > 0) {
      // Navega para a tela de loading passando as URIs das imagens
      router.push({
        pathname: "/(tabs)/telaLoading",
        params: { imageUri: selectedImages[0].localUri },
      });
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

        {/* Exibe o botão "Continuar" apenas se pelo menos uma imagem foi selecionada */}
        {selectedImages.length > 0 && (
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Analisar imagens</Text>
          </TouchableOpacity>
        )}
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
    height: 250, // Define a altura fixa para o espaço das imagens
    width: '100%', // Ocupa toda a largura da tela
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10, // Espaço entre as imagens
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
});
