import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { History, Home, Notifications, User } from 'screens';
import { useEffect, useMemo, useRef, useState } from 'react';
import { styles } from './home-bottom-menu.style';
import { TWColors, TWStyles } from 'twrn-styles';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Platform, View } from 'react-native';
import { FloatingActionButton } from 'twrn-components';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { NavParam } from 'navigations/navigations.type';
import todoStore from 'stores/todo';
import notifee from '@notifee/react-native';

import * as Notify from 'expo-notifications';

const Tab = createMaterialTopTabNavigator();

Notify.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const HomeBottomMenu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParam, 'Home'>>()
  const [widthAnim, setWidthAnim] = useState(false);
  const onSetSelectedToto = todoStore(state => state.onSetSelectedTodo)
  
  const swipeStart = () => setWidthAnim(true);
  const swipeEnd = () => setWidthAnim(false);
  const tabPress = () => {
    setWidthAnim(true);
    setTimeout(() => {
      setWidthAnim(false)
    }, 500);
  }
  
  const menu = useMemo(() => [
    {
      id: '1',
      name: 'Home',
      component: Home,
      tabBarIcon: (color: string) => <Feather name="list" size={24} color={color} />,
    },
    {
      id: '2',
      name: 'History',
      component: History,
      tabBarIcon: (color: string) => <MaterialCommunityIcons name="clock-time-four-outline" size={24} color={color} />,
    },
    {
      id: '3',
      name: 'Notifications',
      component: Notifications,
      tabBarIcon: (color: string) => <SimpleLineIcons name="bell" size={24} color={color} />,
    },
    {
      id: '4',
      name: 'User',
      component: User,
      tabBarIcon: (color: string) => <Octicons name="person" size={24} color={color} />,
    }
  ], [])
  
  const [channels, setChannels] = useState<Notify.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notify.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notify.Subscription>();
  const responseListener = useRef<Notify.Subscription>();

  useEffect(() => {

    if (Platform.OS === 'android') {
      Notify.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notify.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notify.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notify.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notify.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notify.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: { seconds: 2 },
    });
  }

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={[TWStyles.flexGrow, TWStyles.relative]}>
    <Tab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
        tabBarIndicatorStyle: {
          ...styles.tabBarIndicatorStyle,
          height: widthAnim ? 8 : 4,
          width: widthAnim ? 25 : 60,
          borderRadius: widthAnim ? 25 : 4,
          left: widthAnim ? '10%' : '6%',
          right: widthAnim ? '10%' : '6%',
        },
        tabBarInactiveTintColor: TWColors.GREYB11,
        tabBarActiveTintColor: '#5A91FF',
      }}
    >
      {menu?.map(item => (
        <Tab.Screen 
          key={item.id}
          name={item.name}
          component={item.component} 
          options={{
            tabBarIcon: ({color}) => item.tabBarIcon(color),
            tabBarShowLabel: false,
          }}
          listeners={({swipeStart, swipeEnd, tabPress})}
        />
      ))}
    </Tab.Navigator>
    <FloatingActionButton 
      position='bottom-center'
      containerStyle={{elevation: 10, bottom: 30}}
      backgroundColor="#5A91FF"
      onPress={async () => {
        onSetSelectedToto?.(null)
        await schedulePushNotification()
        // navigation.navigate('Notes', {type: 'create'})
      }}
    >
      <FontAwesome6 name="plus" size={24} color={TWColors.WHITE}/>
    </FloatingActionButton>
    </View>
  )
}

export default HomeBottomMenu