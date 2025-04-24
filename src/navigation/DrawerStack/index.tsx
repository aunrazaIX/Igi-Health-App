import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Benefits from '../../screens/Benefits';
import Home from '../../screens/Home';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { drawerIcons, icons, images } from '../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import { AileronBold, AileronRegular, AileronSemiBold, Button } from '../../components';
import Personal from '../../screens/Personal';
import PriorApproval from '../../screens/PriorApproval';
import LinearGradient from 'react-native-linear-gradient';
import PanelHospitalList from '../../screens/Hospitals';
import LodgeClaim from '../../screens/LodgeClaim';

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
      to: 'Hospital',
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
        <Image source={images.LogoLife} style={styles.logo} />

        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={drawerIcons.drawerClose} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.menuContainer}>
          {routes?.length > 0 &&
            routes?.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={styles.row}
                onPress={() => {
                  if (route.to) {
                    props.navigation.navigate(route.to);
                    return;
                  }
                }}
              >
                <Image style={styles.icon} source={route?.icon} />
                <AileronSemiBold style={styles.title} name={route?.name} />
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.profileContainer}>
          <Image source={drawerIcons.drawerProfile} style={styles.profileImg} />
          <AileronRegular name='Imran Naveed Qureshi' style={styles.profileTittle} />
        </View>
        <View>
          <LinearGradient
            colors={COLORS.PriorGradient}
            style={styles.gradientContainer}
          >
            <TouchableOpacity style={styles.buttonContainer}>
              <AileronSemiBold name={'View Prifile'} style={styles.viewButton} />
              <Image source={drawerIcons.drawerArrowRight} style={styles.arrowRight} />
            </TouchableOpacity>
          </LinearGradient>
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
      <Drawer.Screen name="LodgeClaim" component={LodgeClaim} />
      <Drawer.Screen name="PriorApproval" component={PriorApproval} />
      <Drawer.Screen name="Hospital" component={PanelHospitalList} />

    </Drawer.Navigator>
  )
}

export default DrawerStack

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
    marginBottom: vh * 4
  },
  logo: {
    width: vw * 30,
    height: vh * 6,
    resizeMode: 'contain'
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
    fontSize: vw * 4.5,
    color: COLORS.textBlackShade
  },
  menuContainer: {
    gap: vh * 4,
    marginBottom: vh * 5
  },
  profileImg: {
    width: vw * 15,
    height: vw * 12,
    borderRadius: vh * .5
  },
  scrollContainer: {
    marginBottom: vh * 12
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 4,
    marginBottom: vh * 2
  },
  profileTittle: {
    color: COLORS.textBlackShade,
    fontSize: vw * 4.3,
    flexShrink: 1,
    textAlign: 'left',
  },
  closeIcon: {
    width: vw * 7,
    height: vw * 7
  },
  gradientContainer: {
    width: vw * 45,
    borderRadius: vh * 3,
    padding: vw * 1.3
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: vw * 3,
  },
  arrowRight: {
    width: vw * 9,
    height: vh * 4
  },
  viewButton: {
    fontSize: vw * 3.5,
    color: COLORS.white
  }
})