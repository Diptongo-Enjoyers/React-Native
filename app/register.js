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
      <Text style={styles.titulo}>Registro</Text>
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
        placeholder="contraseña"
        onChangeText={setPassword}
        value={password}
      />
      
      <TouchableOpacity style={styles.buttonContainer} onPress={authenticate}>
        <LinearGradient
          colors={['#FF7F39', '#E74428']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button} >
          <Text style={styles.buttonText}>Registarse</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Link href="/login" style={styles.contraOlvido}>Inicia sessión aqui</Link>

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
    marginTop: 60,
  },
  logo: {
    width: 175,
    height: 200,
  },
})

export default login