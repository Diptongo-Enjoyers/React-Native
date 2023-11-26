import React from "react";
import { View, FlatList, StyleSheet, Touchable } from "react-native";
import { useRouter } from "expo-router";
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";
import {
  NativeBaseProvider,
  Divider,
  Avatar,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  Box,
  Heading,
  Fab,
  Button
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function noticiasAdmin() {
  const selectedTab = "tablaDonacionesAlimentos";
  const router = useRouter();
  const donations = [
    { id: "1", user: "User1", date: "2023-11-25", status: "Pendiente" },
    { id: "2", user: "User2", date: "2023-11-24", status: "Entregado" },
    // ... more donation objects
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText}>{item.user}</Text>
      <Text style={styles.itemText}>{item.date}</Text>
      {item.status === "Pendiente" ? (
        <Button variant="solid"
        colorScheme="info">
          <Text style={styles.itemText}>Aprobar</Text>
        </Button>
      ) : (
        <Text style={styles.itemText}>{item.status}</Text>
      )}
    </View>
  );
  

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading bold size="xl">
          Donaciones
        </Heading>
        <Divider my={2} />
        <View style={styles.heading}>
          <Text style={styles.itemText}>Usuario</Text>
          <Text style={styles.itemText}>Fecha</Text>
          <Text style={styles.itemText}>Estado</Text>
        </View>
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <BottomTabBarAdmin selectedTab={selectedTab} />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  cellStyle: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemRow: {
    backgroundColor: "#F0EDED",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    

    // Add more styles for the row as needed
  },
  itemText: {
    // Style for the text components
  },
  button: {
    // Style for the TouchableOpacity
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    colorScheme: "info",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
