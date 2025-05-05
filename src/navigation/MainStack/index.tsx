import { createStackNavigator } from '@react-navigation/stack';
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import DrawerStack from '../DrawerStack';
import HomeStack from '../HomeStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStack from '../AuthStack';

const MainStack = () => {
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator
    initialRouteName={'AuthStack'}
    screenOptions={{headerShown: false}}>
      
      <Stack.Screen name={'AuthStack'} component={AuthStack} />
      <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
    </Stack.Navigator>

  );
};

export default MainStack;
