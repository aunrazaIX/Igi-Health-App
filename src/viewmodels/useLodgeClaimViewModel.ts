import { StyleSheet } from "react-native";
import { icons } from "../assets";
import { COLORS } from "../assets/theme/colors";
import { vh } from "../assets/theme/dimension";
import { useNavigation } from "@react-navigation/native";


const useLodgeClaimViewModel = ()  => {


  const navigation = useNavigation();
  const steps = [
    {
      label: 'Personal Details',
      key: 'personalDetails',
    },
    {label: 'Claim', key: 'claim'},
    {label: 'Upload Doc', key: 'uploadDoc'},
  ];
  const personalData =  [
    {
          sectionTitle: 'Personal Details',
          icon: icons.personalDetail,
          info: [
            {label: 'Name of Employee:', value: 'Imran Naveed Qureshi'},
            {label: 'Bank Name:', value: 'Bank Al Habib'},
            {label: 'Account Number:', value: '1234-5678-9101112-3'},
            {label: 'Bank IBAN:', value: 'PK47 XYZ 1234 5678 9101112 3 0'},
          ],
        },
        {
          sectionTitle: 'Claims Details',
          icon: icons.claimDetails,
          info: [
            {label: 'Services:', value: 'General OPD, Dental, Optical'},
            {label: 'Eligible Users:', value: 'Self, Spouse, Children'},
            {label: 'Reimbursement:', value: '28827'},
            {label: 'Total OPD:', value: '---'},
          ],
        },
  ]

  const claimsDetails = [
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit:true,
      delete:true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label:'Amount:', value: '28827',total:true},
      ],
    },
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit:true,
      delete:true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label:'Amount:', value: '28827',total:true},
      ],
    },
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit:true,
      delete:true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label:'Amount:', value: '28827',total:true},
      ],
    },
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit:true,
      delete:true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label:'Amount:', value: '28827',total:true},
      ],
    },
  ]

  const goBack = () => {
    navigation.goBack();
  };


  return {
    states: {steps,personalData,claimsDetails},
    functions: {goBack},
  };
};

export default useLodgeClaimViewModel;
