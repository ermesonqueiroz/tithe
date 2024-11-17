import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Início' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
        <Stack.Screen name="first" options={{ title: 'Primícia' }} />
        <Stack.Screen name="tithe" options={{ title: 'Dízimo' }} />
      </Stack>

      <StatusBar style="auto" />
      <Toast topOffset={insets.top + 60} />
    </ThemeProvider>
  );
}
