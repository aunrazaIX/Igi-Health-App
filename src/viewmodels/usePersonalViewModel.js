import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import moment from 'moment';
import {formatName} from '../utils';
import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';

const usePersonalViewModal = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [deleteDependent, setDeleteDependent] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const goBack = () => navigation.goBack();

  const {data, loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependents(user?.cnic, 'SSL', 'abc'),
    method: 'get',
    onSuccess: res => {
      console.log(user);
      setGetData(
        res?.data?.map((item, index) => ({
          dependent: 'Dependent Detail',
          image:
            item?.relation === 'Wife'
              ? icons.wife
              : item?.relation === 'Husband'
              ? icons.husband
              : item?.relation === 'MB'
              ? icons.member
              : item?.relation === 'Father'
              ? icons.father
              : item?.relation === 'Mother'
              ? icons.mother
              : item?.relation === 'Son'
              ? icons.genderFrame
              : icons.frame,
          dependentDetail: [
            {label: 'Name :', value: formatName(item?.memberName.trim())},
            {
              label: 'Gender :',
              value:
                item?.cltsex === 'M'
                  ? 'Male'
                  : item?.cltsex === 'F'
                  ? 'Female'
                  : null,
            },
            {label: 'Relationship :', value: item?.relation ?? '--'},
            {
              label: 'Date of Birth :',
              value: item?.cltdob
                ? moment(item?.cltdob, 'YYYYMMDD').isValid()
                  ? moment(item?.cltdob, 'YYYYMMDD').format('DD-MMM-YYYY')
                  : '--'
                : '--',
            },
          ],
        })),
      );
    },
  });

  const handleSubmit = () => {
    setModalVisible(false);
  };

  const openAddDependent = () => {
    setIsUpdate(false);
    navigation.navigate('AddDependent', {isUpdate: false});
  };

  const manageUpdate = (dependent, index) => {
    setIsUpdate(true);
    navigation.navigate('AddDependent', {
      dependentData: dependent ?? null,
      dependentIndex: index ?? null,
      isUpdate: true,
    });
  };

  const deleteDepenedent = dependent => {
    setModalType('delete');
    setDeleteDependent(dependent);
    setConfirmationModal(true);
  };

  const onPressDelete = () => {
    const remaining = getData.filter(d => d !== deleteDependent);
    setGetData(remaining);

    setConfirmationModal(true);
    setModalType('');
  };

  const toggleExpand = index => {
    setExpandedIndex(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const resetStates = () => {
    navigation.navigate('Personal');
  };

  return {
    states: {
      data: getData,
      modalVisible,
      confirmationModal,
      expandedIndex,
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
