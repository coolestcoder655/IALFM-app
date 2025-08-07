import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocationProvider } from '@/context/locationContext';
import { PrayerTimesProvider } from '@/context/prayerTimesContext';

import { useColorScheme } from '@/components/useColorScheme';
import { InternetProvider } from '@/context/internetContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Force hide splash screen after maximum timeout to prevent infinite loading
setTimeout(() => {
  SplashScreen.hideAsync().catch(console.error);
}, 10000); // 10 second maximum timeout

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      // Don't throw error, just log it and continue
    }
  }, [error]);

  useEffect(() => {
    if (loaded || error) { // Hide splash even if font loading fails
      const hideSplash = async () => {
        try {
          await SplashScreen.hideAsync();
        } catch (splashError) {
          console.error('Error hiding splash screen:', splashError);
        }
      };

      // Add small delay to ensure app is ready
      setTimeout(hideSplash, 100);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <InternetProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <LocationProvider>
            <PrayerTimesProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="is-offline"
                  options={{
                    title: 'Offline',
                    headerShown: false,
                    presentation: 'modal',
                  }}
                />
              </Stack>
            </PrayerTimesProvider>
          </LocationProvider>
        </ThemeProvider>
      </InternetProvider>
    </SafeAreaProvider>
  );
}
