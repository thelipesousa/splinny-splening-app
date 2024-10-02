import React, { useState } from "react";
import {StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TelaConfiguracoes() {
  const [isVeganOnly, setIsVeganOnly] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const handleToggleVeganOnly = () => setIsVeganOnly(!isVeganOnly);
  const handleToggleDarkTheme = () => setIsDarkTheme(!isDarkTheme);
  const handleToggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkMode : styles.lightMode]}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Configurações</Text>

        {/* Configuração de Tema */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Tema Escuro</Text>
          <Switch value={isDarkTheme} onValueChange={handleToggleDarkTheme} />
        </View>

        {/* Configuração de Receitas Veganas */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Mostrar apenas receitas veganas</Text>
          <Switch value={isVeganOnly} onValueChange={handleToggleVeganOnly} />
        </View>

        {/* Configuração de Notificações */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Notificações</Text>
          <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
        </View>

        {/* Botão para salvar configurações */}
        <TouchableOpacity style={styles.button} onPress={() => alert("Configurações salvas!")}>
          <Text style={styles.buttonText}>Salvar Configurações</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkMode: {
    backgroundColor: "#333",
    color: "#fff",
  },
  lightMode: {
    backgroundColor: "#fff",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingLabel: {
    fontSize: 18,
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
  scrollContent: {
    paddingBottom: 100,
  },
});

