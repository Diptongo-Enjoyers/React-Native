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
        container: {},
        imagen: {},
        titulo: {},
        descripcion: {},
    },
});

export default SingleHouseScreen;
