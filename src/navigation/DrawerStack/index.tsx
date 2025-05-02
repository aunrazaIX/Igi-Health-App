import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {drawerIcons, icons, images} from '../../assets';
import {AileronBold} from '../../components';
import Personal from '../../screens/Personal';
import PriorApproval from '../../screens/PriorApproval';
import Tabs from '../TabStack';
import ClaimsHistory from '../../screens/ClaimsHistory';
import Hospitals from '../../screens/Hospitals';
import PanelHospitalList from '../../screens/PanelHospitalList';
import Helpline from '../../screens/Helpline';
import Notification from '../../screens/Notification';
import FAQs from '../../screens/FAQs';
import Settings from '../../screens/Settings';
import LinearGradient from 'react-native-linear-gradient';
import LodgeClaim from '../../screens/LodgeClaim';

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
      to: 'Benefits',
    },
    {
      id: 3,
      name: 'Personal',
      icon: drawerIcons.drawerPersonal,
      to: 'Personal',
    },
    {
      id: 4,
      name: 'Lodge Claim',
      icon: drawerIcons.drawerLodgeClaim,
      to: 'LodgeClaim',
    },
    {
      id: 5,
      name: 'Prior Approval',
      icon: drawerIcons.drawerPriorApproval,
      to: 'PriorApproval',
    },
    {
      id: 6,
      name: 'Add Dependent',
      icon: drawerIcons.drawerAddDependent,
      to: 'Personal',
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
      to: 'Hospitals',
    },
    {
      id: 9,
      name: 'Discounted Centers',
      icon: drawerIcons.drawerDiscountedCenters,
      to: 'PanelHospitalList',
    },
    {
      id: 10,
      name: 'Helpline',
      icon: drawerIcons.drawerHelpline,
      to: 'Helpline',
    },

    {
      id: 11,
      name: 'Notifications',
      icon: drawerIcons.drawerNotification,
      to: 'Notification',
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

  const DrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image source={images.Logo} style={styles.logo} />

          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image source={icons.CancelIcon} />
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
                      props.navigation.navigate(route.to);
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
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: styles.container,
        headerShown: false,
      }}
      initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={Tabs} />
      {/* <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Benefits" component={Benefits} />
      <Drawer.Screen name="Personal" component={Personal} />
      <Drawer.Screen name="LodgeClaim" component={LodgeClaim} />
      <Drawer.Screen name="PriorApproval" component={PriorApproval} />
      <Drawer.Screen name="AddDependent" component={Personal} />
      <Drawer.Screen name="ClaimsHistory" component={ClaimsHistory} />
      <Drawer.Screen name="Hospitals" component={Hospitals} />
      <Drawer.Screen name="PanelHospitalList" component={PanelHospitalList} />
      <Drawer.Screen name="Helpline" component={Helpline} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name="Settings" component={Settings} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({
  container: {
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
    gap: vh * 3,
  },
});
