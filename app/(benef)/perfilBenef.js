import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import BottomTabBarBenef from "../../Components/BottomTabBarBenef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Divider,
  Avatar,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  Box,
  Heading,
  Fab,
  IconButton,
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

export default function perfilBenef() {
  const selectedTab = "perfilBenef";
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

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <VStack space={2} m={4} flex={1}>
          <HStack justifyContent="space-between" p={0} m={0}>
            <Heading bold size="xl">
              Perfil
            </Heading>
            <IconButton
              m={0}
              p={0}
              icon={
                <Icon
                  as={MaterialIcons}
                  name="settings"
                  size={"2xl"}
                  color={"gray.500"}
                />
              }
              onPress={() => router.replace("configuracionBenef")}
            />
          </HStack>
          <Divider my={2} />
          <HStack space={2} alignItems="center">
            <Avatar
              size="xl"
              source={{
                uri: user.profilePictureURL,
              }}
              mr={4}
            >
              <Avatar.Badge bg="green.500" />
            </Avatar>
            <VStack space={1} flex={1}>
              <Text bold fontSize="2xl">
                {user.name}
              </Text>
              <Text bold fontSize="lg" color={"gray.500"}>
                {"@" + user.username}
              </Text>
            </VStack>
          </HStack>
          <Badge
            mt={2}
            py={2}
            rounded={"md"}
            variant={"solid"}
            colorScheme={"info"}
          >
            {clearance(user.clearance)}
          </Badge>
          <Box rounded={"lg"} overflow={"hidden"} mt={2} p={2} bg={"gray.100"}>
            <Text fontSize="md" bold color={"gray.500"}>
              Información de contacto
            </Text>
            <HStack space={2} alignItems="center" mt={1}>
              <Icon
                as={<FontAwesome name="phone" />}
                size="md"
                color="gray.500"
              />
              <Text fontSize="lg" color={"gray.500"}>
                {user.phone}
              </Text>
            </HStack>
            <HStack space={2} alignItems="center" mt={1}>
              <Icon as={<Entypo name="mail" />} size="md" color="gray.500" />
              <Text fontSize="lg" color={"gray.500"}>
                {user.email}
              </Text>
            </HStack>
            <HStack space={2} alignItems="center" mt={1}>
              <Icon
                as={<Ionicons name="location-sharp" />}
                size="md"
                color="gray.500"
              />
              <Text fontSize="lg" color={"gray.500"}>
                {user.address}
              </Text>
            </HStack>
          </Box>
          <Fab
            renderInPortal={false}
            shadow={2}
            right={0}
            bottom={0}
            size="dm"
            colorScheme="info"
            icon={
              <Icon color="white" as={MaterialIcons} name="edit" size="4" />
            }
            label="Editar perfil"
            onPress={() => router.replace("editarPerfilBenef")}
          />
        </VStack>
        <BottomTabBarBenef selectedTab={selectedTab} />
      </View>
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
