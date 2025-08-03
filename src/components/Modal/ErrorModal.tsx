import {View, Modal, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import Button from '../Button';
import {icons} from '../../assets';
import AileronSemiBold from '../AileronSemiBold';
import AileronBold from '../AileronBold';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorModal} from '../../redux/generalSlice';
import {RootState} from '../../redux/store';

type StyleObject = Record<string, string | number | boolean>;

type ErrorModalProps = {
  containerStyle?: StyleObject | StyleObject[];
  errorModalVisible: boolean;
};

const ErrorModal: React.FC<ErrorModalProps> = ({containerStyle}) => {
  const {showErrorModal, errorMessage, errorDetail} = useSelector(
    (state: RootState) => state.general,
  );
  const dispatch = useDispatch();
  return (
    <Modal transparent={true} visible={showErrorModal} statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, containerStyle]}>
          <View style={styles.personalFrameContainer}>
            <Image source={icons.errorPopup} style={styles.personalFrameIMG} />

            <View style={styles.confirmationContainer}>
              <AileronBold
                name={errorMessage || 'Something went wrong'}
                style={styles.confirmation}
              />
            </View>
            {errorDetail && (
              <AileronSemiBold
                name={errorDetail}
                style={styles.confirmationDetail}
              />
            )}
          </View>
          <View>
            <Button
              name={'Close'}
              inputStyle={styles.closeButton}
              onPress={() =>
                dispatch(
                  setErrorModal({
                    show: false,
                    errorMessage: null,
                    detail: null,
                  }),
                )
              }
              gradientColors={COLORS.PriorGradient}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

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
    minHeight: '38%',
    paddingHorizontal: vh * 3,
    paddingTop: vh * 2.5,
    paddingBottom: vh * 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: vw * 6,
    elevation: vw * 7,
    justifyContent: 'space-between',
  },
  personalFrameContainer: {
    alignItems: 'center',
  },
  closeButton: {
    fontSize: vw * 4.7,
    fontWeight: '700',
    color: COLORS.white,
  },
  personalFrameIMG: {
    width: vh * 7,
    height: vh * 7,
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh * 3,
  },
  confirmation: {
    fontSize: vw * 6.5,
    color: COLORS.black,
    fontWeight: '700',
  },
  confirmationDetail: {
    fontSize: vw * 4.2,
    color: COLORS.confimationDetail,
    marginTop: vh * 1.5,
    marginBottom: vh * 2.5,
    lineHeight: vh * 2.7,
  },
});
