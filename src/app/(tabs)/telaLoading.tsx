import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import axiosClient from "../../../api/src/utils/axiosClient";
import NetInfo from "@react-native-community/netinfo";

export default function TelaLoading() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfo = await NetInfo.fetch();
      console.log("Connectivity status:", netInfo.isConnected);
      return netInfo.isConnected;
    };

    const fetchReceitas = async () => {
      try {
        setIsLoading(true);
        console.log("Verificando conectividade...");
        const isConnected = await checkConnectivity();
        if (!isConnected) {
          throw new Error("Sem conexão com a internet");
        }

        console.log("Iniciando busca de receitas...");
        console.log("URL da requisição:", axiosClient.defaults.baseURL + "/recipes");
        
        const response = await axiosClient.get("/recipes");
        console.log("Resposta recebida:", JSON.stringify(response.data, null, 2));
        
        const receitas = response.data;

        setTimeout(() => {
          router.push({
            pathname: "./telaReceitas",
            params: { receitas: JSON.stringify(receitas) }
          });
        }, 3000);
      } catch (error) {
        console.error("Erro detalhado ao buscar receitas:", error);
        let message = "Erro desconhecido ao buscar receitas.";

        if (axios.isAxiosError(error)) {
          console.log("Axios Error:", JSON.stringify(error.toJSON(), null, 2));
          if (error.response) {
            message = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro no servidor'}`;
            console.log("Response data:", JSON.stringify(error.response.data, null, 2));
          } else if (error.request) {
            message = "Não foi possível conectar ao servidor. Verifique sua conexão.";
            console.log("Request:", JSON.stringify(error.request, null, 2));
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

    fetchReceitas();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text style={styles.text}>Carregando receitas...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.text}>Redirecionando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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