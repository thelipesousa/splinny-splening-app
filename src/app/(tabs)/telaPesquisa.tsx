import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axiosClient from '../../../api/src/utils/axiosClient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Footer from '@/components/footer';

interface Receita {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  calorias: number;
  quantidade: number;
}

export default function TelaPesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'calorias' | 'quantidade' | ''>('');
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  const fetchReceitas = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get('/recipes', {
        params: {
          search: searchQuery,
          filterBy: filterBy,
        },
      });
      setReceitas(response.data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, [searchQuery, filterBy]);

  const handleSearch = () => {
    fetchReceitas();
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Buscar Receitas</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.filtros}>
        <Button title="Ordenar por Calorias" onPress={() => setFilterBy('calorias')} />
        <Button title="Ordenar por Quantidade" onPress={() => setFilterBy('quantidade')} />
        <Button title="Limpar Filtros" onPress={() => setFilterBy('')} />
      </View>
      <Button title="Buscar" onPress={handleSearch} />
      
      {/* Lista de receitas */}
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.receitaContainer}>
              <Text style={styles.receitaTitle}>{item.name}</Text>
              <Text>Calorias: {item.calorias}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text style={styles.subTitulo}>Ingredientes:</Text>
              {Array.isArray(item.ingredients) && item.ingredients.map((ing, index) => (
                <Text key={index} style={styles.ingrediente}>• {ing}</Text>
              ))}
              <Text style={styles.subTitulo}>Instruções:</Text>
              <Text>{item.instructions}</Text>
            </View>
          )}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingTop: 16, // Adiciona espaçamento no topo para separar o botão de voltar e o título
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10, // Pequeno espaçamento à esquerda do título
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filtroButton: {
    marginRight: 8,  // Adiciona espaçamento entre os botões
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
  subTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  ingrediente: {
    fontSize: 16,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
  contentContainer: {
    paddingBottom: 100,  // Garante que o conteúdo não seja sobreposto pelo footer
  },
});
