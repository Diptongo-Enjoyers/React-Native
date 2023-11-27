import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';

const CodeInputScreen = () => {
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

  const handleSubmit = () => {
    if (code.every((digit) => digit.length === 1)) {
      console.log("Código enviado:", code.join(''));
    } else {
      console.log("Todos los campos deben estar llenos");
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
