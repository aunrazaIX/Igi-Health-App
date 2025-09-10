import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AileronRegular from '../AileronRegular';

const NotificationBanner = ({logo, name, message}) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.avatar} />

      <View style={styles.textContainer}>
        <AileronBold style={styles.name} name={name} />
        <AileronRegular style={styles.message} name={message} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PriorGradient,
    paddingVertical: vh,
    paddingHorizontal: vw * 2,
    borderRadius: vw * 2,
    marginHorizontal: 16,
    marginTop: vh * 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: vw * 16,
    height: vw * 16,

    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: vw * 3,
    color: COLORS.white,
    letterSpacing: vw * 0.2,
  },
  message: {
    fontSize: vw * 4,
    color: COLORS.white,
  },
  time: {
    // fontSize: 12,
    // marginLeft: 8,
  },
});

export default NotificationBanner;
