import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  ConfirmationModal,
  CurvedView,
  InputField,
  Select,
  TopView,
} from '../../components';
import styles from './styles';
import { icons } from '../../assets';
import { COLORS } from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type AddTreatmentViewProps = {
  treatmentTypes: any[];
  setterForApiData: (key: string, value: any) => void;
  apiData: any;
  onPressAddTreatment: () => void;
  isError: boolean;
  treatmentIndex: number;
  setConfirmationModal: (val: boolean) => void;
  openConfimationModal: () => void;
  confirmationModal: boolean;
};

const AddTreatmentView = ({
  treatmentTypes,
  setterForApiData,
  apiData,
  onPressAddTreatment,
  setConfirmationModal,
  openConfimationModal,
  confirmationModal,

  isError,
  treatmentIndex,
}: AddTreatmentViewProps) => {
  return (
    <>
      <TopView title={'Add A Treatment'} />
      <CurvedView>
        <View style={styles.container}>
          <KeyboardAwareScrollView enableOnAndroid>
            <Image source={icons.heart} style={styles.image} />
            <View style={styles.textContainer}>
              <AileronBold
                name="Add"
                style={[styles.text, { color: COLORS.cardBackgroundBlue }]}
              />
              <AileronBold
                name="Treatment"
                style={[styles.text, { color: COLORS.cardBackgroundRed }]}
              />
            </View>

            <Select
              value={apiData?.treatment?.label}
              onSelectOption={option => setterForApiData('treatment', option)}
              selectData={treatmentTypes}
              selectLabel={'-- Select Treatment --'}
              selectPlaceholder={'-- Select Treatment --'}
            />

            <InputField
              value={apiData?.receiptNumber}
              onChangeText={text => {
                const alphanumericOnly = text.replace(/[^a-zA-Z0-9]/g, '');

                setterForApiData('receiptNumber', text);
              }}
              maxLength={25}
              label="Receipt Number"
              errorMessage={apiData?.error_receiptNumber}
              placeholder="Receipt Number"
            />

            <InputField
              maxLength={7}
              value={apiData?.amount}
              errorMessage={apiData?.error_amount}
              onChangeText={text => {
                const cleanedText = text.replace(/[^0-9]/g, '');
                setterForApiData('amount', cleanedText);
              }}
              label="Amount"
              placeholder="0"
            />
            <InputField
              value={apiData?.description}
              maxLength={200}
              errorMessage={apiData?.error_description}
              onChangeText={text => setterForApiData('description', text)}
              multiline
              label="Description"
              placeholder="Write a short description"
            />
          </KeyboardAwareScrollView>
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
          ConfirmationModalVisible={confirmationModal}
          setConfirmationModalVisible={setConfirmationModal}
          frameImage={icons.errorPopup}
          confirmationMessage={'You cant enter the same entry'}
          closeButton={true}
          Successfull={false}
          CloseButtonText={'Continue To Login'}
        />
      </CurvedView>
    </>
  );
};

export default AddTreatmentView;
