import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChefDetail, RecipeDetail, Registration, Survey } from 'screens';
import HomeBottomMenu from './home-bottom-menu';

const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeBottomMenu" component={HomeBottomMenu} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default Navigations