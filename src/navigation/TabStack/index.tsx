import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {icons, tabIcons} from '../../assets';
import HomeStack from '../HomeStack';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import PriorApproval from '../../screens/PriorApproval';
import PanelHospitalList from '../../screens/PanelHospitalList';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarIconStyle: {
          marginVertical: vh * 2,
        },

        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tabBarIcon,
                {
                  tintColor: COLORS.black,
                  height: vh * 4,
                  width: vw * 8,
                },
              ]}
              source={tabIcons.home}
            />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tabBarIcon,
                {
                  height: vh * 4,
                  width: vw * 8,
                },
              ]}
              source={tabIcons.note}
            />
          ),
        }}
        name="PriorApproval"
        component={PriorApproval}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tabBarIcon,
                {
                  height: vh * 6,
                  width: vw * 8,
                },
              ]}
              source={tabIcons.PriorApproval}
            />
          ),
        }}
        name="lodge A Claim"
        component={PriorApproval}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tabBarIcon,
                {
                  height: vh * 4,
                  width: vw * 8,
                },
              ]}
              source={tabIcons.customerSupport}
            />
          ),
        }}
        name="customer Support"
        component={PanelHospitalList}
      />
    </Tab.Navigator>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    backgroundColor: 'white',
    borderRadius: vh * 50,
    width: '92%',
    marginHorizontal: vw * 4,
    paddingHorizontal: vw * 4,
    marginVertical: vh * 2,
  },
});
