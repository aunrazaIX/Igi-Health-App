import {View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme/colors';
import {icons, images} from '../../assets';
import {
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

const AddDependentView = ({
  dependentApiData,
  genderOptions,
  relationsOptions,
  onPressSubmit,
  handleCancel,
  dependentSetterForApiData,
  setConfirmationModal,
  confirmationModal,
  resetStates,
  addDependentLoading,
  dependentIndex,
  confirmatonType,
  handleSubmitRequest,
  isUpdate,
}) => {
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
            <InputField
              placeholderTextColor={COLORS.textGrayShade}
              labelStyle={{color: COLORS.textBlackShade, fontSize: vw * 3.6}}
              value={dependentApiData.name ?? null}
              onChangeText={text => {
                dependentSetterForApiData('name', text);
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
                dependentSetterForApiData('relation', option);
              }}
              value={dependentApiData?.relation?.label ?? null}
              disabled={dependentApiData?.dependentTypeID?.value === 'Member'}
            />

            <Select
              selectData={genderOptions}
              selectLabel={'Gender'}
              // selectPlaceholder={'Select Gender'}
              onSelectOption={option =>
                dependentSetterForApiData('gender', option)
              }
              value={dependentApiData?.gender?.label ?? ''}
            />
            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <DatePicker
                onSelectValue={date => {
                  dependentSetterForApiData('dob', date);
                }}
                placeholder={'Select Date'}
                label={'Date of Birth'}
                value={dependentApiData?.dob ?? ''}
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
              onPress={onPressSubmit}
            />
            <Button
              name="Cancel"
              containerStyle={styles.modalCancelButton}
              gradientColors={COLORS.deleteButtonGradient}
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
                ? 'Are you sure you want to submit the request to edit the records?'
                : isUpdate
                ? 'Note: All edit requests will be forwarded to IGI Life for review and subsequently sent to your employer for confirmation.'
                : 'Note: All new additions requests will be forwarded to IGI Life for review and subsequently sent to your employer for confirmation..'
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
