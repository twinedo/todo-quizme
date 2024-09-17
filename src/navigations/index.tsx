import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notes } from 'screens';
import HomeBottomMenu from './home-bottom-menu';

const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeBottomMenu" component={HomeBottomMenu} options={{headerShown: false}} />
        <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  )
}

export default Navigations