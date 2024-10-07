import { Text, View, Image, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Animated, { useSharedValue, withSpring} from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Loading from "@/components/loading";

export default function Home() {
  const router = useRouter();
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(false)

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('./telaResultadosPesquisa');
    }, 200); // Tempo do loading antes de navegar
  };

  useEffect(() => {
    ring1padding.value = 0
    ring2padding.value = 0
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value+hp(2)), 200)
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value+wp(4)), 400)

    // timer para para a proxima tela
   setTimeout(() => router.push('./telaSugestaoDiaReceita'), 2500)

  },[])

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim]);

  return (
    <ScrollView className=" space-y-10" contentContainerStyle={styles.telaInicial}>
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
      {/* e bordas para a logo */}
      <Animated.View className="bg-white/20 rounded-full p-4 mt-10" style={{padding: ring1padding}}>
        <Animated.View className="bg-white/20 rounded-full p-2" style={{padding: ring2padding}}>
          <Image
            source={require("../../../assets/images/splinny.png")}
            className="w-80 h-80 rounded-full"
            />
        </Animated.View>
      </Animated.View>
      <View className="py-16">
         {/* Botão Começar*/}
         {/* <TouchableOpacity onPress={handlePress}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Começar!</Text>
        </TouchableOpacity> */}

      {loading && (
        <View style={styles.loadingContainer}>
            <Loading />
          </View>
      )}
      </View>
      <Loading></Loading>
    </ScrollView>
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
  telaInicial: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "red"
  },
  loadingContainer: {
    paddingTop: 20,
  }
});
