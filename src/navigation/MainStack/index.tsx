import { createStackNavigator } from '@react-navigation/stack';
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import DrawerStack from '../DrawerStack';
import HomeStack from '../HomeStack';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainStack = () => {
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
    </Stack.Navigator>

  );
};

export default MainStack;
