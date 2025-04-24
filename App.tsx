import React from 'react';
import Login from './src/screens/Login/Index';
import ForgotPassword from './src/screens/ForgotPassword';
import Benefits from './src/screens/Benefits';
import Personal from './src/screens/Personal';
import PriorApproval from './src/screens/PriorApproval';
import PriorApprovalUpload from './src/screens/PriorApproval/priorApprovalUpload';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor="transparent"
          />
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaView>
  )

};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

