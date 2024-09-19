import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';

export async function onDisplayNotification(title?: string, body?: string, data?: {id?: string}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds: 1 },
  });

  Toast.show({
    type: 'success',
    text1: title,
    text2: body
  });
}
