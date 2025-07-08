/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {tabIcons} from '../../assets';
import HomeStack from '../HomeStack';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import PriorApproval from '../../screens/PriorApproval';
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
        popToTopOnBlur: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: {
          // paddingVertical: vh * 1,
          // alignItems: 'center',
          // borderWidth: 2,
          // paddingTop: vh * 0.5,
          // paddingBottom: vh * 3,
        },
        headerShown: false,
        tabBarIconStyle: {
          marginVertical: vh * 0.8,
        },
        tabBarHideOnKeyboard: true,
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
                style={{color: 'black', fontSize: vw * 3, lineHeight: vh * 2}}
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
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: vw * 3,

                      marginTop: 2,
                    }}>
                    Home
                  </Text> */}
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={[styles.iconStyle, {tintColor: 'black'}]}
                  source={tabIcons.home}
                />
                {/* <Text
                  style={{color: 'black', fontSize: 12, marginTop: vh * 0.2}}>
                  Home
                </Text> */}
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
                    color: focused ? 'black' : 'black',
                    fontSize: vw,
                  }}>
                  Prior Approval
                </AileronRegular>

                <AileronRegular
                  name="Prior Approval"
                  style={{color: 'black', fontSize: vw * 3, lineHeight: vh * 2}}
                />
              </View>
            ),
            popToTopOnBlur: true,
            // tabBarStyle: {display: 'none'},
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
                    <Text style={{color: 'white', fontSize: vw * 3}}>
                      Prior Approval
                    </Text>
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.gradientBorder, styles.wrapper]}>
                  <Image style={styles.iconStyleprior} source={tabIcons.note} />
                  {/* <Text style={{color: 'black', fontSize: 12, marginTop: 2}}>
                    Prior Approval
                  </Text> */}
                </View>
              ),
          }}
          name="PriorApproval"
          initialParams={{type: 'priorApproval'}}
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
                Lodge Claim
              </AileronRegular>

              <AileronRegular
                name="Lodge Claim"
                style={{color: 'black', fontSize: vw * 3, lineHeight: vh * 2}}
              />
            </View>
          ),
          popToTopOnBlur: true,
          // tabBarStyle: {display: 'none'},
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
                  {/* <Text style={{color: 'white', fontSize: 12, marginTop: 2}}>
                    Lodge Claim
                  </Text> */}
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={[styles.iconStyle]}
                  source={tabIcons.PriorApproval}
                />
                {/* <Text style={{color: 'black', fontSize: 12, marginTop: 2}}>
                  Lodge Claim
                </Text> */}
              </View>
            ),
        }}
        initialParams={{type: 'lodgeClaim'}}
        name="LodgeClaim"
        component={LodgeClaimStack}
      />

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
                style={{color: 'black', fontSize: vw * 3, lineHeight: vh * 2}}
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
                  {/* <Text style={{color: 'white', fontSize: 12, marginTop: 2}}>
                    Helpline
                  </Text> */}
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.gradientBorder, styles.wrapper]}>
                <Image
                  style={styles.iconStyle}
                  source={tabIcons.customerSupport}
                />
                {/* <Text style={{color: 'black', fontSize: 12, marginTop: 2}}>
                  Helpline
                </Text> */}
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
    // paddingHorizontal: vw * 1.2,
    elevation: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // borderColor: COLORS.white,
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
    // borderWidth: 2,
    // alignItems: 'center',
    marginTop: vh,
    marginBottom: vh * 0.5,
  },
  wrapper: {
    paddingHorizontal: vw * 2.2,
    paddingVertical: vw * 2.2,
    borderRadius: (vw * 25) / 2,
    // justifyContent: 'center',
    // alignItems: 'center',
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
