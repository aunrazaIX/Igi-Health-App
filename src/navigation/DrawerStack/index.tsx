/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../screens/Home';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {drawerIcons, icons, images} from '../../assets';
import {AileronBold, AileronSemiBold} from '../../components';
import Tabs from '../TabStack';
import ClaimsHistory from '../../screens/ClaimsHistory';
import FAQs from '../../screens/FAQs';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/authSlice';
import SettingStack from '../SettingStack';
import {useNavigation} from '@react-navigation/native';
import Profile from '../../screens/Profile';
import TermsAndConditionsView from '../../views/TermsAndConditionsView';
import InactivityHandler from '../../components/InActivity';

const DrawerStack = () => {
  const {user} = useSelector(state => state.auth);

  const timeout = useMemo(() => {
    return 3 * 60 * 1000;
  }, []);
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (!user) {
    return null;
  }
  const routes = [
    {
      id: 1,
      name: 'Home',
      icon: drawerIcons.drawerHome,
      to: 'Home',
    },
    {
      id: 2,
      name: 'Benefits',
      icon: drawerIcons.drawerBenefits,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'Benefits',
    },

    {
      id: 3,
      name: 'Personal',
      icon: drawerIcons.drawerPersonal,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'Personal',
    },

    {
      id: 4,
      name: 'Lodge Claim',
      icon: drawerIcons.drawerLodgeClaim,
      mainParent: 'Tabs',
      stChild: 'LodgeClaim',
    },
    user?.showPriorApproval && {
      id: 5,
      name: 'Prior Approval',
      icon: drawerIcons.drawerPriorApproval,
      mainParent: 'Tabs',
      stChild: 'PriorApproval',
    },
    {
      id: 6,
      name: 'Add Dependent',
      icon: drawerIcons.drawerAddDependent,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'Personal',
    },
    // {
    //   id: 7,
    //   name: 'Claims History',
    //   icon: drawerIcons.drawerClaimHistory,
    //   to: 'ClaimsHistory',
    // },
    {
      id: 8,
      name: 'Hospital Directory',
      icon: drawerIcons.drawerHospitalDirectory,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'Hospitals',
    },
    {
      id: 9,
      name: 'Discounted Centers',
      icon: drawerIcons.drawerDiscountedCenters,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'PanelHospitalList',
    },
    // {
    //   id: 10,
    //   name: 'Helpline',
    //   icon: drawerIcons.drawerHelpline,
    //   mainParent: 'Tabs',
    //   stChild: 'Helpline',
    // },

    // {
    //   id: 11,
    //   name: 'Notifications',
    //   icon: drawerIcons.drawerNotification,
    //   mainParent: 'Tabs',
    //   stChild: 'HomeStack',
    //   ndChild: 'Notifications',
    // },

    {
      id: 10,
      name: 'Privacy',
      icon: icons.privacy,
      to: 'Privacy',
    },

    {
      id: 12,
      name: 'FAQs',
      icon: drawerIcons.drawerFAQ,
      to: 'FAQs',
    },
    {
      id: 13,
      name: 'Settings',
      icon: drawerIcons.drawerSettings,
      mainParent: 'SettingsStack',
      stChild: 'Settings',
    },

    {
      id: 15,
      name: 'Invite A Friend',
      icon: drawerIcons.drawerInvite,
    },

    {
      id: 14,
      name: 'Logout',
      icon: drawerIcons.drawerLogout,
      to: 'logout',
    },
  ].filter(Boolean);

  const DrawerContent = ({navigation}: DrawerContentComponentProps) => {
    const handleProfile = () => {
      navigation.navigate('Profile');
    };

    const scrollRef = useRef<ScrollView>(null);
    const isDrawerOpen = useDrawerStatus() === 'open';

    useEffect(() => {
      if (isDrawerOpen && scrollRef.current) {
        scrollRef.current.scrollTo({y: 0, animated: false});
      }
    }, [isDrawerOpen]);

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.LogoLife} style={styles.logo} />

          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Image
              source={drawerIcons.drawerClose}
              style={styles.drawerClose}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <View style={styles.menuContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profileRow}>
                <AileronSemiBold
                  name={user?.UserName}
                  style={styles.profileTittle}
                />
              </View>

              <TouchableOpacity
                style={styles.ButtonContainer}
                onPress={handleProfile}>
                <LinearGradient
                  colors={COLORS.PriorGradient}
                  style={styles.buttonGradient}>
                  <View style={styles.wrapper}>
                    <AileronSemiBold
                      name="View Profile"
                      style={styles.Buttontext}
                    />
                    <Image
                      source={drawerIcons.drawerArrowRight}
                      style={styles.buttonIcon}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {routes?.length > 0 &&
              routes?.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={async () => {
                    if (route.id === 14) {
                      dispatch(logout());
                      return;
                    }
                    if (route.id === 15) {
                      const appLink =
                        Platform.OS === 'android'
                          ? 'https://play.google.com/store/apps/details?id=com.sehatkahani.app&hl=en'
                          : 'https://apps.apple.com/pk/app/sehat-kahani-retail/id1470938140';
                      try {
                        await Share.share({
                          message: `Check out the IGI Health App! Download it here: ${appLink}`,
                        });
                      } catch (error) {
                        console.log(error);
                      }
                      return;
                    }
                    if (route.to) {
                      navigation.navigate(route.to);
                      return;
                    }
                    if (route?.mainParent && route?.stChild && route?.ndChild) {
                      navigation.navigate(route?.mainParent, {
                        screen: route?.stChild,
                        params: {
                          screen: route?.ndChild,
                        },
                      });
                      return;
                    } else {
                      navigation.navigate(route?.mainParent, {
                        screen: route?.stChild,
                      });
                      return;
                    }
                  }}>
                  <Image style={styles.icon} source={route?.icon} />
                  <AileronBold style={styles.title} name={route?.name} />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <InactivityHandler timeout={timeout}>
      <Drawer.Navigator
        drawerContent={DrawerContent}
        screenOptions={{
          drawerPosition: 'left',
          drawerStyle: styles.drawerContainer,
          headerShown: false,
          swipeEnabled: false,
        }}
        initialRouteName="Tabs">
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="FAQs" component={FAQs} />
        <Drawer.Screen name="SettingsStack" component={SettingStack} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Privacy" component={TermsAndConditionsView} />
      </Drawer.Navigator>
    </InactivityHandler>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: vh * 3,
    borderBottomRightRadius: 0,
    width: vw * 70,
    paddingVertical: vh * 3,
    paddingHorizontal: vw * 6,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh * 4,
  },
  logo: {
    width: vw * 35,
    height: vh * 6,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    gap: vw * 4,
    alignItems: 'center',
    // borderWidth: 2,
  },
  icon: {
    width: vw * 7,
    height: vw * 7,
    resizeMode: 'contain',
  },
  title: {
    fontSize: vw * 4,
    letterSpacing: vw * 0.121,
    color: COLORS.textBlackShade,
    lineHeight: vh * 2.4,
  },
  menuContainer: {
    gap: vh * 4.5,
    marginBottom: vh * 4.5,
  },
  drawerClose: {
    width: vw * 7,
    height: vw * 7,
  },
  profileContainer: {
    gap: vh * 2,
  },
  profileRow: {
    flexDirection: 'row',
    gap: vw * 4,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  profileIcon: {
    width: vw * 15,
    height: vw * 12,
    borderRadius: vh * 1.5,
  },
  profileTittle: {
    // width: vw * 35,
    fontSize: vw * 3.5,
    lineHeight: vh * 2,
    textAlign: 'left',
    // borderWidth: 2,
  },
  Buttontext: {
    fontSize: vw * 3.5,
    color: COLORS.white,
    letterSpacing: vw * 0.15,
  },
  ButtonContainer: {
    width: '80%',
  },
  buttonGradient: {
    borderRadius: vw * 10,
  },
  wrapper: {
    borderRadius: vh * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw * 2,
    padding: vh * 1.7,
  },
  container: {
    flex: 1,
  },
  buttonIcon: {
    width: vw * 7,
    height: vw * 5,
  },
});
