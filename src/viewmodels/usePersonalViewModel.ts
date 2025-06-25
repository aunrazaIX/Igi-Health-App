import {ImageSourcePropType} from 'react-native';
import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import moment from 'moment';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
    modalVisible: boolean;
    confimationModalVisible: boolean;
    expandedIndex: number | null;
    confirmationModal: boolean;
    dependantLoading: boolean;
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

  const [modalType, setModalType] = useState<string>('');

  const [deleteDependent, setDeleteDependent] = useState<any>();

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
            {label: 'Name :', value: item?.LGIVNAME.trim()},

            {
              label: 'Gender :',
              value:
                item?.CLTSEX === 'M'
                  ? 'Male'
                  : item?.CLTSEX === 'F'
                  ? 'Female'
                  : null,
            },
            {label: 'Relationship :', value: item?.DPNTTYPE ?? '--'},
            {
              label: 'Date of Birth :',
              value: item?.CLTDOB
                ? moment(item?.CLTDOB, 'YYYYMMDD').isValid()
                  ? moment(item?.CLTDOB, 'YYYYMMDD').format('DD-MMM-YYYY')
                  : '--'
                : '--',
            },
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
      console.log('succesgull');
      setConfirmationModal(true);
    },
    onError: e => {
      console.log('error', e);
    },
  });

  const deleteDepenedent = (dependent, index) => {
    setConfirmationModal(true);
    setModalType('delete');
    setDeleteDependent(dependent);
  };

  const onPressDelete = () => {
    setModalType('');
    let _apiData = {
      dependentRequestID: 0,
      dependentRequestTypesID: 3,
      // dependentTypeID: dependent?.dependentDetail[2]?.value,
      dependentTypeID: 3,
      dependentName: deleteDependent?.dependentDetail[0]?.value,
      cnic: user?.cnic,
      clientCode: user?.ClientCode,
      gender: deleteDependent?.dependentDetail[1].value,

      Age: deleteDependent?.dependentDetail[3].value,
      dependentRequestStatus: true,
      createdAt: '2025-05-15T15:01:31.6552852+05:00',
      createdBy: 1,
    };

    console.log(_apiData, 'myAPi DATA');
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
      deleteDepenedentLoading,
      dependantLoading,
      modalType,
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
      onPressDelete,
    },
  };
};

export default usePersonalViewModal;
