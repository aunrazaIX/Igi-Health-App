import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';

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
  value: any;
};

type DependentDetail = {
  dependent: string;
  image: ImageSourcePropType;
  dependentDetail: labelValue[];
};

const usePersonalViewModal = (): UsePersonalViewModal => {
  const [modalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState([]);
  let {user} = useSelector((state: RootState) => state.auth);

  const [confimationModalVisible, setConfimationModalVisible] = useState(false);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const navigation = useNavigation();

  const {data, loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependentList,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      ClientCode: user?.ClientCode,
    },
    onSuccess: res =>
      setGetData(
        res?.Data?.map((item, index) => ({
          dependent: 'Dependent Detail',
          image: icons.frame,
          dependentDetail: [
            {label: 'Name', value: item?.LGIVNAME.trim()},
            {label: 'Gender', value: item?.CLTSEX ?? '--'},
            {label: 'RelationShip', value: item?.DPNTTYPE ?? '--'},
            {label: 'Age', value: item?.AGE},
          ],
        })),
      ),
  });

  console.log(data, 'data');
  console.log(getData, 'getDataaaaa');

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    setModalVisible(false);
  };

  const openAddDependent = () => {
    navigation.navigate('AddDependent');
  };

  const manageUpdate = (dependent, index) => {
    console.log('usman ', dependent);
    navigation.navigate('AddDependent', {
      dependentData: dependent ?? null,
      dependentIndex: index ?? null,
    });
  };

  const deleteDepenedent = () => {
    setConfimationModalVisible(true);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return {
    states: {
      data: getData,
      modalVisible,
      confimationModalVisible,
      expandedIndex,
    },
    functions: {
      openAddDependent,
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
