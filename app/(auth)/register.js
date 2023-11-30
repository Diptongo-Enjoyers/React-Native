import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const Register = () => {
  // Cambiado a mayúscula para seguir las convenciones de React
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  selectedOption === "Donador";

  const registerUser = async () => {
    // Mover la función al interior del componente
    const clearanceValue = selectedOption === "beneficiario" ? 1 : 2;

    const response = await fetch(
      "https://api-three-kappa-45.vercel.app/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          username: alias,
          clearance: clearanceValue,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      router.replace("../noticiasDonador");
      console.log("Usuario registrado con éxito:", data);
    } else {
      console.error("Error registrando usuario:", data);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["#FFF9E0", "#FFEBEB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.titulo}>Registro</Text>

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
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirmar contraseña"
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={registerUser}>
          <LinearGradient
            colors={["#FF7F39", "#E74428"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registarse</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => router.replace("/login")}
        >
          <LinearGradient
            colors={["#FF9755", "#FF7F39"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Inicia sesión aquí</Text>
          </LinearGradient>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E0",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 80,
    color: "#34434D",
    fontWeight: "bold",
  },
  subTitulo: {
    fontSize: 20,
    color: "black",
  },
  input: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  contraOlvido: {
    fontSize: 14,
    color: "black",
    marginTop: 20,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: 200,
    marginTop: 30,
  },
  logo: {
    width: 175,
    height: 200,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  optionButton: {
    width: "48%",
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF7F39",
    backgroundColor: "white",
  },
  selectedButton: {
    backgroundColor: "#FF7F39",
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF7F39",
  },
  selectedButtonText: {
    color: "white",
  },
  loginButtonContainer: {
    alignItems: "center",
    width: 200,
    marginTop: 20,
  },
  loginButton: {
    height: 35,
    width: 120,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});

export default Register;
