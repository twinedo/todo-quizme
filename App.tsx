import { NavigationContainer } from '@react-navigation/native';
import Navigations from 'navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TWStyles } from 'twrn-styles';
import 'translations'

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={TWStyles.flexGrow}>
        <Navigations />
      </SafeAreaView>
    </NavigationContainer>
  );
}
