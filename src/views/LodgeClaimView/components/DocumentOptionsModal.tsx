import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';

import {vh, vw} from '../../../assets/theme/dimension';
import {AileronBold} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../../../assets';

const DocumentOptionsModal = ({
  uploadDocument,
  showOptionModal,
  viewOptionModal,
}) => {
  return (
    <Modal transparent={true} visible={showOptionModal} statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <TouchableOpacity
            onPress={() => {
              viewOptionModal(false);
            }}
            style={styles.close}>
            <Image source={icons.CancelIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginBottom: vh * 2,
            }}>
            <TouchableOpacity
              onPress={() => uploadDocument('camera')}
              style={styles?.buttonPress}>
              <Image
                source={icons.cameraIcon}
                style={styles?.buttonPressImage}
              />
              <AileronBold style={styles?.buttonText} name="Upload File" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => uploadDocument('file')}
              style={styles?.buttonPress}>
              <Image
                source={icons.uploadFileIcon}
                style={styles?.buttonPressImage}
              />
              <AileronBold style={styles?.buttonText} name="Upload File" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default DocumentOptionsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black + '66',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: vw * 6,
    width: '90%',
    paddingHorizontal: vh * 2,
    paddingTop: vh * 2.5,
    paddingBottom: vh * 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: vw * 6,
    elevation: vw * 7,
    gap: vh * 1.5,
  },

  buttonText: {fontSize: vw * 4},
  button: {
    alignSelf: 'center',
    marginBottom: vh * 1.5,
    backgroundColor: COLORS.cardBackgroundLightBlue,
    paddingVertical: vh * 1.5,
    paddingHorizontal: vw * 4,
    width: '100%',
    borderRadius: vh * 50,
  },

  cancelButton: {
    paddingVertical: vh * 2,
    paddingHorizontal: vh * 1.5,
  },

  closeIcon: {
    height: vh * 4.25,
    width: vh * 4.25,
    resizeMode: 'contain',
  },
  close: {
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderRadius: vw * 50,
    height: vw * 8,
    width: vw * 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPress: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: vw * 2,
  },
  buttonPressImage: {
    height: vh * 5,
    width: vh * 5,
    resizeMode: 'contain',
  },
});
