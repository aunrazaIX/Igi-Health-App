import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { tabIcons } from '../../assets';
import HomeStack from '../HomeStack';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import PriorApproval from '../../screens/PriorApproval';
import Helpline from '../../screens/Helpline';
import LinearGradient from 'react-native-linear-gradient';
import LodgeClaimStack from '../LodgeClaimStack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        popToTopOnBlur: true,
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
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, { tintColor: 'white' }]}
                    source={tabIcons.home}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={[styles.iconStyle, { tintColor: 'black' }]}
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
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, { tintColor: 'white' }]}
                    source={tabIcons.note}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image style={styles.iconStyle} source={tabIcons.note} />
              </View>
            ),
        }}
        name="PriorApproval"
        initialParams={{ type: "priorApproval" }}
        component={LodgeClaimStack}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, { tintColor: 'white' }]}
                    source={tabIcons.PriorApproval}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={[styles.iconStyle]}
                  source={tabIcons.PriorApproval}
                />
              </View>
            ),
        }}
        name="LodgeClaim"
        component={LodgeClaimStack}
      />

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, { tintColor: 'white' }]}
                    source={tabIcons.customerSupport}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={styles.iconStyle}
                  source={tabIcons.customerSupport}
                />
              </View>
            ),
        }}
        name="Helpline"
        component={Helpline}
      />
    </Tab.Navigator>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: vh * 2,
    backgroundColor: COLORS.white,
    borderRadius: vh * 50,
    height: vw * 22,
    marginHorizontal: vw * 6,
    paddingHorizontal: vw * 2,
    elevation: 3,
  },
  iconContainer: {
    padding: vh * 1,
    borderRadius: vh * 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  gradientBorder: {
    borderRadius: vh * 50,
  },
  wrapper: {
    paddingHorizontal: vw * 4,
    paddingVertical: vw * 6,
    borderRadius: (vw * 25) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: vw * 9,
    width: vw * 9,
    resizeMode: 'contain',
  },
  iconStyleLarge: {
    height: vw * 8,
    width: vw * 8,
    resizeMode: 'contain',
  },
});
