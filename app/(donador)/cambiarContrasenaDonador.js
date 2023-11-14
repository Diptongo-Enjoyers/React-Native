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

export default function cambiarContrasenaDonador() {
  const selectedTab = "cambiarContrasenaDonador";
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [contrasenaNuevaConfirmacion, setContrasenaNuevaConfirmacion] =
    useState("");

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
                  Cambiar contraseña
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
                  onPress={() => router.replace("configuracionDonador")}
                />
              </HStack>
              <Divider my={2} />
              <ScrollView>
                <VStack space={4} flex={1}>
                  <FormControl>
                    <FormControl.Label>Contraseña actual</FormControl.Label>
                    <Input
                      type={show ? "text" : "password"}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                          />
                        </Pressable>
                      }
                      variant="rounded"
                      value={contrasenaActual}
                      onChangeText={(text) => setContrasenaActual(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Contraseña nueva</FormControl.Label>
                    <Input
                      type={show ? "text" : "password"}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                          />
                        </Pressable>
                      }
                      variant="rounded"
                      value={contrasenaNueva}
                      onChangeText={(text) => setContrasenaNueva(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>
                      Confirmar contraseña nueva
                    </FormControl.Label>
                    <Input
                      type={show ? "text" : "password"}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                          />
                        </Pressable>
                      }
                      variant="rounded"
                      value={contrasenaNuevaConfirmacion}
                      onChangeText={(text) =>
                        setContrasenaNuevaConfirmacion(text)
                      }
                    />
                  </FormControl>
                  <Button
                    onPress={() => {}}
                    colorScheme="primary"
                    _text={{ color: "white" }}
                  >
                    Guardar cambios
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
