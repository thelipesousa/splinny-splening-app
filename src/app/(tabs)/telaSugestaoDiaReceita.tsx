import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import Footer from "@/components/footer";

export default function telaSugestaoDiaReceita() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, cabeça de pika!</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Ionicons
        name="settings-outline"
        size={24}
        color="black"
        style={styles.iconConfig}
      />
      <Text style={styles.suggestion}>
        Sugestão do dia. Dê uma olhada na receita
      </Text>
      <Image
        source={{
          uri: "https://blog-parceiros.ifood.com.br/wp-content/uploads/2022/06/still-life-of-hamburger-2021-08-26-17-52-23-utc-1.jpg.webp",
        }}
        style={styles.dishImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="leaf-outline" size={24} color="red" />
          <Text>Vegetariano</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={24} color="black" />
          <Text>45 min</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="flame-outline" size={24} color="black" />
          <Text>270 kcal</Text>
        </View>
      </View>
      <Text style={styles.title}>Bosintang</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/telaCapturaImagem')}>
        <Text style={styles.buttonText}>Tirar foto</Text>
      </TouchableOpacity>
      <Footer></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconConfig: {
    //icone de configurações
    position: "absolute",
    top: 68,
    right: 20,
  },
  suggestion: {
    fontSize: 18,
    marginVertical: 10,
  },
  dishImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  infoItem: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
});
