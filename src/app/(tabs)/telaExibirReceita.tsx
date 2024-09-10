import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ExibirReceita() {
  const [receitas, setReceitas] = useState([]);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filtrarReceitas = async (criterio: string) => {
    try {
      const response = await axios.post('http://192.168.0.185:5000/filtrar', {
        criterio: criterio
      });
      setReceitas(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => filtrarReceitas('calorico')}>
          <Text style={styles.buttonText}>Filtrar calorias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => filtrarReceitas('quantidade')}>
          <Text style={styles.buttonText}>Filtrar quantidade</Text>
        </TouchableOpacity>
      </View>
      {receitas.map((receita: any, index: number) => (
        <Text key={index}>{receita.nome}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    top: 48,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
  buttonsContainer: {
    marginTop: 80, // Ajusta a posição dos botões de filtro
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 0, // Adiciona espaço entre os botões
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
