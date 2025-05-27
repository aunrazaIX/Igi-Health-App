import {View, Image, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme/colors';
import {images} from '../../assets';

import {
  AileronBold,
  AileronRegular,
  Button,
  CurvedView,
  DependentBox,
  Select,
  TopView,
} from '../../components';
import styles from './styles';

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
};

const AddDependentView: React.FC<AddDependentViewProps> = ({
  dependentApiData,
  genderOptions,
  relationsOptions,
  onPressSubmit,
  dependentSetterForApiData,
  onPressCancel,
}) => {
  return (
    <>
      <TopView title={'Add A Dependent'} />
      <CurvedView>
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
            <AileronRegular name="Dependent Name" style={styles.selectLabel} />
            <TextInput
              value={dependentApiData.dependentName ?? ''}
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
            selectLabel={'Gender'}
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
            value={dependentApiData?.dependentTypeID?.label}
          />
          <DependentBox containerStyle={styles.dependentOuterStyle}>
            <AileronRegular name="Age" style={styles.selectLabel} />
            <TextInput
              style={styles.popupInput}
              placeholder="Enter Age"
              placeholderTextColor={COLORS.selectPlaceholder}
              onChangeText={text => dependentSetterForApiData('Age', text)}
              value={dependentApiData?.age ?? null}
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
          />
        </View>
      </CurvedView>
    </>
  );
};

export default AddDependentView;
