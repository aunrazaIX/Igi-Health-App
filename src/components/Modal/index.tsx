import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import DependentBox from '../DependentBox';
import AileronRegular from '../AileronRegular';
import Select from '../Select';
import Button from '../Button';
import {icons, images} from '../../assets';
import {personalDetail} from '../../types/personalTypes';

type ModalCustomProps = {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  gender: personalDetail[];
  relation: personalDetail[];
  onPressSubmit?: () => void;
};

const AddModal: React.FC<ModalCustomProps> = ({
  modalVisible,
  setModalVisible,
  gender,
  relation,
  onPressSubmit,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      backdropColor={'#5d605f3d'}
      statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalClose}>
            <Image source={icons.CancelIcon} />
          </TouchableOpacity>

          <View style={styles.personalFrameContainer}>
            <Image
              source={images.personalFrame}
              style={styles.personalFrameIMG}
            />

            <View style={styles.manageContainer}>
              <AileronBold name={'Manage Update'} style={styles.manageText} />
              <AileronBold
                name={'Dependent Details'}
                style={styles.DependentText}
              />
            </View>

            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <AileronRegular
                name="Dependent Name"
                style={styles.selectLabel}
              />
              <TextInput
                style={styles.popupInput}
                placeholder="Enter Name"
                placeholderTextColor={COLORS.selectPlaceholder}
              />
            </DependentBox>

            <Select
              selectData={gender}
              selectLabel={'Gender'}
              selectPlaceholder={'-- Select Gender --'}
            />

            <Select
              selectData={relation}
              selectLabel={'Relationship'}
              selectPlaceholder={'-- Select Relation --'}
            />

            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <AileronRegular name="Age" style={styles.selectLabel} />
              <TextInput
                style={styles.popupInput}
                placeholder="Enter Age"
                placeholderTextColor={COLORS.selectPlaceholder}
              />
            </DependentBox>

            <Button
              name="Submit"
              containerStyle={styles.modalAddButton}
              inputStyle={styles.modalAddText}
              onPress={onPressSubmit}
            />

            <Button
              name="Cancel"
              containerStyle={styles.modalCancelButton}
              gradientColors={['#E1E3E6', '#E1E3E6']}
              inputStyle={styles.modalCancelText}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.black + 40,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: vw * 6,
    borderTopLeftRadius: vw * 6,
    width: '100%',
    minHeight: '88%',
    paddingHorizontal: vh * 1,
    paddingTop: vh * 3.5,
    paddingBottom: vh * 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: vw * 6,
    elevation: vw * 5,
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
  manageContainer: {
    marginVertical: vh * 1.5,
  },
  manageText: {
    color: COLORS.coverageTitle,
    fontSize: vw * 6.6,
  },
  DependentText: {
    color: COLORS.benefitTitle,
    fontSize: vw * 6.6,
  },
  dependentOuterStyle: {
    width: '100%',
    borderWidth: vh * 0.3,
    padding: vw * 3.5,
    paddingBottom: vh * 0,
  },
  selectLabel: {
    textAlign: 'left',
    color: COLORS.personalValue,
    fontSize: vw * 3.6,
  },
  popupInput: {
    marginTop: vh * -0.9,
    marginLeft: 0,
    color: COLORS.personalValue,
    fontSize: vw * 4,
    fontWeight: '500',
  },
  modalAddButton: {
    marginTop: vh * 2,
    borderRadius: vw * 3.5,
  },
  modalAddText: {
    fontSize: vw * 4.4,
    fontWeight: '700',
  },
  modalCancelButton: {
    marginTop: vh * 2,
    borderRadius: vw * 3.5,
  },
  modalCancelText: {
    color: COLORS.cancelButton,
    fontSize: vw * 4.4,
    fontWeight: '700',
  },
});
