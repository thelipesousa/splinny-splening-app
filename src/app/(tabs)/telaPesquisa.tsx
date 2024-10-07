import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { fetchReceitas } from '../../../api/src/controllers/recipeSearch';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { MaterialIcons } from '@expo/vector-icons';

interface Receita {
  id: number;
  title: string;
  image: string;
  calories?: number;
  servings: number;
  sourceUrl: string;
}

export default function TelaPesquisa({ favoriteRecipes = [], toggleFavorite }: { favoriteRecipes: Receita[], toggleFavorite: (recipe: Receita) => void }) {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a consulta de busca
  const [receitas, setReceitas] = useState<Receita[]>([]); // Armazena as receitas buscadas
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  // Função chamada ao clicar no botão de buscar
  const handleSearch = async () => {
    setIsLoading(true); // Inicia o loading
    try {
      const resultados = await fetchReceitas(searchQuery); // Chama a função da controller
      setReceitas(resultados); // Atualiza o estado com as receitas obtidas
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setIsLoading(false); // Finaliza o loading
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

        {/* Botão de Favoritar */}
        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
          <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-border'} size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* Título da tela */}
      <View style={styles.header}>
        <Text style={styles.title}>Buscar Receitas</Text>
      </View>

      {/* Campo de busca */}
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Botão de busca */}
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Lista de receitas */}
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
    backgroundColor: 'red', // Cor de fundo do botão
    padding: 12, // Espaçamento interno
    borderRadius: 4, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  searchButtonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
  },
});
