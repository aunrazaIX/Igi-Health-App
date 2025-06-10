import {View, Image, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme/colors';
import {icons, images} from '../../assets';

import {
  AileronBold,
  AileronRegular,
  Button,
  ConfirmationModal,
  CurvedView,
  DependentBox,
  Select,
  TopView,
} from '../../components';
import styles from './styles';
import ModalLoading from '../../components/ModalLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type OptionType = {
  label: string;
  value: any;
};

type DependentApiData = {
  dependentName?: string;
  gender?: string;
  relation?: string;
  age?: string;
};

type AddDependentViewProps = {
  dependentApiData: DependentApiData;
  genderOptions: OptionType[];
  relationsOptions: OptionType[];
  onPressSubmit: () => void;
  dependentSetterForApiData: (key: keyof DependentApiData, value: any) => void;
  onPressCancel?: () => void;
  setConfirmationModal: () => void;
  confirmationModal: boolean;
  resetStates: () => void;
  addDependentLoading: any;
  dependentIndex: any;
  dependantsData: any;
};

const AddDependentView: React.FC<AddDependentViewProps> = ({
  dependentApiData,
  genderOptions,
  relationsOptions,
  onPressSubmit,
  dependentSetterForApiData,
  setConfirmationModal,
  onPressCancel,
  confirmationModal,
  resetStates,
  addDependentLoading,
  dependentIndex,
  dependantsData,
}) => {
  return (
    <>
      <TopView title={'Add Dependent Request'} />
      <CurvedView>
        <KeyboardAwareScrollView enableAutomaticScroll>
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
                value={dependentApiData.dependentName ?? null}
                style={styles.popupInput}
                placeholder="Enter Name"
                placeholderTextColor={COLORS.selectPlaceholder}
                onChangeText={text =>
                  dependentSetterForApiData('dependentName', text)
                }
              />
            </DependentBox>

            <Select
              selectData={genderOptions}
              selectLabel={dependentApiData?.gender?.label ?? 'Gender'}
              selectPlaceholder={'-- Select Gender --'}
              onSelectOption={option =>
                dependentSetterForApiData('gender', option)
              }
              value={dependentApiData?.gender?.label ?? null}
            />
            <Select
              selectData={relationsOptions}
              selectLabel={'Relationship'}
              selectPlaceholder={'-- Select Relation --'}
              onSelectOption={option =>
                dependentSetterForApiData('dependentTypeID', option)
              }
              value={dependentApiData?.dependentTypeID?.label ?? null}
            />
            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <AileronRegular name="Age" style={styles.selectLabel} />

              <TextInput
                style={styles.popupInput}
                placeholder="Enter Age"
                placeholderTextColor={COLORS.selectPlaceholder}
                onChangeText={text => {
                  const digitsOnly = text.replace(/[^0-9]/g, '');
                  dependentSetterForApiData('Age', digitsOnly);
                }}
                value={dependentApiData?.Age ?? null}
              />
            </DependentBox>
            <Button
              name={dependentIndex != undefined ? 'Update' : 'Submit'}
              containerStyle={styles.modalAddButton}
              inputStyle={styles.modalAddText}
              onPress={onPressSubmit}
            />
            <Button
              name="Cancel"
              containerStyle={styles.modalCancelButton}
              gradientColors={['#E1E3E6', '#E1E3E6']}
              inputStyle={styles.modalCancelText}
            />
          </View>

          <ModalLoading loading={addDependentLoading} />

          <ConfirmationModal
            ConfirmationModalVisible={confirmationModal}
            setConfirmationModalVisible={setConfirmationModal}
            frameImage={icons.ModalSuccessfull}
            confirmationMessage={'Your request has been successfully applied'}
            closeButton={true}
            Successfull={true}
            CloseButtonText={'Continue To Login'}
            onClose={resetStates}
          />
        </KeyboardAwareScrollView>
      </CurvedView>
    </>
  );
};

export default AddDependentView;
