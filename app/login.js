import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.subTitulo}>¡Bienvenido de vuelta!</Text>
      <TextInput style={styles.input} placeholder="ejemplo@gmail.com" />
      <TextInput style={styles.input} placeholder="contraseña" />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent:'center',
  },
  titulo: {
    fontSize: 80,
    color: '#34434D',
    fontWeight: "bold",
  },
  subTitulo: {
    fontSize: 20,
    color: "gray",
  },
  input: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
})

export default login