import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Benefits from '../../screens/Benefits';
import Personal from '../../screens/Personal';
import PriorApproval from '../../screens/PriorApproval';
import PanelHospitalList from '../../screens/PanelHospitalList';
import Hospitals from '../../screens/Hospitals';
import Helpline from '../../screens/Helpline';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Benefits" component={Benefits} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="PriorApproval" component={PriorApproval} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name="PanelHospitalList" component={PanelHospitalList} />
      <Stack.Screen name="Helpline" component={Helpline} />
    </Stack.Navigator>
  );
};

export default HomeStack;
