import {icons} from '../assets';
import {ImageSourcePropType} from 'react-native';

type UseBenefitsViewModel = {
  states: {
    data: CoverageBenefit[];
  };
};

type CoverageBenefit = {
  title: string;
  price: string;
  image?: ImageSourcePropType;
};

const useBenefitsViewModel = (): UseBenefitsViewModel => {
  const data: CoverageBenefit[] = [
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
      image: icons.Insured,
    },
    {
      title: 'Daily Room & Board Limit',
      price: 'Rs. 20,000/-',
      image: icons.meetingRoom,
    },
    {
      title: 'Dental/Optical & Psychiatric',
      price: 'Not Covered in IPD',
      image: icons.doctor,
    },
    {
      title: 'Pre-Admission Testing',
      price: 'Covered upto 30 days',
      image: icons.stethoscope,
    },
    {
      title: 'Post-\nHospitalization Expenses',
      price: 'Covered upto 30 days Rs. 3,000/-',
      image: icons.hospital,
    },
    {
      title: 'Day Care Surgery',
      price: 'Covered as per schedule',
      image: icons.hospitalBed,
    },
    {
      title: 'Congenital Birth Defects',
      price: 'Covered',
      image: icons.baby,
    },
    {
      title: 'Pre Existing Conditions',
      price: 'Covered',
      image: icons.medicalList,
    },
  ];

  return {
    states: {
      data,
    },
  };
};

export default useBenefitsViewModel;
