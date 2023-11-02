import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const authenticate = async () => {
    const response = await fetch('https://api-three-kappa-45.vercel.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Autenticación exitosa:", data.accessToken)
      router.replace('/noticiasBenef');
    }
    else {
      console.error("Error en la autenticación:", data.message);
    }
  };

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
      
      <TextInput 
        style={styles.input} 
        placeholder="ejemplo@gmail.com"
        onChangeText={setEmail} 
        value={email}
      />
      <TextInput 
        secureTextEntry={true} 
        style={styles.input} 
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
      />
      
      <Text style={styles.contraOlvido}>¿Olvidaste tu contraseña?</Text>
      
      <TouchableOpacity style={styles.buttonContainer} onPress={authenticate}>
        <LinearGradient
          colors={['#FF7F39', '#E74428']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButtonContainer} onPress={() => router.replace('/register')}>
        <LinearGradient
          colors={['#FF9755', '#FF7F39']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.registerButton} >
          <Text style={styles.registerButtonText}>Registrate aquí</Text>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E0",
    alignItems: "center",
    justifyContent: 'center',
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
    marginTop: 20,
  },
  logo: {
    width: 175,
    height: 200,
  },
  registerButtonContainer: {
    alignItems: 'center',
    width: 200,
    marginTop: 20,
  },
  registerButton: {
    height: 35,
    width: 120,
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default login