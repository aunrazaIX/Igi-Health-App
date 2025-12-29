import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Benefits from '../../screens/Benefits';
import PanelHospitalList from '../../screens/PanelHospitalList';
import Hospitals from '../../screens/Hospitals';
import Notification from '../../screens/Notification';
import ForgotPassword from '../../screens/ForgotPassword';
import Login from '../../screens/Login/Index';
import DependentStack from '../DependentStack';
import ClaimsHistory from '../../screens/ClaimsHistory';
import PriorApprovalHistory from '../../screens/PriorApprovalHistory';
import AccountDetails from '../../screens/AccountDetails';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Benefits" component={Benefits} />
      <Stack.Screen name="PersonalStack" component={DependentStack} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name="PanelHospitalList" component={PanelHospitalList} />
      <Stack.Screen name="ClaimHistory" component={ClaimsHistory} />
      <Stack.Screen
        name="PriorApprovalHistory"
        component={PriorApprovalHistory}
      />
      <Stack.Screen name="Notifications" component={Notification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default HomeStack;
