import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';

const register = () => {
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <LinearGradient
      colors={['#FFF9E0', '#FFEBEB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Registro</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, selectedOption === 'beneficiario' && styles.selectedButton]} 
          onPress={() => setSelectedOption('beneficiario')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'beneficiario' && styles.selectedButtonText]}>
            Beneficiario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, selectedOption === 'Donador' && styles.selectedButton]} 
          onPress={() => setSelectedOption('Donador')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'Donador' && styles.selectedButtonText]}>
          Donador
          </Text>
        </TouchableOpacity>
      </View>
      
      <TextInput 
        style={styles.input} 
        placeholder="Alias"
        onChangeText={setAlias} 
        value={alias}
      />
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

      <TouchableOpacity style={styles.buttonContainer}>
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
    marginTop: 30,
  },
  logo: {
    width: 175,
    height: 200,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20
  },  
  optionButton: {
    width: '48%', 
    padding: 10, 
    alignItems: 'center', 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#FF7F39',
    backgroundColor: 'white'
  },
  selectedButton: {
    backgroundColor: '#FF7F39',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF7F39'
  },
  selectedButtonText: {
    color: 'white'
  }
})

export default register