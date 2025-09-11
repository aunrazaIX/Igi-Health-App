import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AileronRegular from '../AileronRegular';
import LinearGradient from 'react-native-linear-gradient';

const NotificationBanner = ({logo, name, message}) => {
  return (
    <LinearGradient
      colors={COLORS.activeButtonGradient}
      style={styles.container}>
      <Image source={logo} style={styles.avatar} />

      <View style={styles.textContainer}>
        <AileronBold style={styles.name} name={name} />
        <AileronRegular style={styles.message} name={message} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: COLORS.activeButtonGradient,
    paddingVertical: vh * 0.2,
    paddingHorizontal: vw * 2,
    borderRadius: vw * 2,
    marginHorizontal: vw * 1.5,
    marginTop: vh * 3,
    elevation: 3,
    gap: vw * 4,
  },
  avatar: {
    width: vw * 18,
    height: vw * 16,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: vw * 3.5,
    color: COLORS.white,
    letterSpacing: vw * 0.2,
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: vw * 3,
    color: COLORS.white,
    alignSelf: 'flex-start',
  },
});

export default NotificationBanner;
