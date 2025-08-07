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
  InputField,
  Select,
  TopView,
} from '../../components';
import styles from './styles';
import ModalLoading from '../../components/ModalLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {vh, vw} from '../../assets/theme/dimension';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import {formatName} from '../../utils';

type OptionType = {
  label: string;
  value: any;
};

type DependentApiData = {
  dependentName?: string;
  gender?: string;
  relation?: string;
  age?: string;
  Age?: string;
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
  handleCancel: any;
  formatAgeToDate: any;
  confirmatonType: any;
  handleSubmitRequest: any;
  isUpdate: any;
};

const AddDependentView: React.FC<AddDependentViewProps> = ({
  dependentApiData,
  genderOptions,
  relationsOptions,
  onPressSubmit,
  handleCancel,
  dependentSetterForApiData,
  setConfirmationModal,
  onPressCancel,
  confirmationModal,
  resetStates,
  addDependentLoading,
  dependentIndex,
  dependantsData,
  formatAgeToDate,
  confirmatonType,
  handleSubmitRequest,
  isUpdate,
}) => {
  const relationship = dependentApiData?.dependentTypeID?.label;

  const isSpouse = relationship === 'Spouse';
  const genderDisabled = true;

  return (
    <>
      <TopView
        title={isUpdate ? 'Update Dependent Details' : 'Add New Dependent'}
      />
      <CurvedView containerStyle={styles.curvedStyle}>
        <KeyboardAwareScrollView>
          <View style={styles.personalFrameContainer}>
            <Image
              source={images.personalFrame}
              style={styles.personalFrameIMG}
            />
            {/* <View style={styles.manageContainer}>
              <AileronBold
                name={dependentIndex != undefined ? 'Manage Update' : 'Add'}
                style={styles.manageText}
              />
              <AileronBold
                name={'Dependent Details'}
                style={styles.DependentText}
              />
            </View> */}

            <InputField
              placeholderTextColor={COLORS.textGrayShade}
              labelStyle={{color: COLORS.textBlackShade, fontSize: vw * 3.6}}
              value={dependentApiData.dependentName ?? null}
              onChangeText={text => {
                dependentSetterForApiData('dependentName', text);
              }}
              maxLength={20}
              label="Dependent Name"
              placeholder="Enter Name"
              containerStyle={styles.inputContainer}
            />

            <Select
              selectData={relationsOptions}
              selectLabel={'Relationship'}
              selectPlaceholder={'Select Relation'}
              onSelectOption={option => {
                dependentSetterForApiData('dependentTypeID', option);

                if (
                  option.label === 'Son' ||
                  option.label === 'Father' ||
                  option.label === 'Husband'
                ) {
                  dependentSetterForApiData('gender', {
                    label: 'Male',
                    value: 'Male',
                  });
                } else if (
                  option.label === 'Daughter' ||
                  option.label === 'Mother' ||
                  option.label === 'Wife'
                ) {
                  dependentSetterForApiData('gender', {
                    label: 'Female',
                    value: 'Female',
                  });
                } else {
                  dependentSetterForApiData('gender', null);
                }
              }}
              value={dependentApiData?.dependentTypeID?.label ?? null}
            />

            <Select
              selectData={genderOptions}
              selectLabel={'Gender'}
              selectPlaceholder={'Select Gender'}
              onSelectOption={option =>
                dependentSetterForApiData('gender', option)
              }
              value={dependentApiData?.gender?.label ?? ''}
              disabled={genderDisabled}
            />

            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <DatePicker
                onSelectValue={(date: Date) => {
                  dependentSetterForApiData('Age', date);
                }}
                placeholder={'Select Date'}
                label={'Date of Birth'}
                value={dependentApiData?.Age ? dependentApiData.Age : ''}
                disabled={false}
                labelStyle={{}}
                containerStyle={{}}
                mode="date"
                maximumDate={new Date()}
                minimumDate={undefined}
              />
            </DependentBox>
            <Button
              name={dependentIndex != undefined ? 'Submit Request' : 'Submit'}
              containerStyle={styles.modalAddButton}
              inputStyle={styles.modalAddText}
              onPress={onPressSubmit}
            />
            <Button
              name="Cancel"
              containerStyle={styles.modalCancelButton}
              gradientColors={[
                ' rgba(251, 88, 136, 1)',
                ' rgba(238, 37, 96, 1)',
              ]}
              inputStyle={styles.modalCancelText}
              onPress={handleCancel}
            />
          </View>

          <ModalLoading loading={addDependentLoading} />

          <ConfirmationModal
            ConfirmationModalVisible={confirmationModal}
            setConfirmationModalVisible={setConfirmationModal}
            submitButton={confirmatonType === 'update' ? true : false}
            frameImage={
              isUpdate && confirmatonType === 'update'
                ? icons.ModalSuccessfull
                : icons.modelSuccessful
            }
            confirmationMessage={
              confirmatonType === 'update'
                ? 'Are you sure you want to submit the request to IGI Life to edit the records?'
                : isUpdate
                ? 'Your request has been submitted.\nNote: All edit requests will be forwarded to IGI Life for review and subsequently sent to your employer for confirmation.'
                : 'Your request has been submitted.\nNote: All new additions requests will be forwarded to IGI Life for review and subsequently sent to your employer for confirmation..'
            }
            closeButton={confirmatonType === 'update' ? false : true}
            Successfull={true}
            CloseButtonText={'Continue To Login'}
            onClose={resetStates}
            handleSubmit={handleSubmitRequest}
            confirmationType={confirmatonType}
            isUpdate={isUpdate}
            heading="Request Submitted"
          />
        </KeyboardAwareScrollView>
      </CurvedView>
    </>
  );
};

export default AddDependentView;
