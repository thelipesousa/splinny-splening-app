import { Text, View, Image, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import Animated, { useSharedValue, withSpring} from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

export default function Home() {
  const router = useRouter();
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0
    ring2padding.value = 0
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value+hp(5)), 100)
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value+wp(5.5)), 300)
  },[])

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim]);

  return (
    <View className="bg-red-600 flex-1 justify-center items-center space-y-10">
      <StatusBar style="light" />

      {/* Texto animado */}
      <Animated.View style={{ opacity: 100 }}>
        <Text className="text-white font-bold tracking-widest text-5xl text-center py-10 ">
          Bem-vindo ao Splinny Splening
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: 100}}>
        <Text className="font-medium text-white tracking-widest text-lg">
          Seu app de para encontrar a receita perfeita
        </Text>
      </Animated.View>


      {/* Logo da SPLINNY */}
      <Animated.View className="bg-white/20 rounded-full p-6 mt-10" style={{padding: ring1padding}}>
        <Animated.View className="bg-white/20 rounded-full p-4" style={{padding: ring2padding}}>
          <Image
            source={require("../../../assets/images/splinny.png")}
            className="w-80 h-80 rounded-full"
          />
        </Animated.View>
      </Animated.View>
      <View className="py-16">
         {/* Botão Começar*/}
         <TouchableOpacity
        onPress={() => router.push("./telaCapturaImagem")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Começar!</Text>
      </TouchableOpacity>
      </View>
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
