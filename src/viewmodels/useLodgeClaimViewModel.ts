import { StyleSheet } from "react-native";
import { icons } from "../assets";
import { COLORS } from "../assets/theme/colors";
import { vh } from "../assets/theme/dimension";

const useLodgeClaimViewModel = () => {
  const steps = [
    {
      label: 'Personal Details',
      key: 'personalDetails',
    },
    {label: 'Claim', key: 'claim', data: []},
    {label: 'Upload Doc', key: 'uploadDoc', data: []},
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
  return {
    states: {steps,personalData},
    functions: {},
  };
};

export default useLodgeClaimViewModel;


const styles= StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: vh * 4.5,
    height: vh * 4.5,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: vh * 1.8,
    color: COLORS.insuredPrice,
  },
  details: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: COLORS.dependentBorder,
    borderStyle: 'dashed',
    paddingTop: vh * 1,
    rowGap: vh,
  },
})
