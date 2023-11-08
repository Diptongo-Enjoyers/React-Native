import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons'; // Choose appropriate icon set


const SingleHouseScreen = () => {
  const { titulo, descripcion, imagen } = useLocalSearchParams();
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back} style={styles.backButton}>
      <Icon name="arrow-back" size={35} color="#0093F2" />
    </TouchableOpacity>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imagen: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 40,
    marginTop: 50,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute', // Position absolutely within the parent view
    top: 10,             // Adjust top and left as needed for your layout
    left: 10,            // This provides some space from the corners
  },  
});

export default SingleHouseScreen;
