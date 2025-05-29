import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Select} from '../../../components';
import {vh} from '../../../assets/theme/dimension';
import Box from './Box';
import {PersonelDataSection} from '../typeInterface';
import NoDataView from '../../../components/NoDataView';
import {icons} from '../../../assets';

type PersonalDetailsProps = {
  patientOptions: any[];
  personalData: PersonelDataSection[];
  type: string;
  personalDetails: any;
  dependants: any;
  onSelectType: any;
  maternityTypeData: any;
  onSelectMaternityType: any;
  selectedMaternityType: any;
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  patientOptions,
  personalData,
  selectedPatient,
  selectedType,
  maternityTypeData,
  onSelectMaternityType,
  selectedMaternityType,

  onSelectPatient,
  personalDetails,
  type,
  dependants,
  onSelectType,
}) => {
  let data = [
    {
      sectionTitle: 'Personal Details',
      icon: icons.personalDetail,
      edit: false,
      delete: false,
      info: [
        {
          label: 'Name of Employee:',
          value: personalDetails?.Data?.lgivname.trim() ?? '--',
        },
        {
          label: 'Bank Name:',
          value:
            personalDetails?.Data?.Bankname?.trim() == ''
              ? '--'
              : personalDetails?.Data?.Bankname?.trim(),
        },
        {
          label: 'Account Number:',
          value: personalDetails?.Data?.accountNumber ?? ' -- ',
        },
        {
          label: 'Bank IBAN:',
          value:
            personalDetails?.Data?.IBAN?.trim() == ''
              ? '--'
              : personalDetails?.Data?.IBAN?.trim(),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={selectedPatient?.label}
        onSelectOption={value => onSelectPatient(value)}
        selectData={dependants}
        selectLabel={'Patient Information'}
        selectPlaceholder={'-- Select Patient From List --'}
      />

      <Select
        value={selectedType?.label}
        onSelectOption={value => onSelectType(value)}
        selectData={patientOptions}
        selectLabel={'Select Type'}
        selectPlaceholder={'-- Select Type From List --'}
      />

      {/* {selectedType?.label === 'Maternity' && (
        <Select
          value={selectedMaternityType?.label}
          onSelectOption={value => onSelectMaternityType(value)}
          selectData={maternityTypeData}
          selectLabel={'Select Maternity Type'}
          selectPlaceholder={'-- Select Type From List --'}
        />
      )} */}

      {data?.map((data, index) => (
        <Box data={data} key={index} />
      ))}
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    rowGap: vh * 1.25,
  },
});
