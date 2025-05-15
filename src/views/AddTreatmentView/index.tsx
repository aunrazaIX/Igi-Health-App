import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  CurvedView,
  InputField,
  Select,
  TopView,
} from '../../components';
import styles from './styles';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddTreatmentView = ({
  opdTypes,
  setterForApiData,
  apiData,
  onPressAddTreatment,
}) => {
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
                style={[styles.text, {color: COLORS.cardBackgroundBlue}]}
              />
              <AileronBold
                name="Treatment"
                style={[styles.text, {color: COLORS.cardBackgroundRed}]}
              />
            </View>
            <Select
              value={apiData?.treatment?.label}
              onSelectOption={option => setterForApiData('treatment', option)}
              selectData={opdTypes}
              selectLabel={'-- Select Treatment --'}
              selectPlaceholder={'-- Select Treatment --'}
            />
            <InputField
              value={apiData?.receiptNumber}
              onChangeText={text => setterForApiData('receiptNumber', text)}
              label="Receipt Number"
              errorMessage={apiData?.error_receiptNumber}
              placeholder="Receipt Number"
            />
            <InputField
              value={apiData?.Amount}
              errorMessage={apiData?.error_amount}
              onChangeText={text => setterForApiData('amount', text)}
              label="Amount"
              placeholder="0"
            />
            <InputField
              value={apiData?.Description}
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
                name={'Add Treatment'}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </CurvedView>
    </>
  );
};

export default AddTreatmentView;
