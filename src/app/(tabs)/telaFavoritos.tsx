import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function Favoritos({ favoriteRecipes, toggleFavorite }: { favoriteRecipes: Recipe[], toggleFavorite: (recipe: Recipe) => void }) {
  const router = useRouter();

  const openRecipeDetails = (recipe: Recipe) => {
    router.push({
      pathname: '/telaDetalheReceita', // Nome da rota para os detalhes da receita
      params: { id: recipe.id, name: recipe.title, image: recipe.image }, // Passa os parâmetros
    });
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => openRecipeDetails(item)} // Abre a tela de detalhes da receita
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.title}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item)}>
        <MaterialIcons
          name={favoriteRecipes.some((favRecipe) => favRecipe.id === item.id) ? 'favorite' : 'favorite-border'}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.title}>Receitas Favoritas</Text>
      {favoriteRecipes ? (
        <FlatList
          data={favoriteRecipes} // Exibe apenas as receitas favoritas
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma receita favorita.</Text> // Texto se não houver favoritos
      )}
      <Footer></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  recipeItem: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeName: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
});
