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

export default function editarPerfilBenef() {
  const selectedTab = "editarPerfilBenef";
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserInformation = async () => {
      const token = await AsyncStorage.getItem("userToken");
      try {
        const response = await fetch(
          "https://api-three-kappa-45.vercel.app/users/getMe",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };
    fetchUserInformation();
  }, []);

  const updateUserInformation = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/users/updateMe",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <VStack space={2} m={4} flex={1}>
            <Heading bold size="xl">
              Editar perfil
            </Heading>
            <Divider my={2} />
            <FormControl>
              <VStack>
                <FormControl.Label>
                  URL de la imagen de perfil
                </FormControl.Label>
                <Input
                  w={"100%"}
                  variant="rounded"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="link" />} size={5} ml="2" />
                  }
                  value={user.profilePictureURL}
                  onChangeText={(text) =>
                    setUser({ ...user, profilePictureURL: text })
                  }
                />
              </VStack>
            </FormControl>
            <FormControl pt={6}>
              <VStack>
                <FormControl.Label>Nombre</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                    />
                  }
                  value={user.name}
                  onChangeText={(text) => setUser({ ...user, name: text })}
                />
              </VStack>
            </FormControl>
            <FormControl>
              <VStack>
                <FormControl.Label>Usuario</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="alternate-email" />}
                      size={5}
                      ml="2"
                    />
                  }
                  value={user.username}
                  onChangeText={(text) => setUser({ ...user, username: text })}
                />
              </VStack>
            </FormControl>
            <FormControl pt={6}>
              <VStack>
                <FormControl.Label>Autorización</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="verified-user" />}
                      size={5}
                      ml="2"
                    />
                  }
                  value={clearance(user.clearance)}
                  isReadOnly={true}
                  isDisabled={true}
                />
              </VStack>
            </FormControl>
            <FormControl pt={6}>
              <VStack>
                <FormControl.Label>Teléfono</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="phone" />} size={5} ml="2" />
                  }
                  value={user.phone?.toString()}
                  onChangeText={(text) => setUser({ ...user, phone: text })}
                />
              </VStack>
            </FormControl>
            <FormControl>
              <VStack>
                <FormControl.Label>Correo electrónico</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="email" />} size={5} ml="2" />
                  }
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                />
              </VStack>
            </FormControl>
            <FormControl>
              <VStack>
                <FormControl.Label>Dirección</FormControl.Label>
                <Input
                  variant="rounded"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="location-on" />}
                      size={5}
                      ml="2"
                    />
                  }
                  value={user.address}
                  onChangeText={(text) => setUser({ ...user, address: text })}
                />
              </VStack>
            </FormControl>
            <HStack space={2} alignItems={"flex-end"} flex={1}>
              <Button
                variant="outline"
                colorScheme="info"
                width={"50%"}
                onPress={() => router.replace("/perfilBenef")}
              >
                Cancelar
              </Button>
              <Button
                variant="solid"
                colorScheme="info"
                width={"50%"}
                onPress={() => {
                  updateUserInformation();
                  router.replace("/perfilBenef");
                }}
              >
                Guardar
              </Button>
            </HStack>
          </VStack>
        </View>
      </TouchableWithoutFeedback>
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
