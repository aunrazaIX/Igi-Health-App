import React, {useRef, useEffect} from 'react';
import MainStack from './src/navigation/MainStack';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';
import {COLORS} from './src/assets/theme/colors';
import {logout} from './src/redux/authSlice';

import {setErrorModal} from './src/redux/generalSlice';
import NetInfo from '@react-native-community/netinfo';
import {EventRegister} from 'react-native-event-listeners';
import {vh} from './src/assets/theme/dimension';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const INACTIVITY_LIMIT = 3 * 60 * 1000;

const AppContent = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const timer = useRef(null);

  // const resetTimer = () => {
  //   if (!user) return;

  //   if (timer.current) clearTimeout(timer.current);
  //   timer.current = setTimeout(() => {
  //     dispatch(logout());
  //     dispatch(
  //       setErrorModal({
  //         Show: true,
  //         message: 'Session Expired',
  //         detail:
  //           'Your session has timed out due to inactivity. Please log in again to continue.',
  //       }),
  //     );
  //   }, INACTIVITY_LIMIT);
  // };

  // useEffect(() => {
  //   if (!user) return;
  //   resetTimer();

  //   return () => {
  //     if (timer.current) clearTimeout(timer.current);
  //   };
  // }, [user]);
  829;
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor: COLORS.loginContainer,
        }}>
        <MainStack />
        <View>
          <ErrorModal />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContent />
    </PersistGate>
  </Provider>
);

export default App;
