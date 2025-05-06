import React from 'react';
import MainStack from './src/navigation/MainStack';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { COLORS } from './src/assets/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFFE5',
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>


          <StatusBar
            backgroundColor={COLORS.activeButtonGradient[1]}
            barStyle="dark-content"
          />
          <NavigationContainer theme={MyTheme}>
            <MainStack />
            {/* <Login /> */}
          </NavigationContainer>

        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
