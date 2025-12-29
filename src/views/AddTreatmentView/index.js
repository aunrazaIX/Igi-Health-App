import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  ConfirmationModal,
  CurvedView,
  DatePicker,
  DependentBox,
  InputField,
  Select,
  TopView,
} from '../../components';
import styles from './styles';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalLoading from '../../components/ModalLoading';
import {vh} from '../../assets/theme/dimension';

const AddTreatmentView = ({
  treatmentTypes,
  setterForApiData,
  apiData,
  onPressAddTreatment,
  setConfirmationModal,
  openConfimationModal,
  confirmationModal,
  loading,
  isError,
  treatmentIndex,
}) => {
  return (
    <>
      <TopView title={'Enter Treatment Details'} />

      <CurvedView containerStyle={styles.curveStyle}>
        <KeyboardAwareScrollView
          extraScrollHeight={20}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={true}>
          <View style={styles.container}>
            <Image source={icons.heart} style={styles.image} />
            <View style={styles.textContainer}>
              <AileronBold
                name="Treatment information"
                style={[styles.text, {color: COLORS.cardBackgroundRed}]}
              />
            </View>

            <Select
              value={apiData?.treatment?.label}
              onSelectOption={option => setterForApiData('treatment', option)}
              selectData={treatmentTypes}
              selectLabel={'Treatment Or Service Type'}
              selectPlaceholder={'Select treatment/service from list'}
              isSearch={true}
              selectContainer={{
                // marginBottom: vh * 1.3,
                paddingVertical: vh,
              }}
            />

            <DependentBox containerStyle={styles.dependentOuterStyle}>
              <DatePicker
                onSelectValue={date => {
                  setterForApiData('admissionDate', date);
                }}
                placeholder={'Select Date'}
                label={'Admission/Procedure Date'}
                value={apiData?.admissionDate}
                disabled={false}
                mode="date"
                minimumDate={new Date()}
              />
            </DependentBox>

            <InputField
              inputMode="numeric"
              labelStyle={{color: COLORS.textBlackShade}}
              placeholderTextColor={COLORS.textGrayShade}
              maxLength={7}
              containerStyle={styles.inputContainerStyle}
              value={apiData?.amount}
              errorMessage={apiData?.error_amount}
              onChangeText={text => {
                const cleanedText = text.replace(/[^0-9]/g, '');
                setterForApiData('amount', cleanedText);
              }}
              label={'Estimated Cost'}
              placeholder={'Enter Estimated Cost'}
            />

            <InputField
              labelStyle={{color: COLORS.textBlackShade}}
              containerStyle={styles.inputContainerStyle}
              value={apiData?.description}
              maxLength={200}
              errorMessage={apiData?.error_description}
              onChangeText={text => setterForApiData('description', text)}
              multiline
              label="Description"
              editable={true}
              placeholder="Write a short description"
            />
            <LinearGradient
              colors={COLORS.PriorGradient}
              style={styles.priorGradient}>
              <TouchableOpacity
                style={styles.wrapper}
                onPress={onPressAddTreatment}>
                <AileronSemiBold
                  style={styles.priorNext}
                  name={
                    treatmentIndex !== undefined
                      ? 'Update Treatment'
                      : 'Add Treatment'
                  }
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <ConfirmationModal
            show={confirmationModal}
            type="error"
            message={'You cant enter the same entry'}
            onCancel={() => setConfirmationModal(false)}
          />
          <ModalLoading loading={loading} />
        </KeyboardAwareScrollView>
      </CurvedView>
    </>
  );
};

export default AddTreatmentView;
