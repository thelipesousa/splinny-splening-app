import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";  // Certifique-se de que o caminho está correto
import Footer from "@/components/footer";  // Certifique-se de que o caminho está correto

export default function DetalhesReceita() {
  const { nome, calorias, ingredientes, imagem } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Header /> {/* Adicionando o Header */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {typeof imagem === 'string' && <Image source={{ uri: imagem }} style={styles.image} />}
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.calorias}>Calorias: {calorias}</Text>
        <Text style={styles.subtitle}>Ingredientes:</Text>
        {ingredientes &&
          Object.entries(JSON.parse(ingredientes as string)).map(([key, value], index) => (
            <Text key={index} style={styles.ingredient}>
              • {key.replace(/_/g, " ")}: {String(value)}
            </Text>
          ))}
      </ScrollView>
      <Footer /> {/* Adicionando o Footer */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:16,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  calorias: {
    fontSize: 18,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
});
