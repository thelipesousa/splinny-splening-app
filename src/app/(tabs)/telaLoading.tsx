// src/screens/TelaLoading.tsx

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function TelaLoading() {
  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    // Simula um tempo de carregamento (3 segundos) para a análise da imagem
    const timeoutId = setTimeout(() => {
      router.push("./telaResultadosPesquisa");
    }, 3000);

    return () => clearTimeout(timeoutId); // Limpa o timeout se o componente for desmontado
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analisando a imagem...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
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
});
