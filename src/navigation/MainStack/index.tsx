import {createStackNavigator} from '@react-navigation/stack';
import DrawerStack from '../DrawerStack';
import AuthStack from '../AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Home from '../../screens/Home';

const MainStack = () => {
  const {token, user} = useSelector((state: RootState) => state.auth);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!token && !user ? (
        <Stack.Screen name={'AuthStack'} component={AuthStack} />
      ) : (
        <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
