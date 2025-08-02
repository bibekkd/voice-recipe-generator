import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css"
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
      <>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </>
  );
}
