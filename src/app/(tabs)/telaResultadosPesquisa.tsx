import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones

export default function telaResultadosPesquisa() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Voltar pressionado')}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal da tela */}
      <View style={styles.mainContent}>
        {/* Conteúdo adicional pode ser adicionado aqui */}
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Home pressionado')}>
          <FontAwesome name="home" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Coração pressionado')}>
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
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
