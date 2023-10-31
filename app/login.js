import { Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';

const login = () => {
  return (
    <LinearGradient
      colors={['#FFF9E0', '#FFEBEB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.subTitulo}>¡Bienvenido de vuelta!</Text>
      <TextInput style={styles.input} placeholder="ejemplo@gmail.com" />
      <TextInput secureTextEntry={true} style={styles.input} placeholder="contraseña" />
      <Text style={styles.contraOlvido}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#FF7F39', '#E74428']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.contraOlvido}>Registrate aqui</Text>

      <StatusBar style="auto" />
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E0",
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
    color: "black",
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
    color: "black",
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
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    width: 200,
    marginTop: 60,
  },
  logo: {
    width: 175,
    height: 200,
  },  
})

export default login