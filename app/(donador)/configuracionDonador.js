import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Divider,
  Avatar,
  VStack,
  Icon,
  Heading,
  Input,
  FormControl,
  HStack,
  Button,
  ScrollView,
  Box,
  KeyboardAvoidingView,
  IconButton,
  Center,
  Pressable,
  Text,
  Badge,
  Spacer,
  Flex,
  Alert,
} from "native-base";

const clearance = (clearance) => {
  switch (clearance) {
    case 0:
      return "Administrador";
    case 1:
      return "Trabajador";
    case 2:
      return "Donador";
    case 3:
      return "Receptor";
    default:
      return "";
  }
};

export default function configuracionDonador() {
  const selectedTab = "configuracionDonador";
  const router = useRouter();
  const [logoutAlert, setLogoutAlert] = useState("");
  const logoutUser = async () => {
    setLogoutAlert("");
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(data.message);
        await AsyncStorage.removeItem("userToken");
        router.replace("login");
      } else {
        console.log(data.error.message);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <VStack space={2} m={4} flex={1}>
              <HStack justifyContent="space-between" p={0} m={0}>
                <Heading bold size="xl">
                  Configuración
                </Heading>
                <IconButton
                  m={0}
                  p={0}
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="close"
                      size={"2xl"}
                      color={"gray.500"}
                    />
                  }
                  onPress={() => router.replace("perfilDonador")}
                />
              </HStack>
              <Divider my={2} />
              <ScrollView>
                <VStack space={4} flex={1}>
                  <Button
                    variant={"subtle"}
                    rounded={"full"}
                    colorScheme={"gray"}
                    leftIcon={
                      <Icon as={MaterialIcons} name="lock" size={"sm"} />
                    }
                    onPress={() => router.replace("cambiarContrasenaDonador")}
                  >
                    Cambiar contraseña
                  </Button>
                  <Button
                    variant={"subtle"}
                    rounded={"full"}
                    colorScheme={"red"}
                    leftIcon={
                      <Icon as={MaterialIcons} name="logout" size={"sm"} />
                    }
                    onPress={() => logoutUser()}
                  >
                    Cerrar sesión
                  </Button>
                </VStack>
              </ScrollView>
            </VStack>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
    justifyContent: "space-between",
    paddingBottom: 30,
  },
});
