import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Benefits from '../../screens/Benefits';

const Drawer = createDrawerNavigator();

const DrawerContent = () => {

}

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: styles.container,
      }}
      initialRouteName="Benefits"
    >
      <Drawer.Screen name="Benefits" component={Benefits} />
    </Drawer.Navigator>
  )
}

export default DrawerStack

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'red'
  }
})