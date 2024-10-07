import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Receita {
  id: string; // Alterado para Spoonacular
  title: string;
  ingredients: string[];
  instructions: string;
}

export default function TelaReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Usar o hook para pegar os parâmetros passados pela tela de loading
  const { receitas: receitasParam } = useLocalSearchParams();

  useEffect(() => {
    if (receitasParam) {
      // Parsear as receitas vindas dos parâmetros
      const receitasList = JSON.parse(receitasParam as string);
      setReceitas(receitasList);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [receitasParam]);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
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
