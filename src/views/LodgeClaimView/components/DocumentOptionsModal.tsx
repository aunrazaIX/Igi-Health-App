import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';

import {vh, vw} from '../../../assets/theme/dimension';
import {AileronBold} from '../../../components';

const DocumentOptionsModal = ({
  uploadDocument,
  openCamera,
  showOptionModal,
  viewOptionModal,
}) => {
  return (
    <Modal transparent={true} visible={showOptionModal} statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              openCamera();
              viewOptionModal(false);
            }}>
            <AileronBold name="Open Camera" style={styles.buttonText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              uploadDocument();
              viewOptionModal(false);
            }}>
            <AileronBold name="Upload from Gallery" style={styles.buttonText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              viewOptionModal(false);
            }}>
            <AileronBold name="Cancel" style={styles.cancelButtonText} />
          </TouchableOpacity>
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
  cancelButton: {
    alignSelf: 'center',
    marginBottom: vh * 1.5,
    backgroundColor: COLORS.cancelButton,
    paddingVertical: vh * 1.5,
    paddingHorizontal: vw * 4,
    width: '100%',
    borderRadius: vh * 50,
  },
  cancelButtonText: {
    fontSize: vw * 4.5,
    color: COLORS.white,
    textAlign: 'center',
  },
});
