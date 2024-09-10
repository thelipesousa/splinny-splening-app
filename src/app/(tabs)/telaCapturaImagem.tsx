// src/screens/TelaCapturaImagem.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { selectImageFromGallery, takePhotoWithCamera } from "../../../src/controllers/imageController";
import { useRouter } from "expo-router";

export default function TelaCapturaImagem() {
  const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectImage = async () => {
    const imageUri = await selectImageFromGallery();
    if (imageUri) {
      setSelectedImage({ localUri: imageUri });
      // Navega para a tela de loading
      router.push("./telaLoading");
    }
  };

  const handleTakePhoto = async () => {
    const imageUri = await takePhotoWithCamera();
    if (imageUri) {
      setSelectedImage({ localUri: imageUri });
      // Navega para a tela de loading
      router.push("./telaLoading");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Tela Captura de Imagem</Text>

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

        <TouchableOpacity className=""
        onPress={() => router.push("./telaResultadosPesquisa")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Encontrar receitas</Text>
      </TouchableOpacity>

      <TouchableOpacity className=""
        onPress={() => router.push("./telaExibirReceita")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Exibir Receita</Text>
      </TouchableOpacity>
      </View>
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    top: 48,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
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
    backgroundColor: "#000000",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
});
