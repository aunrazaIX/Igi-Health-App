import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image, View, TouchableWithoutFeedback} from 'react-native';
import {icons, tabIcons} from '../../assets';
import HomeStack from '../HomeStack';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import PriorApproval from '../../screens/PriorApproval';
import PanelHospitalList from '../../screens/PanelHospitalList';
import Helpline from '../../screens/Helpline';
import LinearGradient from 'react-native-linear-gradient';
import LodgeClaim from '../../screens/LodgeClaim';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: {
          paddingVertical: vh * 1,
        },

        headerShown: false,
        tabBarIconStyle: {
          marginVertical: vh * 2,
        },

        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <Image
                  style={[styles.iconStyle, {tintColor: 'white'}]}
                  source={tabIcons.home}
                />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Image
                  style={[styles.iconStyle, {tintColor: 'black'}]}
                  source={tabIcons.home}
                />
              </View>
            ),
        }}
        name="HomeStack"
        component={HomeStack}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <Image
                  style={[styles.iconStyle, {tintColor: 'white'}]}
                  source={tabIcons.note}
                />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Image style={styles.iconStyle} source={tabIcons.note} />
              </View>
            ),
        }}
        name="PriorApproval"
        component={PriorApproval}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <Image
                  style={[
                    styles.iconStyle,
                    {tintColor: 'white', height: vh * 5, width: vw * 9},
                  ]}
                  source={tabIcons.PriorApproval}
                />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Image
                  style={[styles.iconStyle, {height: vh * 5, width: vw * 7}]}
                  source={tabIcons.PriorApproval}
                />
              </View>
            ),
        }}
        name="lodge A Claim"
        component={LodgeClaim}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <Image
                  style={[styles.iconStyle, {tintColor: 'white'}]}
                  source={tabIcons.customerSupport}
                />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Image
                  style={styles.iconStyle}
                  source={tabIcons.customerSupport}
                />
              </View>
            ),
        }}
        name="customer Support"
        component={Helpline}
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
    height: vh * 10,
    marginHorizontal: vw * 4,
    paddingHorizontal: vw * 2,
    marginVertical: vh * 2,
  },
  iconContainer: {
    padding: vh * 1,
    borderRadius: vh * 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gradientBorder: {
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 2.5,
    borderRadius: vh * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: vh * 4,
    width: vw * 9,
  },
  iconStyleLarge: {
    height: vh * 6,
    width: vw * 8,
  },
});
