import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
    modalVisible: boolean;
    confimationModalVisible: boolean;
    expandedIndex: number | null;
    confirmationModal: boolean;
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

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

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

  const resetStates = () => {
    navigation.navigate('Personal');
  };

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
    navigation.navigate('AddDependent', {
      dependentData: dependent ?? null,
      dependentIndex: index ?? null,
    });
  };

  const {
    trigger,
    loading: deleteDepenedentLoading,
    error,
  } = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
    onSuccess: res => {
      setConfirmationModal(true);
    },
    onError: e => {
      console.log('error', e);
    },
  });

  const deleteDepenedent = (dependent, index) => {
    console.log(dependent, ' iiii');
    let _apiData = {
      dependentRequestID: 0,
      dependentRequestTypesID: 3,
      // dependentTypeID: dependent?.dependentDetail[2]?.value,
      dependentTypeID: 3,
      dependentName: dependent?.dependentDetail[0]?.value,
      cnic: user?.cnic,
      clientCode: user?.ClientCode,
      gender:
        dependent?.dependentDetail[1].value === 'M'
          ? 'Male'
          : dependent?.dependentDetail[1].value === 'F'
          ? 'Female'
          : null,
      Age: dependent?.dependentDetail[3].value,
      dependentRequestStatus: true,
      createdAt: '2025-05-15T15:01:31.6552852+05:00',
      createdBy: 1,
    };
    trigger(_apiData);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return {
    states: {
      data: getData,
      modalVisible,
      confirmationModal,
      expandedIndex,
    },
    functions: {
      openAddDependent,
      goBack,
      handleSubmit,
      manageUpdate,
      deleteDepenedent,
      toggleExpand,
      setConfirmationModal,
      resetStates,
    },
  };
};

export default usePersonalViewModal;
