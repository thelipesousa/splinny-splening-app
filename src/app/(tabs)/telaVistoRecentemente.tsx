import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
}

export default function TelaVistoRecentemente() {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation();

  // Carrega as receitas do AsyncStorage
  const loadRecentRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem("recentRecipes");
      if (storedRecipes) {
        setRecentRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error("Erro ao carregar receitas recentes:", error);
    }
  };

  useEffect(() => {
    loadRecentRecipes();
  }, []);

  const handleRecipePress = (recipe: Recipe) => {
    // Navegar para a tela de detalhes da receita
    router.push("/TelaDetalheReceita", { recipe });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Visto Recentemente</Text>

        {recentRecipes.length > 0 ? (
          recentRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeContainer}
              onPress={() => handleRecipePress(recipe)}
            >
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text numberOfLines={2} style={styles.recipeSummary}>
                  {recipe.summary}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecipesText}>Nenhuma receita visualizada recentemente.</Text>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  recipeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeSummary: {
    fontSize: 14,
    color: "#666",
  },
  noRecipesText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
