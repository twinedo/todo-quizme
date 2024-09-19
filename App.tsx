import { NavigationContainer } from '@react-navigation/native';
import Navigations from 'navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { TWStyles } from 'twrn-styles';
import 'translations'
import 'react-native-get-random-values';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    requestNotificationPermissions();
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
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
}
