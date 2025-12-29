import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import moment from 'moment';
import {formatName} from '../utils';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useSelector} from 'react-redux';

const usePersonalViewModal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [deleteDependent, setDeleteDependent] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const goBack = () => navigation.goBack();
  const {user} = useSelector(state => state.auth);

  const {loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependents,
    method: 'get',
    onSuccess: res => {
      setData(
        res?.data?.map((item, index) => ({
          key: index,
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
  const {trigger, loading: deleteDepenedentLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
    onSuccess: res => {
      setModalType('success');
      setConfirmationModal(true);
    },
  });
  const deleteDepenedent = dependent => {
    setModalType('delete');
    setDeleteDependent(dependent);
    setConfirmationModal(true);
  };

  const onPressDelete = () => {
    setModalType('');
    let _apiData = {
      cnicNumber: user?.cnic,
      name: deleteDependent?.dependentDetail[0]?.value,
      gender: deleteDependent?.dependentDetail[1]?.value,
      relation: deleteDependent?.dependentDetail[2]?.value,
      dob: deleteDependent?.dependentDetail[3]?.value,
      dependentReqType: 3,
    };

    trigger(_apiData);
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
      data,
      modalVisible,
      confirmationModal,
      expandedIndex,
      dependantLoading,
      deleteDepenedentLoading,
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
