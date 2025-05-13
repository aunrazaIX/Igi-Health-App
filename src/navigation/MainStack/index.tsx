import {createStackNavigator} from '@react-navigation/stack';
import DrawerStack from '../DrawerStack';
import AuthStack from '../AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const MainStack = () => {
  const {token} = useSelector((state: RootState) => state.auth);

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
      ) : (
        <Stack.Screen name={'AuthStack'} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
