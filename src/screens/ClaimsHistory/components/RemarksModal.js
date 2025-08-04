import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';
import {vh, vw} from '../../../assets/theme/dimension';
import {icons} from '../../../assets';
import {AileronBold, AileronRegular} from '../../../components';

const RemarksModal = ({show, remarks, onClose}) => {
  return (
    <Modal animationType="fade" visible={show} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <AileronBold style={styles.title} name={'Remarks'} />
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <Image source={icons.errorPopup} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <AileronRegular style={styles.text} name={remarks} />
        </View>
      </View>
    </Modal>
  );
};
export default RemarksModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black + '88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '85%',
    backgroundColor: COLORS.white,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 3,
    borderRadius: vw * 5,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    height: vh * 4,
    width: '20%',
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: vw * 4,
  },
  text: {
    textAlign: 'left',
    marginTop: vh * 0.5,
    fontSize: vw * 3,
  },
});
