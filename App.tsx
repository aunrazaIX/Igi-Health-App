import React from 'react';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import Benefits from './src/screens/Benefits';
import Personal from './src/screens/Personal';
import PriorApproval from './src/screens/PriorApproval';
import PriorApprovalUpload from './src/screens/PriorApproval/priorApprovalUpload';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import Home from './src/screens/Home';
import ClaimsHistory from './src/screens/ClaimsHistory';
import Notification from './src/screens/Notification';


const App = () => {
  return (
    <NavigationContainer>
      {/* <MainStack/> */}
      <Notification />
    </NavigationContainer>
  )

};

export default App;
