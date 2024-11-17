import { Link, type Href } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { amount } = useLocalSearchParams();
  const items = {
    'Primícia': '/first',
    'Dízimo': '/tithe'
  };

  return (
    <>
      <View style={styles.rootContainer}>
        {Object.entries(items).map(([item, pathname]) => (
          <Link
            key={item}
            asChild
            href={
              ({ pathname, params: { amount } }) as Href
            }
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 8
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
