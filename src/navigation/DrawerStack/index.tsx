import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const DrawerStack = () => {
  const drawer = createDrawerNavigator();
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default DrawerStack;
