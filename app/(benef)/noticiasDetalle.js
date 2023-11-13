import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons'; // Choose appropriate icon set


const SingleHouseScreen = () => {
  const { titulo, descripcion, imagen } = useLocalSearchParams();
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Bar */}
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={back} style={styles.backButton}>
        <Icon name="arrow-back" size={35} color="#0093F2" />
      </TouchableOpacity>
      {/* Add other header elements if needed */}
    </View>
      <ScrollView>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerBar: {
    backgroundColor: '#fff',
    paddingTop: 50, // Adjust for status bar height if necessary
    paddingHorizontal: 10,
    // Add shadow or elevation if you want to give it depth
  },
  imagen: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 40,
    marginTop: 50,
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    position: 'absolute', // Position absolutely within the parent view             // Adjust top and left as needed for your layout
  },  
});

export default SingleHouseScreen;
