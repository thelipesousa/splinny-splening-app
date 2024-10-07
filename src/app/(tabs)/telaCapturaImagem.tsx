import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { selectImageFromGallery, takePhotoWithCamera } from "../../../src/controllers/imageController";
import { useRouter } from "expo-router";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TelaCapturaImagem() {
  const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);
  const router = useRouter();

  const handleSelectImage = async () => {
    const imageUri = await selectImageFromGallery();
    if (imageUri) {
      setSelectedImage({ localUri: imageUri });
    }
  };

  const handleTakePhoto = async () => {
    const imageUri = await takePhotoWithCamera();
    if (imageUri) {
      setSelectedImage({ localUri: imageUri });
    }
  };

  const handleContinue = () => {
    if (selectedImage) {
      // Navega para a tela de loading passando a URI da imagem
      router.push({
        pathname: "/(tabs)/telaLoading",
        params: { imageUri: selectedImage.localUri },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.content}>
        <Text style={styles.title}>Escolha uma foto:</Text>

        {selectedImage ? (
          <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
        ) : (
          <Text style={styles.instructions}>Nenhuma imagem selecionada</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Escolher da Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>

        {/* Exibe o botão "Continuar" apenas se uma imagem foi selecionada */}
        {selectedImage && (
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Analisar imagem</Text>
          </TouchableOpacity>
        )}
      </View>
      <Footer></Footer>
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
  button: {
    backgroundColor: "red",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 20,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "red",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
  },
});
