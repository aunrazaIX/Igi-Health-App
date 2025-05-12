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

const AddTreatmentView = ({goBack}) => {
  return (
    <>
      <TopView onPressBack={goBack} title={'Add A Treatment'} />
      <CurvedView>
        <View style={styles.container}>
          {/* <TouchableOpacity style={styles.borderCircle}>
            <Image source={icons.CancelIcon} style={styles.cancelCircle} />
          </TouchableOpacity> */}
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
            //   selectData={patientOptions}
            selectLabel={'-- Select Treatment --'}
            selectPlaceholder={'-- Select Treatment --'}
          />
          <InputField label="Receipt Number" placeholder="Receipt Number" />
          <InputField label="Amount" placeholder="0" />
          <InputField
            multiline={true}
            label="Description"
            placeholder="Write a short description"
          />
        </View>
        <LinearGradient
          colors={COLORS.PriorGradient}
          style={styles.priorGradient}>
          <TouchableOpacity style={styles.wrapper} onPress={() => {}}>
            <AileronSemiBold style={styles.priorNext} name={'Add Treatment'} />
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity style={styles.cancelButtonwrapper} onPress={() => {}}>
          <AileronSemiBold style={styles.cancelText} name={'Cancel'} />
        </TouchableOpacity>
      </CurvedView>
    </>
  );
};

export default AddTreatmentView;
