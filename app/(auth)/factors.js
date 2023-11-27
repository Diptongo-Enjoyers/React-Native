import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CodeInputScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (!userEmail) throw new Error("No se encontró el correo electrónico del usuario.");

        const body = JSON.stringify({
          email: userEmail,
          verificationCode: fullCode,
        });

        const response = await fetch("https://api-three-kappa-45.vercel.app/auth/verifyAuthenticationCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        const data = await response.json();
        if (response.ok && data.accessToken) {
          await AsyncStorage.setItem("userToken", data.accessToken);
          router.replace("/noticiasAdmin");
        } else {
          console.error("Error al verificar el código:", data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("El código debe tener 6 dígitos");
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>
          Por favor, revisa tu correo electrónico para obtener el código de verificación.
        </Text>
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(text, index)}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </View>
        <Button onPress={handleSubmit} style={styles.button}>
          Enviar Código
        </Button>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 175,
    height: 200,
    marginTop: 40,
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#555',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  }
});

export default CodeInputScreen;
