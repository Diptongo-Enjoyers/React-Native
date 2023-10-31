import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'

const noticias = [
  {
    id: 1,
    titulo: "Noticia 1",
    descripcion: "Descripcion de la noticia 1",
    imagen: require('../../assets/logo.png')
  },
  {
    id: 2,
    titulo: "Noticia 2",
    descripcion: "Descripcion de la noticia 2",
    imagen: require('../../assets/logo.png')
  },
  {
    id: 3,
    titulo: "Noticia 3",
    descripcion: "Descripcion de la noticia 3",
    imagen: require('../../assets/logo.png')
  },
]

export default function noticiasBenef() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagen} style={styles.image} />
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={noticias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
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
    width: '100%',
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
})