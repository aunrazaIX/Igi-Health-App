import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Benefits from '../../screens/Benefits';
import Personal from '../../screens/Personal';
import PriorApproval from '../../screens/PriorApproval';
import PanelHospitalList from '../../screens/PanelHospitalList';
import Hospitals from '../../screens/Hospitals';
import Helpline from '../../screens/Helpline';
import Notification from '../../screens/Notification';
import LodgeClaim from '../../screens/LodgeClaim';
import ForgotPassword from '../../screens/ForgotPassword';
import Settings from '../../screens/Settings';
import Login from '../../screens/Login/Index';
import DependentStack from '../DependentStack';
import ClaimsHistory from '../../screens/ClaimsHistory';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Benefits" component={Benefits} />
      <Stack.Screen name="Personal" component={DependentStack} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name="PanelHospitalList" component={PanelHospitalList} />
      <Stack.Screen name="ClaimHistory" component={ClaimsHistory} />
      <Stack.Screen name="Notifications" component={Notification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default HomeStack;
