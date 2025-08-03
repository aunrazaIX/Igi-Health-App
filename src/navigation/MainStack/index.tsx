import {createStackNavigator} from '@react-navigation/stack';
import DrawerStack from '../DrawerStack';
import AuthStack from '../AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {setErrorModal} from '../../redux/generalSlice';
import {getApp} from '@react-native-firebase/app';
import {getMessaging, onMessage} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const MainStack = () => {
  const dispatch = useDispatch();
  const {token, user} = useSelector((state: RootState) => state.auth);
  const Stack = createStackNavigator();

  useEffect(() => {
    EventRegister.addEventListener('aun', () => {
      dispatch(
        setErrorModal({
          show: true,
          message: 'No Internet Connection',
          detail: 'Please check your network and try again.',
        }),
      );
    });
    const app = getApp();
    const messaging = getMessaging(app);
    const unsubscribe = onMessage(messaging, remoteMessage => {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: remoteMessage?.notification?.body,
      });
    });
    return unsubscribe;
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
