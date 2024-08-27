import { Text, View, Image, StyleSheet, Animated, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View className="bg-red-600 flex-1 justify-center items-center space-y-10">
      <StatusBar style="light" />

      {/* Texto animado */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="text-white font-bold tracking-widest text-5xl text-center mb-10">
          Bem-vindo ao app de sugestões de receitas
        </Text>
      </Animated.View>


      {/* Logo da SPLINNY */}
      <View className="bg-white/20 rounded-full p-4 mt-10">
        <View className="bg-white/20 rounded-full p-2">
          <Image
            source={require("../../../assets/images/splinny.png")}
            className="w-72 h-72 rounded-full"
          />
        </View>
      </View>
      
         {/* Botão Começar*/}
         <TouchableOpacity
        onPress={() => router.push("./telaCapturaImagem")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Começar!</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff4500", // Cor de fundo semelhante à da imagem
    borderRadius: 25, // Bordas arredondadas
    paddingVertical: 15, // Padding vertical
    paddingHorizontal: 30, // Padding horizontal
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // Texto em branco
    fontSize: 24, // Tamanho do texto
    fontWeight: "bold", // Texto em negrito
    padding: 8,
    paddingTop: 8,
  },
});
