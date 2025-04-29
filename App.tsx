import React from 'react';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import Benefits from './src/screens/Benefits';
import Personal from './src/screens/Personal';
import PriorApproval from './src/screens/PriorApproval';
import PriorApprovalUpload from './src/screens/PriorApproval/priorApprovalUpload';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import ClaimsHistory from './src/screens/ClaimsHistory';
import Notification from './src/screens/Notification';
import Helpline from './src/screens/Helpline';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
      {/* <Helpline /> */}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

