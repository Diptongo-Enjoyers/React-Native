import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { NativeBaseProvider, Button, Input } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStripe } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Choose appropriate icon set
import { useRouter } from "expo-router";

export default function MoneDonador() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [100, 200, 500, 1000];

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value.replace(/[^0-9]/g, ""));
    setSelectedAmount(null);
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleDonate = async () => {
    // Aquí integrarás con Stripe
    const finalAmount = (selectedAmount || customAmount) * 100;
    console.log("Donating:", finalAmount);
    // Lógica para procesar el pago con Stripe
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/payments/intents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.error) {
        console.error("Error fetching payment intent", response.error);
        Alert.alert("Error", response.error);
        return;
      }
      const { error: paymentSheetError } = await initPaymentSheet({
        paymentIntentClientSecret: data.client_secret,
      });
      if (paymentSheetError) {
        console.error("Error initializing payment sheet", paymentSheetError);
        Alert.alert("Error", paymentSheetError);
        return;
      }
      const { error: presentError } = await presentPaymentSheet({
        testEnv: true,
        clientSecret: data.client_secret,
      });
      if (presentError) {
        console.error("Error presenting payment sheet", presentError);
        return;
      }
      console.log("Success");
      Alert.alert("Gracias", "Tu donación ha sido procesada con éxito");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}>
      <NativeBaseProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerBar}>
              <TouchableOpacity
                onPress={() => router.replace("/donacionDonador")}
                style={styles.backButton}
              >
                <Icon name="arrow-back" size={35} color="#0093F2" />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Seleccione un monto para donar</Text>
            <View style={styles.buttonContainer}>
              {amounts.map((amount) => (
                <Button
                  key={amount}
                  onPress={() => handleSelectAmount(amount)}
                  style={[
                    styles.amountButton,
                    selectedAmount === amount && styles.selectedButton,
                  ]}
                >
                  {`$${amount}`}
                </Button>
              ))}
            </View>
            <Text style={styles.orText}>
              O ingrese una cantidad personalizada:
            </Text>
            <Input
              keyboardType="numeric"
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              placeholder=""
              placeholderTextColor="#A6A6A6"
              style={styles.roundedInput}
              textAlign="center"
              fontSize="lg"
              InputLeftElement={<Text style={styles.currencyPrefix}>$</Text>}
            />
            <Button onPress={handleDonate} style={styles.donateButton}>
              Donar
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </NativeBaseProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  orText: {
    fontSize: 18,
    marginVertical: 10,
  },
  donateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  roundedInput: {
    minWidth: 75,
    maxWidth: 75,
    height: 40,
    fontSize: 20,
    textAlign: "center",
  },
  currencyPrefix: {
    fontSize: 20,
    lineHeight: 25,
    color: "#000",
    marginLeft: 12,
  },
});
