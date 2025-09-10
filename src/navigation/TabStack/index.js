/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {tabIcons} from '../../assets';
import HomeStack from '../HomeStack';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

import Helpline from '../../screens/Helpline';
import LinearGradient from 'react-native-linear-gradient';
import LodgeClaimStack from '../LodgeClaimStack';
import {useSelector} from 'react-redux';
import {AileronRegular} from '../../components';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        popToTopOnBlur: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: {},
        headerShown: false,
        tabBarIconStyle: {
          marginVertical: vh * 0.8,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <AileronRegular
                style={{
                  color: focused ? 'black' : 'black',

                  fontSize: vw,
                }}>
                Home
              </AileronRegular>

              <AileronRegular
                name="Home"
                style={{
                  color: 'black',
                  fontSize: vw * 2.4,
                }}
              />
            </View>
          ),
          popToTopOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, {tintColor: 'white'}]}
                    source={tabIcons.home}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
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
      {user?.showPriorApproval && (
        <Tab.Screen
          options={{
            tabBarShowLabel: true,
            tabBarLabel: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <AileronRegular
                  style={{
                    color: 'black',
                    fontSize: vw,
                  }}>
                  P Approval
                </AileronRegular>
                <AileronRegular
                  name="Prior Approval"
                  style={{
                    color: 'black',
                    fontSize: vw * 2.4,
                  }}
                />
              </View>
            ),
            popToTopOnBlur: true,
            tabBarIcon: ({focused}) =>
              focused ? (
                <LinearGradient
                  colors={['#48C3FF', '#0B4A98']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.gradientBorder}>
                  <View style={styles.wrapper}>
                    <Image
                      style={[styles.iconStyle, {tintColor: 'white'}]}
                      source={tabIcons.PriorApproval}
                    />
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.gradientBorder, styles.wrapper]}>
                  <Image
                    style={styles.iconStyleprior}
                    source={tabIcons.PriorApproval}
                  />
                </View>
              ),
          }}
          name="PriorApproval"
          initialParams={{type: 'priorApproval'}}
          component={LodgeClaimStack}
        />
      )}

      {user?.coverageType?.some(obj => obj?.isAllowed === true) && (
        <Tab.Screen
          options={{
            tabBarShowLabel: true,
            tabBarLabel: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <AileronRegular
                  style={{
                    color: focused ? 'black' : 'black',
                    fontSize: vw,
                  }}>
                  Lodge Claim
                </AileronRegular>

                <AileronRegular
                  name="Lodge Claim"
                  style={{
                    color: 'black',
                    fontSize: vw * 2.4,
                    lineHeight: vh * 2,
                  }}
                />
              </View>
            ),
            popToTopOnBlur: true,
            tabBarIcon: ({focused}) =>
              focused ? (
                <LinearGradient
                  colors={['#48C3FF', '#0B4A98']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.gradientBorder}>
                  <View style={styles.wrapper}>
                    <Image
                      style={[styles.iconStyle, {tintColor: 'white'}]}
                      source={tabIcons.note}
                    />
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.gradientBorder, styles.wrapper]}>
                  <Image style={[styles.iconStyle]} source={tabIcons.note} />
                </View>
              ),
          }}
          initialParams={{type: 'lodgeClaim'}}
          name="LodgeClaim"
          component={LodgeClaimStack}
        />
      )}

      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <AileronRegular
                style={{
                  color: focused ? 'black' : 'black',
                  fontSize: vw,
                }}>
                Helpline
              </AileronRegular>
              <AileronRegular
                name="Helpline"
                style={{color: 'black', fontSize: vw * 2.4}}
              />
            </View>
          ),
          popToTopOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <View style={styles.wrapper}>
                  <Image
                    style={[styles.iconStyle, {tintColor: 'white'}]}
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
    bottom: vh * 1.5,
    backgroundColor: COLORS.white,
    borderRadius: vh * 50,
    height: vw * 20,

    marginHorizontal: vw * 6,
    elevation: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
  iconStyleprior: {
    height: vw * 6.8,
    width: vw * 7,
    resizeMode: 'contain',
  },
  iconStyleLarge: {
    height: vw * 8,
    width: vw * 8,
    resizeMode: 'contain',
  },
});
