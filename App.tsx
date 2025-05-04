import React from 'react';

import ForgotPassword from './src/screens/ForgotPassword';
import Benefits from './src/screens/Benefits';
import Personal from './src/screens/Personal';
import PriorApproval from './src/screens/PriorApproval';
import PriorApprovalUpload from './src/screens/PriorApproval/priorApprovalUpload';

import MainStack from './src/navigation/MainStack';
import {StatusBar, StyleSheet} from 'react-native';
import Home from './src/screens/Home';
import ClaimsHistory from './src/screens/ClaimsHistory';
import Notification from './src/screens/Notification';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Helpline from './src/screens/Helpline';
import Login from './src/screens/Login/Index';
import {COLORS} from './src/assets/theme/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFFE5',
  },
};
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.activeButtonGradient[1]}
      />
      <NavigationContainer theme={MyTheme}>
        <MainStack />
        {/* <Login /> */}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
