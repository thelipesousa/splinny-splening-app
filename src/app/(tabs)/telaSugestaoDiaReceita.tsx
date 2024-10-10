import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Loading from "@/components/loading";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  spoonacularScore: number;
  vegan: boolean;
  summary: string;
}

export default function TelaSugestaoDiaReceita() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMockRecipe = () => {
    const mockRecipe: Recipe = {
      id: 1,
      title: "Spaghetti à Carbonara",
      image: "https://via.placeholder.com/300.png?text=Spaghetti+Carbonara", // URL mockada para a imagem
      readyInMinutes: 30,
      spoonacularScore: 450,
      vegan: false,
      summary: "Uma deliciosa receita de Spaghetti à Carbonara, feita com ovos, queijo parmesão, pancetta e pimenta-do-reino.",
    };
    setRecipe(mockRecipe);
    setLoading(false);
  };

  useEffect(() => {
    fetchMockRecipe(); // Chame a função mockada
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingRecipes}>
        <Text>Carregando receita... Aguarde</Text>
        <Loading />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.loadingRecipes}>
        <Text>Erro ao carregar receita.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Olá, visitante!</Text>
        <Text style={styles.suggestion}>Sugestão do dia. Dê uma olhada na receita:</Text>
        <Image source={{ uri: recipe.image }} style={styles.dishImage} />
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="leaf-outline" size={24} color="green" />
            <Text>{recipe.vegan ? "Vegana" : "Não é vegana"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text>{recipe.readyInMinutes} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flame-outline" size={24} color="black" />
            <Text>{recipe.spoonacularScore.toFixed(2)} calorias</Text>
          </View>
        </View>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.summary}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/telaCapturaImagem')}>
          <Text style={styles.buttonText}>Tirar foto</Text>
        </TouchableOpacity>
      </ScrollView>
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
  loadingRecipes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  suggestion: {
    fontSize: 16,
    marginVertical: 10,
    marginTop: -10,
  },
  dishImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  infoItem: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
