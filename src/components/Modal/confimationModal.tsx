import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import AileronSemiBold from '../AileronSemiBold';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';

type StyleObject = Record<string, string | number | boolean>;

type ConfimationModalProps = {
  ConfirmationModalVisible?: boolean;
  setConfirmationModalVisible?: (val: boolean) => void;
  frameImage?: ImageSourcePropType;
  confirmationMessage?: string;
  closeButton?: boolean;
  deleteButton?: boolean;
  confirmationRequired?: boolean;
  claimSubmission?: boolean;
  containerStyle?: StyleObject | StyleObject[];
  handleDelete?: () => void;
  Successfull?: boolean;
  CloseButtonText: string;
  onClose?: () => void;
  closeIcon?: boolean;
  confirmationType: any;
  submitButton?: boolean;
  handleSubmit?: () => void;
  type: any;
};

const ConfirmationModal: React.FC<ConfimationModalProps> = ({
  ConfirmationModalVisible,
  setConfirmationModalVisible,
  frameImage,
  confirmationMessage,
  closeButton,
  deleteButton,
  confirmationRequired,
  claimSubmission,
  containerStyle,
  handleDelete,
  Successfull,
  onClose,
  closeIcon,
  confirmationType,
  submitButton,
  handleSubmit,
  type,
}) => {
  const handleClose = () => {
    setConfirmationModalVisible(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Modal
      transparent={true}
      visible={ConfirmationModalVisible}
      statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, containerStyle]}>
          {closeIcon && (
            <TouchableOpacity
              onPress={() => setConfirmationModalVisible(false)}
              style={styles.modalClose}>
              <Image source={icons.CancelIcon} />
            </TouchableOpacity>
          )}

          <View style={styles.personalFrameContainer}>
            <Image source={frameImage} style={styles.personalFrameIMG} />

            {confirmationRequired && (
              <View style={styles.confirmationContainer}>
                <AileronBold name="Confirmation " style={styles.confirmation} />
                <AileronBold name="Required" style={styles.required} />
              </View>
            )}

            {claimSubmission && (
              <View style={styles.claimContainer}>
                <AileronBold
                  name="Claim Submission"
                  style={styles.confirmation}
                />
                <AileronBold name="Confirmation" style={styles.required} />
              </View>
            )}

            {Successfull && (
              <View style={styles.confirmationContainer}>
                <AileronBold name="Successful!" style={styles.confirmation} />
              </View>
            )}

            <AileronSemiBold
              name={confirmationMessage}
              style={styles.confirmationDetail}
            />
          </View>

          {deleteButton && (
            <View style={styles.confirmationButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmationModalVisible(false)}>
                <AileronBold name="Cancel" style={styles.cancelButtonText} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButtonContainer}
                onPress={() => {
                  if (handleDelete) handleDelete();
                  if (setConfirmationModalVisible)
                    setConfirmationModalVisible(false);
                }}>
                <LinearGradient
                  style={styles.deleteButton}
                  colors={COLORS.deleteButtonGradient}>
                  <View style={styles.wrapper}>
                    <AileronBold
                      name={confirmationType === 'back' ? 'Continue' : 'Delete'}
                      style={styles.deleteButtonText}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {submitButton && (
            <>
              <View>
                <Button
                  name="Submit"
                  inputStyle={styles.closeButton}
                  onPress={handleSubmit}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={styles.cancelButtonSubmit}
                  onPress={() => setConfirmationModalVisible(false)}>
                  <AileronBold name="Cancel" style={styles.cancelButtonText} />
                </TouchableOpacity>
              </View>
            </>
          )}

          {closeButton && (
            <View>
              <Button
                name="Close"
                inputStyle={styles.closeButton}
                onPress={handleClose}
              />
            </View>
          )}
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
    paddingTop: vh * 2.5,
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
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh * 3,
  },
  confirmation: {
    fontSize: vw * 6.5,
    color: COLORS.coverageTitle,
    fontWeight: '700',
  },
  required: {
    fontSize: vw * 6.5,
    color: COLORS.benefitTitle,
    fontWeight: '700',
  },
  confirmationDetail: {
    fontSize: vw * 4.1,
    color: COLORS.confimationDetail,
    marginTop: vh * 1.5,
    marginBottom: vh * 2.5,
    lineHeight: vh * 2.7,
  },
  confirmationButtonContainer: {
    flexDirection: 'row',
    gap: '4%',
  },
  cancelButton: {
    width: '48%',
    borderWidth: vh * 0.2,
    borderRadius: vh * 1.3,
    paddingVertical: vh * 1.2,
    paddingHorizontal: vh * 1.5,
    borderColor: COLORS.cancelButtonBorder,
    backgroundColor: COLORS.cancelBottonBackground,
  },
  cancelButtonSubmit: {
    // width: '48%',
    borderWidth: vh * 0.2,
    borderRadius: vw * 4,
    padding: vh * 2,
    borderColor: COLORS.cancelButtonBorder,
    backgroundColor: COLORS.cancelBottonBackground,
    marginTop: vh,
  },
  deleteButtonContainer: {
    width: '48%',
  },
  deleteButton: {
    borderRadius: vh * 1.3,
  },
  wrapper: {
    paddingVertical: vh * 1.2,
    paddingHorizontal: vh * 1.5,
  },
  cancelButtonText: {
    fontSize: vw * 4.4,
    color: COLORS.cancelButton,
  },
  deleteButtonText: {
    fontSize: vw * 4.4,
    color: COLORS.white,
  },
  closeButton: {
    fontSize: vw * 4.7,
    fontWeight: '700',
    color: COLORS.white,
  },
  cancel: {},
  claimContainer: {
    marginTop: vh * 2,
  },
});
