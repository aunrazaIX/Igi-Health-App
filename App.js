import React from 'react';
import MainStack from './src/navigation/MainStack';
import {StatusBar, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';
import {COLORS} from './src/assets/theme/colors';

import Toast from 'react-native-toast-message';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const AppContent = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flex: 1,

          backgroundColor: COLORS.loginContainer,
        }}>
        <MainStack />
        <View>
          <ErrorModal />
        </View>
        <Toast />
      </View>
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
