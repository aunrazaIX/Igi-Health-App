import { useNavigation } from '@react-navigation/native';
import {icons} from '../assets';
import {ImageSourcePropType} from 'react-native';

type PatientDetailsViewModel = {
  states: {
    data: PatientDetails[];
  },
  functions:{
    goBack : ()=>void ;
  }
};

type LabelValue = {
  label: string;
  value: string;
};

type PatientDetails = {
  sectionTitle: string;
  icon: ImageSourcePropType;
  PatientData: LabelValue[];
};

const patientDetailsViewModel = (): PatientDetailsViewModel => {

  const navigation = useNavigation();

  const data: PatientDetails[] = [
    {
      sectionTitle: 'Personal Details',
      icon: icons.personalDetail,
      PatientData: [
        {label: 'Name of Employee:', value: 'Imran Naveed Qureshi'},
        {label: 'Bank Name:', value: 'Bank Al Habib'},
        {label: 'Account Number:', value: '1234-5678-9101112-3'},
        {label: 'Bank IBAN:', value: 'PK47 XYZ 1234 5678 9101112 3 0'},
      ],
    },
    {
      sectionTitle: 'Claims Details',
      icon: icons.claimDetails,
      PatientData: [
        {label: 'Services:', value: 'General OPD, Dental, Optical'},
        {label: 'Eligible Users:', value: 'Self, Spouse, Children'},
        {label: 'Reimbursement:', value: '28827'},
        {label: 'Total OPD:', value: '---'},
      ],
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };
    

  return {
    states: {
      data,
    },
    functions : {
      goBack
    }
  };
};

export default patientDetailsViewModel;
