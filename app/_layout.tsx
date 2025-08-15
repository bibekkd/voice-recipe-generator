import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthInitializer } from '../components/AuthInitializer';
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthInitializer>
      <Stack initialRouteName="(onboarding)">
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthInitializer>
  );
}
