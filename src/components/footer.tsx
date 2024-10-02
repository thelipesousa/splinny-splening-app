import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Footer(){
  const [activeTab, setActiveTab] = useState('TelaInicial');

  const handlePress = (tab: string) => {
    setActiveTab(tab);
    // Você pode adicionar navegação aqui se necessário
    if (tab === 'TelaInicial'){
        router.push('/(tabs)');
    }
    if (tab === 'Favoritos'){
        router.push('./telaFavoritos');
    }
    if (tab === 'TelaSugestaoDia'){
      router.push('./telaSugestaoDiaReceita'); // Navega para a tela de sugestão do dia
  }
    if (tab === 'VistoRecentemente'){
        router.push('./telaVistoRecentemente')
    }
    if (tab === 'Pesquisa'){
        router.push('./telaPesquisa')
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress('TelaInicial')}>
        <MaterialIcons
          name="home"
          size={30}
          color={activeTab === 'TelaInicial' ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Favoritos')}>
        <MaterialIcons
          name="favorite"
          size={30}
          color={activeTab === 'Favoritos' ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('TelaSugestaoDia')}>
        <MaterialIcons
          name="restaurant"
          size={30}
          color={activeTab === 'TelaSugestaoDia' ? 'red' : 'gray'}
        />
      </TouchableOpacity>


      <TouchableOpacity onPress={() => handlePress('VistoRecentemente')}>
        <MaterialIcons
          name="history"
          size={30}
          color={activeTab === 'VistoRecentemente' ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Pesquisa')}>
        <MaterialIcons
          name="search"
          size={30}
          color={activeTab === 'Pesquisa' ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 10,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      
    
    },
  });