import {ImageSourcePropType} from 'react-native';
import {icons, images} from '../assets';

type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
  };
};

type labelValue = {
  label: string;
  value: string;
};

type DependentDetail = {
  dependent: string;
  image: ImageSourcePropType;
  dependentDetail: labelValue[];
};

const usePersonalViewModal = (): UsePersonalViewModal => {
  // const data: DependentDetail[] = [
  //   {label: 'Name:', value: 'Madiha Imran Qureshi'},
  //   {label: 'Gender:', value: 'Female'},
  //   {label: 'Relationship:', value: 'Wife'},
  //   {label: 'Age:', value: '35 Years'},
  // ];

  const data: DependentDetail[] = [
    {
      dependent: 'Dependent Detail',
      image: icons.frame,
      dependentDetail: [
        {label: 'Name:', value: 'Madiha Imran Qureshi'},
        {label: 'Gender:', value: 'Female'},
        {label: 'Relationship:', value: 'Wife'},
        {label: 'Age:', value: '35 Years'},
      ],
    },
    {
      dependent: 'Dependent Detail',
      image: icons.frame,
      dependentDetail: [
        {label: 'Name:', value: 'Madiha Imran Qureshi'},
        {label: 'Gender:', value: 'Female'},
        {label: 'Relationship:', value: 'Wife'},
        {label: 'Age:', value: '35 Years'},
      ],
    },
    {
      dependent: 'Dependent Detail',
      image: icons.frame,
      dependentDetail: [
        {label: 'Name:', value: 'Madiha Imran Qureshi'},
        {label: 'Gender:', value: 'Female'},
        {label: 'Relationship:', value: 'Wife'},
        {label: 'Age:', value: '35 Years'},
      ],
    },
  ];

  return {
    states: {
      data,
    },
  };
};

export default usePersonalViewModal;
