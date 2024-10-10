import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('TelaInicial');
  const router = useRouter();
  const pathname = usePathname();  // Obtém a rota atual

  useEffect(() => {
    // Verifica qual é a rota atual e ajusta o ícone ativo
    if (pathname.includes('telaFavoritos')) {
      setActiveTab('Favoritos');
    } else if (pathname.includes('telaSugestaoDiaReceita')) {
      setActiveTab('TelaSugestaoDia');
    } else if (pathname.includes('telaPesquisa')) {
      setActiveTab('Pesquisa');
    } else if (pathname.includes('telaCapturaImagem')) {
      setActiveTab('CapturaImagem');
    } else {
      setActiveTab('TelaInicial');
    }
  }, [pathname]);

  const handlePress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'TelaInicial') {
      router.push('/(tabs)');
    }
    if (tab === 'Favoritos') {
      router.push('./telaFavoritos');
    }
    if (tab === 'TelaSugestaoDia') {
      router.push('./telaSugestaoDiaReceita');
    }
    if (tab === 'Pesquisa') {
      router.push('./telaPesquisa');
    }
    if (tab === 'CapturaImagem') {
      router.push('./telaCapturaImagem');
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

      <TouchableOpacity onPress={() => handlePress('CapturaImagem')}>
        <MaterialIcons
          name="photo-camera"
          size={30}
          color={activeTab === 'CapturaImagem' ? 'red' : 'gray'}
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

      <TouchableOpacity onPress={() => handlePress('Pesquisa')}>
        <MaterialIcons
          name="search"
          size={30}
          color={activeTab === 'Pesquisa' ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
}

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
