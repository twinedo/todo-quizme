import { NavigationContainer } from '@react-navigation/native';
import Navigations from 'navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { TWStyles } from 'twrn-styles';
import 'translations'
import 'react-native-get-random-values';
import { useEffect } from 'react';
import { registerBackgroundFetch } from 'services/background';

export default function App() {
  useEffect(() => {
    requestNotificationPermissions();
    registerBackgroundFetch();
  }, []);

  async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to enable notifications!');
    }
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={TWStyles.flexGrow}>
        <Navigations />
      </SafeAreaView>
    </NavigationContainer>
  );
}
