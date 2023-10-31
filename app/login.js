import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.subTitulo}>¡Bienvenido de vuelta!</Text>
      <TextInput style={styles.input} placeholder="ejemplo@gmail.com" />
      <TextInput secureTextEntry={true} style={styles.input} placeholder="contraseña" />
      <Text style={styles.contraOlvido}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#DDB677', '#FF3CBD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.contraOlvido}>Registrate aqui</Text>

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
  contraOlvido: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    width: 200,
    marginTop: 60,
  }
})

export default login