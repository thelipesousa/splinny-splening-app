import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

export default function TelaResultadosPesquisa() {
  const navigation = useNavigation();

    const router = useRouter();

  const handleGoBack = () => {
    navigation.goBack(); // Função para voltar à tela anterior
  };

  return (
    <View className="justify-center align-items flex-1" style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons className="py-8" name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Conteúdo principal da tela */}
      <View style={styles.mainContent}>
        {/* Conteúdo adicional pode ser adicionado aqui */}
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('./telaCapturaImagem')}>
          <FontAwesome name="home" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => router.push("./telaFavoritos")}>
          <FontAwesome name="heart-o" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Usuário pressionado')}>
          <FontAwesome name="user-o" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Sino pressionado')}>
          <FontAwesome name="bell-o" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Pesquisar pressionado')}>
          <FontAwesome name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignContent: "center",
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignContent: 'center',
    justifyContent: "center",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconButton: {
    alignItems: 'center',
  },
});
