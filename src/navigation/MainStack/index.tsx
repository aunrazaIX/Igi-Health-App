import { createStackNavigator } from '@react-navigation/stack';
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import DrawerStack from '../DrawerStack';
import HomeStack from '../HomeStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStack from '../AuthStack';
import { useSelector } from 'react-redux'
import { clampRGBA } from 'react-native-reanimated/lib/typescript/Colors';


const MainStack = () => {

  const token = useSelector((state) => state.auth.token)



  const Stack = createStackNavigator();
  return (

    <Stack.Navigator
     
      screenOptions={{ headerShown: false }}>

      {token ? <Stack.Screen name={'DrawerStack'} component={DrawerStack} /> : <Stack.Screen name={'AuthStack'} component={AuthStack} />}





    </Stack.Navigator>

  );
};

export default MainStack;
