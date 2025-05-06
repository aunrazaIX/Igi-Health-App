import {ImageSourcePropType} from 'react-native';
import {icons, images} from '../assets';
import {useNavigation} from '@react-navigation/native';

type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
  };
  functions: {
    goBack: () => void;
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

  const navigation = useNavigation();

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

  const goBack = () => {
    navigation.goBack();
  };

  return {
    states: {
      data,
    },
    functions: {
      goBack,
    },
  };
};

export default usePersonalViewModal;
