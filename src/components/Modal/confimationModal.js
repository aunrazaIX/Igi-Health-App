import {View, Modal, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import LinearGradient from 'react-native-linear-gradient';
import AileronBold from '../AileronBold';
import AileronSemiBold from '../AileronSemiBold';
import {MODAL_CONFIG} from '../../utils';

const ConfirmationModal = ({show, type, onConfirm, onCancel, message}) => {
  if (!type) return null;
  const config = MODAL_CONFIG[type];
  return (
    <Modal transparent visible={show} statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.personalFrameContainer}>
            <Image source={config.icon} style={styles.personalFrameIMG} />
            <View style={styles.confirmationContainer}>
              <AileronBold name={config.title} style={styles.confirmation} />
            </View>
            <AileronSemiBold
              name={message || config?.message}
              style={styles.confirmationDetail}
            />
          </View>
          <View style={styles.confirmationButtonContainer}>
            {config.confirmText && (
              <LinearGradient
                style={[styles.deleteButtonContainer, {marginRight: vw * 4}]}
                colors={COLORS.activeButtonGradient}>
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={onConfirm}>
                    <AileronBold
                      name={config.confirmText}
                      style={styles.deleteButtonText}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
            <LinearGradient
              style={styles.deleteButtonContainer}
              colors={
                config.confirmText
                  ? COLORS.deleteButtonGradient
                  : COLORS.activeButtonGradient
              }>
              <View style={styles.wrapper}>
                <TouchableOpacity onPress={onCancel}>
                  <AileronBold
                    name={config.cancelText}
                    style={styles.cancelButtonText}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

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
    paddingTop: vh * 1,
    paddingBottom: vh * 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: vw * 6,
    elevation: vw * 7,
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: -vh * 1,
  },
  personalFrameContainer: {
    alignItems: 'center',
  },
  personalFrameIMG: {
    width: vh * 9.5,
    height: vh * 9.5,
    resizeMode: 'contain',
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmation: {
    fontSize: vw * 5,
    color: COLORS.coverageTitle,
    fontWeight: '700',
  },
  confirmationDetail: {
    fontSize: vw * 3,
    color: COLORS.textBlackShade,
    marginTop: vh * 1,
    marginBottom: vh * 1.5,
  },
  confirmationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    borderRadius: vw * 4,
    backgroundColor: COLORS.cancelBottonBackground,
    marginTop: vh,
  },
  cancelButtonSubmit: {
    borderRadius: vw * 4,
    backgroundColor: COLORS.cancelBottonBackground,
    marginTop: vh,
  },
  deleteButtonContainer: {
    borderRadius: vw * 4,
    flex: 1,
    marginTop: vh,
  },
  wrapper: {
    paddingVertical: vh * 1.5,
  },
  cancelButtonText: {
    fontSize: vw * 3,
    color: COLORS.white,
  },
  deleteButtonText: {
    fontSize: vw * 3,
    color: COLORS.white,
  },
});
