import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
}

export default function TelaDetalheReceita() {
  const route = useRoute();
  const { recipe } = route.params as { recipe: Recipe };  // Pegando os parâmetros

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.summary}>{recipe.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  summary: {
    fontSize: 16,
    color: '#666',
  },
});
