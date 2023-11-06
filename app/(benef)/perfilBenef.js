import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import BottomTabBarBenef from "../../Components/BottomTabBarBenef";

export default function perfilBenef() {
  const selectedTab = "perfilBenef";
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Perfil del benef aqui</Text>
      <BottomTabBarBenef selectedTab={selectedTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 30,
  },
});
