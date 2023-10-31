import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const SingleHouseScreen = () => {
  const { titulo, descripcion, imagen } = useLocalSearchParams();
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={back} />
      <Image source={imagen} style={styles.imagen} />
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
        width: '100%',
        height: 400,
        borderRadius: 8,
        marginBottom: 40,
        marginTop: 20,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    descripcion: { 
        fontSize: 16,
    },
});

export default SingleHouseScreen;
