import {createStackNavigator} from '@react-navigation/stack';
import DrawerStack from '../DrawerStack';
import AuthStack from '../AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Home from '../../screens/Home';
import {useEffect} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {setErrorModal} from '../../redux/generalSlice';

const MainStack = () => {
  const dispatch = useDispatch();
  const {token, user} = useSelector((state: RootState) => state.auth);
  const Stack = createStackNavigator();

  useEffect(() => {
    EventRegister.addEventListener('aun', () => {
      console.log('ASDSADSA3213123');

      dispatch(
        setErrorModal({
          show: true,
          message: 'No Internet Connection',
          detail: 'Please check your network and try again.',
        }),
      );
    });
  }, []);

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
