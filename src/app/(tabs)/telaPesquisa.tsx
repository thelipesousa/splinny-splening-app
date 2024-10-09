import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchReceitas } from '../../../api/src/controllers/recipeSearch';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage

interface Receita {
  id: number;
  title: string;
  image: string;
  calories?: number;
  servings: number;
  sourceUrl: string;
}

export default function TelaPesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Receita[]>([]);
  const router = useRouter();

  // Função para armazenar favoritos no AsyncStorage
  const storeFavorites = async (favorites: Receita[]) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem('@favorite_recipes', jsonValue); // Armazena como string JSON
    } catch (e) {
      console.error('Erro ao armazenar favoritos:', e);
    }
  };

  // Função para carregar favoritos do AsyncStorage
  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite_recipes');
      if (jsonValue !== null) {
        setFavoriteRecipes(JSON.parse(jsonValue)); // Atualiza o estado com os favoritos carregados
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
    }
  };

  useEffect(() => {
    loadFavorites(); // Carrega os favoritos ao iniciar a tela
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const resultados = await fetchReceitas(searchQuery);
      setReceitas(resultados);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (recipe: Receita) => {
    const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
    
    if (isFavorite) {
      // Remove da lista de favoritos
      const updatedFavorites = favoriteRecipes.filter((favRecipe) => favRecipe.id !== recipe.id);
      setFavoriteRecipes(updatedFavorites);
      storeFavorites(updatedFavorites); // Atualiza o armazenamento com a lista atualizada
    } else {
      // Adiciona à lista de favoritos
      const updatedFavorites = [...favoriteRecipes, recipe];
      setFavoriteRecipes(updatedFavorites);
      storeFavorites(updatedFavorites); // Atualiza o armazenamento com a nova lista de favoritos
      // Navega para a tela de favoritos passando as receitas favoritas como parâmetro
      router.push({
        pathname: '/(tabs)/telaFavoritos',
        params: { favoriteRecipes: JSON.stringify(updatedFavorites) },
      });
    }
  };

  const renderItem = ({ item }: { item: Receita }) => {
    const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === item.id);

    return (
      <View style={styles.receitaContainer}>
        <Text style={styles.receitaTitle}>{item.title}</Text>
        <Text>Calorias: {item.calories ? item.calories : 'N/A'}</Text>
        <Text>Porções: {item.servings}</Text>
        <Text>Veja mais: {item.sourceUrl}</Text>

        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
          <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-border'} size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.title}>Buscar Receitas</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: -20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  receitaContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  receitaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  searchButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
