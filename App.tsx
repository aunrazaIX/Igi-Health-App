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
import {Provider, useDispatch} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';
import {COLORS} from './src/assets/theme/colors';
import {logout} from './src/redux/authSlice';
import NetInfo from '@react-native-community/netinfo';
import {setErrorModal} from './src/redux/generalSlice';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const INACTIVITY_LIMIT = 3 * 60 * 1000;

const AppContent = () => {
  const dispatch = useDispatch();
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      dispatch(logout());
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Session Expired',
          detail:
            'Your session has timed out due to inactivity. Please log in again to continue.',
        }),
      );
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    resetTimer();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connectivity.',
        );
      }
    });
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme} onStateChange={resetTimer}>
      <TouchableWithoutFeedback onPress={resetTimer}>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.loginContainer}}>
          {Platform.OS === 'ios' && (
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={COLORS.loginContainer}
            />
          )}
          <MainStack />
          <View>
            <ErrorModal />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
