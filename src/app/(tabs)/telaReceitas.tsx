import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Receita {
  nome: string;
  calorias: number;
  ingredientes: Record<string, string>;
  similaridade: number;
}

export default function TelaReceitas() {
  const { receitas } = useLocalSearchParams();
  const [receitasRecomendadas, setReceitasRecomendadas] = useState<Receita[]>([]);

  useEffect(() => {
    if (receitas) {
      const parsedReceitas = JSON.parse(receitas as string);
      setReceitasRecomendadas(parsedReceitas);
    }
  }, [receitas]);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Receitas sugeridas</Text>
      {receitasRecomendadas.length > 0 ? (
        <FlatList
          data={receitasRecomendadas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.receitaContainer}>
              <Text style={styles.receitaTitle}>{item.nome}</Text>
              <Text style={styles.subtitle}>Calorias: {item.calorias}</Text>
              <Text style={styles.subtitle}>Ingredientes:</Text>
              {Object.entries(item.ingredientes).map(([key, value], index) => (
                <Text key={index} style={styles.ingredient}>
                  • {key.replace(/_/g, " ")}: {value}
                </Text>
              ))}
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
  noReceitas: {
    fontSize: 18,
    color: "#888",
  },
});
