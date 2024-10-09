import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Footer from '@/components/footer';
import Header from '@/components/header';

interface Receita {
  id: number;
  title: string;
  image: string;
}

export default function Favoritos() {
  const { favoriteRecipes } = useLocalSearchParams(); // Obtém os parâmetros da navegação
  const favoritesList: Receita[] = favoriteRecipes ? JSON.parse(favoriteRecipes as string) : []; // Parse do JSON recebido

  const renderRecipeItem = ({ item }: { item: Receita }) => (
    <View style={styles.recipeItem}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Receitas Favoritas</Text>
      {favoritesList.length > 0 ? (
        <FlatList
          data={favoritesList}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma receita favorita.</Text>
      )}
      <Footer/>
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
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
});
