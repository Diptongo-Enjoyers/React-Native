import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabBarDonador from "../../Components/BottomTabBarDonador";

export default function noticiasDonador() {
  const [noticias, setNoticias] = useState([]);
  const selectedTab = "noticiasDonador";
  const router = useRouter();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // Recupera el token
        const userToken = await AsyncStorage.getItem("userToken");

        const response = await fetch(
          "https://api-three-kappa-45.vercel.app/news",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchNoticias();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Link
        href={{
          pathname: "noticiasDetalle",
          params: {
            titulo: item.title,
            autor: item.author,
            descripcion: item.body,
            imagen: item.image,
            fecha: formatDate(item.date),
          },
        }}
        asChild
      >
        <Pressable>
          <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.titulo}>{item.title}</Text>
      <Text style={styles.descripcion}>{formatDate(item.date)}</Text>
      </Pressable>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={noticias}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <BottomTabBarDonador selectedTab={selectedTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 8,
  },
});
