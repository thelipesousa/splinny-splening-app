import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from 'axios';

interface Receita {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

export default function TelaReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Usar o hook para pegar o parâmetro do alimento reconhecido
  const { alimento } = useLocalSearchParams();
  console.log("Alimento recebido:", alimento);

  useEffect(() => {
    if (alimento) {
      // Primeira requisição: buscar ingredientes da IA
      axios
        .get(`https://divine-moving-yeti.ngrok-free.app/classificar`, { params: { alimento } }) // Ajuste a URL conforme necessário
        .then((response) => {
          const ingredientes = response.data.predictions || [];
          const ingredientesString = ingredientes.map((item: any) => item.classificacao).join(", ");
          
          // Segunda requisição: buscar receitas com base nos ingredientes
          return axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
              query: ingredientesString,
              apiKey: "6118fb23aa364ed49fdda62008599e7d", // Insira sua chave da Spoonacular
              number: 5, // Número de receitas para retornar
              language: 'pt', // Para garantir que a resposta esteja em português
            }
          });
        })
        .then((response) => {
          setReceitas(response.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar receitas:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [alimento]);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Receitas sugeridas</Text>
      {receitas.length > 0 ? (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.receitaContainer}>
              <Text style={styles.receitaTitle}>{item.title}</Text>
              <Text style={styles.subtitle}>Ingredientes:</Text>
              {item.ingredients.map((ing, index) => (
                <Text key={index} style={styles.ingredient}>• {ing}</Text>
              ))}
              <Text style={styles.subtitle}>Instruções:</Text>
              <Text style={styles.instructions}>{item.instructions}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReceitas}>Nenhuma receita encontrada</Text>
      )}
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  receitaContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  receitaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 8,
  },
  instructions: {
    fontSize: 16,
    marginTop: 4,
  },
  noReceitas: {
    fontSize: 18,
    color: "#888",
  },
});
