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
    VStack,
    Icon,
    Heading,
    Input,
    FormControl,
    HStack,
    Button,
    KeyboardAvoidingView,
    Select,
    CheckIcon
} from "native-base";

export default function verPerfilDonador() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [selectedRole, setSelectedRole] = useState(user.clearance);

    useEffect(() => {
        const fetchUserInformation = async () => {
            const itemId = await AsyncStorage.getItem("selectedItemId");
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
                setUser(data);
                setSelectedRole(data.clearance.toString());
            } catch (error) {
                console.error("Error al obtener la información del usuario:", error);
            }
        };

        fetchUserInformation();
    }, []);

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
                                        isReadOnly={true}
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
                                        isReadOnly={true}
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
                                        isReadOnly={true}
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
                                        isDisabled={true}
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
                                        isReadOnly={true}
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
                                        isReadOnly={true}
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
                                        isReadOnly={true}
                                    />
                                </VStack>
                            </FormControl>
                            <HStack space={2} alignItems={"flex-end"} pt={6}>
                                <Button
                                    variant="outline"
                                    colorScheme="info"
                                    width={"100%"}
                                    onPress={() => router.replace("/usuariosAdmin")}
                                >
                                    Cancelar
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
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 30,
    },
});
