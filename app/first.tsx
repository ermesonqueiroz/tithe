import { Pix } from "@/domain/pix";
import { formatCurrency } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-toast-message";

export default function FirstFruitsScreen() {
  const insets = useSafeAreaInsets();
  const { amount } = useLocalSearchParams();

  const { firstFruitsAmount, payload } = useMemo(() => {
    const firstFruitsAmount = Number(amount) * 0.03;
    const pix = new Pix({
      key: '09606704327',
      amount: firstFruitsAmount,
      merchantCity: 'FORTALEZA',
      merchantName: 'Ermeson S Queiroz',
      referenceLabel: '***'
    });

    return {
      firstFruitsAmount,
      payload: pix.getPayload()
    }
  }, [amount]);

  async function handleCopyPayload() {
    await Clipboard.setStringAsync(payload);

    Toast.show({
      type: 'success',
      text1: 'Chave PIX copiada!',
      text2: 'Agora basta colar essa chave no seu aplicativo do banco 🙏'
    });
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <Text style={styles.title}>
          {formatCurrency(firstFruitsAmount)}
        </Text>

        <QRCode
          value={payload}
          size={200}
        />
      </View>

      <TouchableOpacity
        style={{
          ...styles.button,
          bottom: insets.bottom + 20
        }}
        activeOpacity={0.8}
        onPress={handleCopyPayload}
      >
        <Text style={styles.buttonText}>Copiar chave PIX</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f1f2f9'
  },
  button: {
    width: '90%',
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
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
