import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import Footer from "@/components/footer";
import { getRandomRecipe } from "../../../api/src/routes/apiRoute";
import { translateText } from "../../../api/src/controllers/translateController";
import Header from "@/components/header";

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
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchRandomRecipe = async () => {
    try {
      const recipeData = await getRandomRecipe();

      // Tradução do sumário da receita
      console.log('Recebido summary antes da tradução:', recipeData.summary);
      const translatedSummary = await translateText(recipeData.summary, 'pt');
      console.log('Summary traduzido:', translatedSummary);

      // Atualiza o estado com o resumo traduzido
      setRecipe({ ...recipeData, summary: translatedSummary });
    } catch (error) {
      console.error('Erro ao buscar receita ou traduzir:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeHtmlTags = (text: string) => {
    return text.replace(/<[^>]*>?/gm, ""); // Remove as tags HTML
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando receita...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar receita.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header></Header>
      <ScrollView contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}> 
        {/* <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity> */}
        <Text style={styles.greeting}>Olá, visitante!</Text>
        {/* <Ionicons
          name="settings-outline"
          size={24}
          color="black"
          style={styles.iconConfig}
        /> */}
        <Text style={styles.suggestion}>
          Sugestão do dia. Dê uma olhada na receita:
        </Text>
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
        <Text style={styles.description}>{removeHtmlTags(recipe.summary)}</Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  iconConfig: {
    position: "absolute",
    top: 25,
    right: 10,
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 25,
    left: 0,
    zIndex: 1,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 16,
    color: "black",
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
