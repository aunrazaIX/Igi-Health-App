import React from 'react';
import MainStack from './src/navigation/MainStack';
import { StatusBar, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar
            translucent
            barStyle={'light-content'}
            backgroundColor={'transparent'}
          />
          <MainStack />
          <View>
            <ErrorModal />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
