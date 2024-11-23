import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Receita {
  nome: string;
  calorias: number;
  ingredientes: Record<string, string>;
  similaridade: number;
  imagem?: string | null;
}

const fetchRecipeImage = async (query: string): Promise<string | null> => {
  const UNSPLASH_API_KEY = "SlNYCfUChi2tD6Eg_N7pkvz1SYTlPv7NIE2s5NzOhVw";
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&client_id=${UNSPLASH_API_KEY}&per_page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    return null;
  }
};

export default function TelaReceitas() {
  const { receitas } = useLocalSearchParams();
  const [receitasRecomendadas, setReceitasRecomendadas] = useState<Receita[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchImagesForRecipes(receitas: Receita[]) {
      const receitasComImagens = await Promise.all(
        receitas.map(async (receita) => {
          const imagem = await fetchRecipeImage(receita.nome);
          return { ...receita, imagem };
        })
      );
      setReceitasRecomendadas(receitasComImagens);
    }

    if (receitas) {
      const parsedReceitas = JSON.parse(receitas as string);
      fetchImagesForRecipes(parsedReceitas);
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
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/telaDetalheReceita",
                  params: {
                    nome: item.nome,
                    calorias: item.calorias,
                    ingredientes: JSON.stringify(item.ingredientes),
                    imagem: item.imagem,
                  },
                })
              }
            >
              <View style={styles.receitaContainer}>
                {item.imagem && <Image source={{ uri: item.imagem }} style={styles.image} />}
                <Text style={styles.receitaTitle}>{item.nome}</Text>
                <Text style={styles.subtitle}>Calorias: {item.calorias}</Text>
              </View>
            </TouchableOpacity>
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
  noReceitas: {
    fontSize: 18,
    color: "#888",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
});
