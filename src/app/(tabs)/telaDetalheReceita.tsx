import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DetalhesReceita() {
  const { nome, calorias, ingredientes, imagem } = useLocalSearchParams();

  // Garantir que 'nome' e 'calorias' sejam strings
  const nomeReceita = nome ? String(nome) : 'Nome não disponível';
  const caloriasReceita = calorias ? String(calorias) : 'Calorias não disponíveis';

  // Tentar analisar os ingredientes, se estiver presente e for uma string JSON
  let ingredientesParsed: [string, any][] = [];
  if (typeof ingredientes === 'string') {
    try {
      ingredientesParsed = Object.entries(JSON.parse(ingredientes));
    } catch (e) {
      console.error('Erro ao parsear ingredientes:', e);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {typeof imagem === 'string' && <Image source={{ uri: imagem }} style={styles.image} />}
        <Text style={styles.title}>{nomeReceita}</Text>
        <Text style={styles.calorias}>Calorias: {caloriasReceita}</Text>
        <Text style={styles.subtitle}>Ingredientes:</Text>
        {ingredientesParsed.map(([key, value], index) => (
          <Text key={index} style={styles.ingredient}>
            • {key.replace(/_/g, " ")}: {String(value)}
          </Text>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
