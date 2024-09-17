import { NavigationContainer } from '@react-navigation/native';
import Navigations from 'navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TWStyles } from 'twrn-styles';
import 'translations'
import 'react-native-get-random-values';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={TWStyles.flexGrow}>
        <Navigations />
      </SafeAreaView>
    </NavigationContainer>
  );
}
