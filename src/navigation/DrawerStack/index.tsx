import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { drawerIcons, images } from '../../assets';
import { AileronBold, AileronSemiBold } from '../../components';
import Tabs from '../TabStack';
import ClaimsHistory from '../../screens/ClaimsHistory';
import FAQs from '../../screens/FAQs';
import Settings from '../../screens/Settings';
import LinearGradient from 'react-native-linear-gradient';

const DrawerStack = () => {
  const Drawer = createDrawerNavigator();

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
    {
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
    {
      id: 7,
      name: 'Claims History',
      icon: drawerIcons.drawerClaimHistory,
      to: 'ClaimsHistory',
    },
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
    {
      id: 10,
      name: 'Helpline',
      icon: drawerIcons.drawerHelpline,
      mainParent: 'Tabs',
      stChild: 'Helpline',
    },

    {
      id: 11,
      name: 'Notifications',
      icon: drawerIcons.drawerNotification,
      mainParent: 'Tabs',
      stChild: 'HomeStack',
      ndChild: 'Notifications',
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
      to: 'Settings',
    },
  ];

  const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
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
        <ScrollView>
          <View style={styles.menuContainer}>
            {routes?.length > 0 &&
              routes?.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={() => {
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
          <View style={styles.profileContainer}>
            <View style={styles.profileRow}>
              <Image
                source={drawerIcons.drawerProfile}
                style={styles.profileIcon}
              />
              <AileronSemiBold
                name="Imran Naveed Qureshi"
                style={styles.profileTittle}
              />
            </View>

            <TouchableOpacity style={styles.ButtonContainer}>
              <LinearGradient
                colors={COLORS.PriorGradient}
                style={styles.buttonGradient}>
                <AileronSemiBold
                  name="View Profile"
                  style={styles.Buttontext}
                />
                <Image
                  source={drawerIcons.drawerArrowRight}
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: styles.drawerContainer,
        headerShown: false,
      }}
      initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ClaimsHistory" component={ClaimsHistory} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
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
    height: vh * 7,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    gap: vw * 4,
    alignItems: 'center',
  },
  icon: {
    width: vw * 7,
    height: vw * 7,
    resizeMode: 'contain',
  },
  title: {
    fontSize: vw * 4,
    color: COLORS.textBlackShade,
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
  },
  profileIcon: {
    width: vw * 15,
    height: vw * 12,
    borderRadius: vh * 1.5,
  },
  profileTittle: {
    width: vw * 35,
    fontSize: vw * 4,
    textAlign: 'left',
  },
  Buttontext: {
    fontSize: vw * 3.5,
    color: COLORS.white,
  },
  ButtonContainer: {
    width: '80%',
  },
  buttonGradient: {
    borderRadius: vh * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw * 2,
    padding: vh * 1.7,
  },
  container: {
    marginBottom: vh * 14,
  },
  buttonIcon: {
    width: vw * 7,
    height: vw * 5,
  },
});
