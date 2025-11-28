import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import moment from 'moment';
import {formatName} from '../utils';
import {useSelector} from 'react-redux';

const usePersonalViewModal = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);

  const data = [
    {
      DPNTTYPE: 'Wife',
      LGIVNAME: 'Ayesha Khan',
      CLT: 'F',
      CLTDOB: '19900412',
    },
    {
      DPNTTYPE: 'Son',
      LGIVNAME: 'Ali Khan',
      CLT: 'M',
      CLTDOB: '20120115',
    },
    {
      DPNTTYPE: 'Mother',
      LGIVNAME: 'Shahnaz Bibi',
      CLT: 'F',
      CLTDOB: '19621206',
    },
  ];

  const formattedList = data.map(item => ({
    dependent: 'Dependent Detail',
    image:
      item?.DPNTTYPE === 'Wife'
        ? icons.wife
        : item?.DPNTTYPE === 'Husband'
        ? icons.husband
        : item?.DPNTTYPE === 'Member'
        ? icons.member
        : item?.DPNTTYPE === 'Father'
        ? icons.father
        : item?.DPNTTYPE === 'Mother'
        ? icons.mother
        : item?.DPNTTYPE === 'Son'
        ? icons.genderFrame
        : icons.frame,

    dependentDetail: [
      {label: 'Name :', value: formatName(item?.LGIVNAME.trim())},
      {
        label: 'Gender :',
        value: item?.CLT === 'M' ? 'Male' : 'Female',
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
  }));

  const [modalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState(formattedList);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [deleteDependent, setDeleteDependent] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const goBack = () => navigation.goBack();

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

  const formatAgeString = rawDate => {
    if (!rawDate) return null;
    return rawDate.replace(/\D/g, '') || null;
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
      deleteDepenedentLoading: false,
      dependantLoading: false,
      modalType,
      userData: user?.coverageType?.[0],
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
