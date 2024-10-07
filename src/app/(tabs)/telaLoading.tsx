import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import axiosClient from "../../../api/src/utils/axiosClient";
import NetInfo from "@react-native-community/netinfo";
import Footer from "@/components/footer";
import Header from "@/components/header";


export default function TelaLoading() {
  const router = useRouter();
  const { image } = useLocalSearchParams();  // Recebe a imagem passada pela navegação
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfo = await NetInfo.fetch();
      console.log("Connectivity status:", netInfo.isConnected);
      return netInfo.isConnected;
    };

    const processImageAndFetchReceitas = async () => {
      try {
        setIsLoading(true);

        console.log("Verificando conectividade...");
        const isConnected = await checkConnectivity();
        if (!isConnected) {
          throw new Error("Sem conexão com a internet");
        }

        // Enviar imagem para a IA
        console.log("Enviando imagem para a IA...");
        const alimentoReconhecido = await aiService.sendImageToAI(image);
        console.log("Alimento reconhecido pela IA:", alimentoReconhecido);

        // Busca de receitas com o alimento reconhecido
        console.log("Buscando receitas para o alimento:", alimentoReconhecido);
        const response = await axiosClient.get(`/recipes`, {
          params: {
            query: alimentoReconhecido,  // Alimento reconhecido pela IA
            number: 10,  // Quantidade de receitas
          }
        });
        const receitas = response.data;

        setTimeout(() => {
          router.push({
            pathname: "./telaReceitas",
            params: { receitas: JSON.stringify(receitas) }
          });
        }, 3000);
      } catch (error) {
        console.error("Erro ao processar imagem e buscar receitas:", error);
        let message = "Erro desconhecido ao processar imagem.";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            message = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro no servidor'}`;
          } else if (error.request) {
            message = "Não foi possível conectar ao servidor. Verifique sua conexão.";
          } else {
            message = error.message;
          }
        } else if (error instanceof Error) {
          message = error.message;
        }

        setErrorMessage(message);
        Alert.alert("Erro", message);
      } finally {
        setIsLoading(false);
      }
    };

    if (image) {
      processImageAndFetchReceitas();
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? (
        <>
          <Text style={styles.text}>Processando imagem e carregando receitas...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.text}>Redirecionando...</Text>
      )}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 20,
  },
});
