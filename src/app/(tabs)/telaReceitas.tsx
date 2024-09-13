import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axiosClient from "../../../api/src/utils/axiosClient";

interface Receita {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
}

export default function TestReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await axiosClient.get("/recipes");
        console.log("Receitas recebidas:", response.data);  // Verifique se isso aparece corretamente
        setReceitas(response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);  // Verifique se há algum erro específico
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas sugeridas</Text>
      {receitas.length > 0 ? (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.receitaContainer}>
              <Text style={styles.receitaTitle}>{item.name}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    top: 40,
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
