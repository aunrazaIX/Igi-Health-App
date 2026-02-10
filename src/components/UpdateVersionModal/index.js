import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import AileronRegular from '../AileronRegular';
import AileronSemiBold from '../AileronSemiBold';
import Button from '../Button';
import {icons, images} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {fonts} from '../../assets/fonts';

const UpdateVersionModal = ({onPressClose, onPressUpdate, visible = false}) => {
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.subConainer}>
          <View style={styles.row}>
            <AileronBold
              style={styles.updateAvailable}
              name="Update available"
            />
            <TouchableOpacity style={styles.closeContainer}>
              <Image style={styles.closeIcon} source={icons.CancelIcon} />
            </TouchableOpacity>
          </View>
          <AileronRegular
            style={styles.updateAvaialbleText}
            name={
              'A newer version of the app is available. Please update to the latest version to continue using the app. You can still use the current version, but we recommend updating for the best experience.'
            }
          />
          <View style={styles.simpleRow}>
            <View style={styles.logo}>
              <Image style={styles.logoIcon} source={images.Logo} />
            </View>
            <AileronSemiBold
              style={styles.appNameText}
              name="IGI Life Customer Solution App"
            />
          </View>

          <View style={styles.row}>
            <Button
              onPress={onPressClose}
              textStyle={styles.dismissText}
              containerStyle={[styles.updateButton, styles.dismiss]}
              name={'Dismiss'}
            />
            <Button
              onPress={onPressUpdate}
              containerStyle={styles.updateButton}
              name={'Update'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default UpdateVersionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black + '88',
    justifyContent: 'flex-end',
  },
  subConainer: {
    paddingVertical: vh * 3,
    paddingHorizontal: vw * 3,
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  updateAvailable: {
    textAlign: 'left',
    fontSize: vw * 4,
  },
  closeContainer: {
    width: vw * 6,
    height: vh * 3,
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    tintColor: COLORS.black + '88',
    resizeMode: 'contain',
  },
  updateAvaialbleText: {
    textAlign: 'left',
    marginVertical: vh * 2,
    fontSize: vw * 3.5,
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: vh * 5.5,
    borderRadius: vw * 2,
    width: vw * 12,
    backgroundColor: COLORS.white,
    marginLeft: vw * 2,
    resizeMode: 'contain',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoIcon: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  appNameText: {
    marginLeft: vw * 3,
    fontSize: vw * 3.5,
  },
  updateButton: {
    width: '47%',
    height: vh * 5,
    elevation: 0,
    borderRadius: vw * 10,
  },
  dismiss: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.inputBorder,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  dismissText: {
    fontFamily: fonts.inter.regular,
    color: COLORS.black,
  },
});
