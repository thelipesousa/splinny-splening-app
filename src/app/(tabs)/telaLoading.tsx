import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import Footer from "@/components/footer";
import Header from "@/components/header";
import apiSpoonacular from "../../../api/src/utils/apiSpoonacular"; // Mantido como comentário
import aiService from "../../../api/src/services/aiService";

export default function TelaLoading() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfo = await NetInfo.fetch();
      console.log("Connectivity status:", netInfo.isConnected);
      return netInfo.isConnected;
    };

    const timeoutPromise = (ms: number, promise: Promise<any>) => {
      return new Promise((resolve, reject) => {
        let intervalId: any;
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          reject(new Error("Tempo limite atingido. Tente novamente."));
        }, ms);

        intervalId = setInterval(() => {
          setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        promise
          .then((res) => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            resolve(res);
          })
          .catch((err) => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            reject(err);
          });
      });
    };

    const processImageAndNavigate = async () => {
      try {
        setIsLoading(true);

        console.log("Verificando conectividade...");
        const isConnected = await checkConnectivity();
        if (!isConnected) {
          throw new Error("Sem conexão com a internet");
        }

        console.log("Enviando imagem para a IA...");
        const alimentoReconhecido = await timeoutPromise(
          10000,
          aiService.sendImageToAI(imageUri!)
        );

        console.log("Alimento reconhecido pela IA:", alimentoReconhecido);

        /*
        console.log("Buscando receitas para o alimento:", alimentoReconhecido);
        const response = await apiSpoonacular.get(`/recipes`, {
          params: {
            query: alimentoReconhecido,
            number: 10,
          },
        });

        const receitas = response.data;
        */

        setTimeout(() => {
          router.push({
            pathname: "./telaReceitas",
            // params: { receitas: JSON.stringify(receitas) }, // Parâmetro de receitas comentado
            params: { alimentoReconhecido: JSON.stringify(alimentoReconhecido) }, // Envia apenas o alimento reconhecido
          });
        }, 3000);
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
        let message = "Erro desconhecido ao processar imagem.";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            message = `Erro ${error.response.status}: ${error.response.data?.message || "Erro no servidor"}`;
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

    if (imageUri) {
      processImageAndNavigate();
    } else {
      Alert.alert("Erro", "Imagem não encontrada nos parâmetros de navegação.");
      router.back();
    }
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Processando imagem...</Text>
          <ActivityIndicator size="large" color="#FF6347" style={styles.spinner} />
          <Text style={styles.timer}>{timeLeft}s restantes</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  spinner: {
    marginVertical: 20,
  },
  timer: {
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
