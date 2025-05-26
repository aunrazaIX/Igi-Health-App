import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
    modalVisible: boolean;
    confimationModalVisible: boolean;
    expandedIndex: number | null;
  };
  functions: {
    goBack: () => void;
    handleSubmit: () => void;
    manageUpdate: () => void;
    setModalVisible: (val: boolean) => void;
    deleteDepenedent: () => void;
    setConfimationModalVisible: (val: boolean) => void;
    toggleExpand: (index: number) => void;
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
  const [modalVisible, setModalVisible] = useState(false);
  const [confimationModalVisible, setConfimationModalVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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

  const handleSubmit = () => {
    setModalVisible(false);
  };

  const manageUpdate = () => {
    navigation.navigate('AddDependent');
  };

  const deleteDepenedent = () => {
    setConfimationModalVisible(true);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return {
    states: {
      data,
      modalVisible,
      confimationModalVisible,
      expandedIndex,
    },
    functions: {
      goBack,
      handleSubmit,
      manageUpdate,
      setModalVisible,
      deleteDepenedent,
      setConfimationModalVisible,
      toggleExpand,
    },
  };
};

export default usePersonalViewModal;
