import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Recipe {
    id: string;
    name: string;
    image: string;
}

const favoriteRecipes: Recipe[] = [
    {
        id: '1',
        name: 'Spaghetti Carbonara',
        image: 'https://example.com/spaghetti.jpg',
    },
    {
        id: '2',
        name: 'Chicken Curry',
        image: 'https://example.com/chicken-curry.jpg',
    },
    {
        id: '3',
        name: 'Vegetable Stir Fry',
        image: 'https://example.com/vegetable-stir-fry.jpg',
    },
    // Adicione mais receitas conforme necessário
];

export default function Favoritos() {
    const router = useRouter();
    const navitation = useNavigation();

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <TouchableOpacity style={styles.recipeItem} >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleGoBack = () => {
        navitation.goBack();
    };

    return (
        <View className='py-12' style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons className="py-8" name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
            <Text style={styles.title}>Receitas Favoritas</Text>
            <FlatList
                data={favoriteRecipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

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
        elevation: 2, // Adiciona sombra no Android
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
        color: '#333',
        textAlign: 'center',
    },
     backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "black",
  },
});

