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
  Select,
  CheckIcon
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

export default function editarPerfilDonador() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [selectedRole, setSelectedRole] = useState(user.clearance);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const itemId = await AsyncStorage.getItem("selectedItemId"); // Obtiene el ID del item desde AsyncStorage
      const token = await AsyncStorage.getItem("userToken");

      if (!itemId || !token) {
        console.error("No se encontró el ID del item o el token.");
        return;
      }

      try {
        const response = await fetch(`https://api-three-kappa-45.vercel.app/users/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data); // Actualiza el estado con la información del usuario
        setSelectedRole(data.clearance.toString());
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInformation();
  }, []);

  const handleRoleChange = (newValue) => {
    setSelectedRole(newValue);
    setUser((prevUser) => ({
      ...prevUser,
      clearance: parseInt(newValue, 10), // Asegúrate de que clearance sea un número si así se requiere.
    }));
  };

  const updateUserInformation = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("selectedItemId");
  
    if (!userId || !token) {
      console.error("No se encontró el ID del usuario o el token.");
      return;
    }
  
    // Asegúrate de convertir el valor de selectedRole a número, si clearance en la base de datos es numérico.
    const updatedUser = {
      ...user,
      clearance: parseInt(selectedRole, 10), // Convierte el valor de selectedRole a número
    };
  
    try {
      const response = await fetch(
        `https://api-three-kappa-45.vercel.app/users/${userId}`, // Usa el ID del usuario en la URL
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser), // Envía el usuario actualizado
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      // Puedes querer manejar la respuesta de alguna manera, por ejemplo, informar al usuario que la actualización fue exitosa.
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  };
  
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} flex={1}>
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
                      <Icon
                        as={<MaterialIcons name="link" />}
                        size={5}
                        ml="2"
                      />
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
                    onChangeText={(text) =>
                      setUser({ ...user, username: text })
                    }
                  />
                </VStack>
              </FormControl>
              <FormControl pt={6}>
                <VStack>
                  <FormControl.Label>Autorización</FormControl.Label>
                  <Select
                    selectedValue={selectedRole}
                    minWidth="200"
                    accessibilityLabel="Elige un rol"
                    placeholder="Elige un rol"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={handleRoleChange} // Usa el nuevo manejador aquí.
                  >
                    <Select.Item label="Admin" value="0" />
                    <Select.Item label="Empleado" value="1" />
                    <Select.Item label="Donador" value="2" />
                  </Select>
                </VStack>
              </FormControl>

              <FormControl pt={6}>
                <VStack>
                  <FormControl.Label>Teléfono</FormControl.Label>
                  <Input
                    variant="rounded"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="phone" />}
                        size={5}
                        ml="2"
                      />
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
                      <Icon
                        as={<MaterialIcons name="email" />}
                        size={5}
                        ml="2"
                      />
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
                    onChangeText={(text) =>
                      setUser({ ...user, address: text })
                    }
                  />
                </VStack>
              </FormControl>
              <HStack space={2} alignItems={"flex-end"} pt={6}>
                <Button
                  variant="outline"
                  colorScheme="info"
                  width={"50%"}
                  onPress={() => router.replace("/usuariosAdmin")}
                >
                  Cancelar
                </Button>
                <Button
                  variant="solid"
                  colorScheme="info"
                  width={"50%"}
                  onPress={() => {
                    updateUserInformation();
                    router.replace("/usuariosAdmin");
                  }}
                >
                  Guardar
                </Button>
              </HStack>
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
