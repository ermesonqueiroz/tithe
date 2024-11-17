import { formatCurrency } from "@/utils";
import { Link } from "expo-router";
import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState(0);

  function handleAmountChange(value: string) {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue) {
      const numericValue = parseFloat(sanitizedValue) / 100;
      setAmount(numericValue);
      return;
    }

    setAmount(0);
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleAmountChange}
          value={formatCurrency(amount)}
        />
      </View>

      <Link
        asChild
        href={{
          pathname: '/checkout',
          params: { amount }
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            bottom: insets.bottom + 20
          }}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f1f2f9'
  },
  button: {
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    margin: 20,
    borderRadius: 16
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold'
  }
});