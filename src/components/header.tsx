// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ou expo-router
import { router } from 'expo-router';

interface HeaderProps {
  title?: string; // Se quiser passar um título opcional para o cabeçalho
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerContent} onPress={() => router.push('/(tabs)')}>
        <Image source={require('../../assets/images/splinny.png')} style={styles.logo} />
        {title && <Text style={styles.title}>{title}</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/telaConfig')}>
      <Ionicons name="settings-outline" size={24} color="black" style={styles.iconConfig} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff', // Cor do fundo
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -15,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 16,
    color: 'black',
  },
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30, // Defina o tamanho da imagem
    height: 30,
    marginRight: 10, // Espaço entre a imagem e o título
  },
  iconConfig: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
