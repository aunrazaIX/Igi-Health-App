import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';

import {vh, vw} from '../../../assets/theme/dimension';
import {AileronBold, Button} from '../../../components';
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
            <Image source={icons.errorPopup} style={styles.closeIcon} />
          </TouchableOpacity>

          <Button
            name="Open Camera"
            inputStyle={styles.closeButton}
            onPress={() => uploadDocument('camera')}
          />
          <Button
            name="Upload from Gallery"
            inputStyle={styles.closeButton}
            onPress={() => uploadDocument('file')}
          />
        </View>
      </View>
    </Modal>
  );
};
export default DocumentOptionsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#5d605f3d',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: vw * 6,
    borderTopLeftRadius: vw * 6,
    width: '100%',
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
  buttonText: {fontSize: vw * 4.5, color: COLORS.white},
  button: {
    alignSelf: 'center',
    marginBottom: vh * 1.5,
    backgroundColor: COLORS.cardBackgroundLightBlue,
    paddingVertical: vh * 1.5,
    paddingHorizontal: vw * 4,
    width: '100%',
    borderRadius: vh * 50,
  },
  cancelButtonWrapper: {
    marginBottom: vh * 1.5,
    width: '100%',
    borderRadius: vw * 4,
  },
  cancelButton: {
    paddingVertical: vh * 2,
    paddingHorizontal: vh * 1.5,
  },
  cancelButtonText: {
    fontSize: vw * 4.5,
    color: COLORS.white,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: vw * 4.7,
    fontWeight: '700',
    color: COLORS.white,
  },
  closeIcon: {
    height: vh * 4.5,
    width: vh * 4.5,
    resizeMode: 'contain',
  },
  close: {
    alignSelf: 'flex-end',
  },
});
