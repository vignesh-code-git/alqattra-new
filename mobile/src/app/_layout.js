import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

/**
 * Root navigator. Every screen draws its own iOS-style navigation bar, so the
 * native header is off. Pushes use the iOS slide-over transition on Android
 * too, so the app moves the same way on both platforms.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'ios_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="select-offer" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
