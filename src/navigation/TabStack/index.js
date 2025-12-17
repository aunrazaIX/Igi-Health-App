/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {tabIcons} from '../../assets';
import HomeStack from '../HomeStack';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import Helpline from '../../screens/Helpline';
import LinearGradient from 'react-native-linear-gradient';
import LodgeClaimStack from '../LodgeClaimStack';
import {AileronRegular} from '../../components';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, icon, tintBlack = COLORS.black, large}) => {
  const sizeStyle = large ? styles.iconStyleLarge : styles.iconStyle;

  if (focused) {
    return (
      <LinearGradient
        colors={COLORS.bottomTabSelectedTabColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBorder}>
        <View style={styles.wrapper}>
          <Image style={[sizeStyle, {tintColor: COLORS.white}]} source={icon} />
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.gradientBorder, styles.wrapper]}>
      <Image style={[sizeStyle, {tintColor: tintBlack}]} source={icon} />
    </View>
  );
};

const TabLabel = ({title}) => (
  <AileronRegular
    style={{color: COLORS.black, fontSize: vw * 2.4, marginTop: vh * 0.5}}
    name={title}
  />
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        popToTopOnBlur: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: {marginVertical: vh * 0.8},
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: () => <TabLabel title="Home" />,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={tabIcons.PriorApproval} />
          ),
        }}
      />

      <Tab.Screen
        name="PriorApproval"
        initialParams={{type: 'priorApproval'}}
        component={LodgeClaimStack}
        options={{
          tabBarLabel: () => <TabLabel title="Prior Approval" />,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={tabIcons.PriorApproval} />
          ),
        }}
      />

      <Tab.Screen
        name="Helpline"
        component={Helpline}
        options={{
          tabBarLabel: () => <TabLabel title="Helpline" />,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={tabIcons.customerSupport} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: vh * 1.5,
    backgroundColor: COLORS.white,
    elevation: 0,
    borderWidth: 1,
    marginHorizontal: vw * 2,
    borderRadius: vw * 10,
    height: vw * 20,
  },
  gradientBorder: {
    borderRadius: vh * 50,
    marginTop: vh,
    marginBottom: vh * 0.5,
  },

  wrapper: {
    paddingHorizontal: vw * 2.2,
    paddingVertical: vw * 2.2,
    borderRadius: (vw * 25) / 2,
  },

  iconStyle: {
    height: vw * 6.2,
    width: vw * 6.2,
    resizeMode: 'contain',
  },

  iconStyleLarge: {
    height: vw * 8,
    width: vw * 8,
    resizeMode: 'contain',
  },
});
