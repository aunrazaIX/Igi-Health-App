import React from 'react';
import MainStack from './src/navigation/MainStack';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';
import {COLORS} from './src/assets/theme/colors';

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
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: COLORS.loginContainer,
              // paddingTop:
              // Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}>
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
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
