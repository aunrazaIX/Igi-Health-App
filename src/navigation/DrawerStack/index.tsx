import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { drawerIcons, icons, images } from '../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import { AileronBold } from '../../components';
import Personal from '../../screens/Personal';
import PriorApproval from '../../screens/PriorApproval';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {

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
      to: 'Benefits'
    },
    {
      id: 3,
      name: 'Personal',
      icon: drawerIcons.drawerPersonal,
      to: 'Personal'
    },
    {
      id: 4,
      name: 'Lodge Claim',
      icon: drawerIcons.drawerLodgeClaim,
      to: 'LodgeClaim'
    },
    {
      id: 5,
      name: 'Prior Approval',
      icon: drawerIcons.drawerPriorApproval,
      to: 'PriorApproval'
    },
    {
      id: 6,
      name: 'Add Dependent',
      icon: drawerIcons.drawerAddDependent,
      to: 'Personal'
    },
    {
      id: 7,
      name: 'Claims History',
      icon: drawerIcons.drawerClaimHistory,
    },
    {
      id: 8,
      name: 'Hospital Directory',
      icon: drawerIcons.drawerHospitalDirectory,
    },
    {
      id: 9,
      name: 'Discounted Centers',
      icon: drawerIcons.drawerDiscountedCenters,
    },
    {
      id: 10,
      name: 'Helpline',
      icon: drawerIcons.drawerHelpline,
    },
    {
      id: 11,
      name: 'Invite A Friend',
      icon: drawerIcons.drawerInviteFriend,
    },
    {
      id: 12,
      name: 'Notifications',
      icon: drawerIcons.drawerNotification,
    },
    {
      id: 13,
      name: 'FAQ’s',
      icon: drawerIcons.drawerFAQ,
    },
    {
      id: 14,
      name: 'Settings',
      icon: drawerIcons.drawerSettings,
    },
  ];


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
                }}
              >
                <Image style={styles.icon} source={route?.icon} />
                <AileronBold style={styles.title} name={route?.name} />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: styles.container,
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Benefits" component={Benefits} />
      <Drawer.Screen name="Personal" component={Personal} />
      {/* <Drawer.Screen name="LodgeClaim" component={} /> */}
      <Drawer.Screen name="PriorApproval" component={PriorApproval} />

    </Drawer.Navigator>
  )
}

export default DrawerStack

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: vw * 75,
    paddingVertical: vh * 3,
    paddingHorizontal: vw * 6,

  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh * 4
  },
  logo: {
    width: vw * 35,
    height: vh * 7,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    gap: vw * 4,
    alignItems: 'center',
  },
  icon: {
    width: vw * 8,
    height: vw * 8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: vw * 4,
    color: COLORS.textBlackShade
  },
  menuContainer: {
    gap: vh * 3
  },
})
