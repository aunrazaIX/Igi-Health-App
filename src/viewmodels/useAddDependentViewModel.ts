import {useDispatch, useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {personalDetail, UsePersonalModalTypes} from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {RootState} from '../redux/store';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import {DetailsContainer} from '../components';
import moment from 'moment';

const useAddDependentViewModal = ({route}): UsePersonalModalTypes => {
  let {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {dependentData, dependentIndex, isUpdate} = route?.params || {};

  console.log(dependentData, 'data add dependent comes from');

  const navigation = useNavigation();

  const [confirmationType, setConfirmatonType] = useState('');

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  const prefilledData = {
    dependentName: dependentData?.dependentDetail[0]?.value,
    gender: {
      label: dependentData?.dependentDetail[1]?.value,
      value: dependentData?.dependentDetail[1]?.value,
    },
    relationship: {
      label: dependentData?.dependentDetail[2]?.value,
      value: dependentData?.dependentDetail[2]?.value,
    },

    age: dependentData?.dependentDetail[3]?.value,
  };

  console.log(prefilledData, 'prefilled data');

  const formatAgeToDate = (raw: string): string => {
    if (!raw) return '';
    const digits = raw.replace(/[^0-9]/g, '').padStart(8, '0');
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    return `${day}-${month}-${year}`;
  };

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    dependentName: prefilledData.dependentName ?? null,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: {
      label: prefilledData.relationship.label,
      value: prefilledData.relationship.value,
    },
    dependentRequestTypesID: dependentIndex ? 2 : 1,
    dependentRequestID: 0,
    gender: {
      label: prefilledData.gender.label,
      Value: prefilledData.gender.value,
    },
    Age: prefilledData?.age?.toString() ?? null,
    dependentRequestStatus: true,
    createdBy: 1,
  });

  const genderOptions: personalDetail[] = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];

  const {data: relationsOptions} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependentType,
    method: 'get',
    transform: {
      label: 'DependentTypeName',
      value: 'DependentTypeID',
    },
  });

  console.log(relationsOptions, 'realtionshipssss');

  const {
    trigger,
    loading: addDependentLoading,
    error,
  } = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
    onSuccess: res => {
      if (!isUpdate) {
        setConfirmatonType('');
        setConfirmationModal(true);
      }

      setConfirmatonType('');
    },

    onError: error => {
      console.log(error, 'Error');

      dispatch(
        setErrorModal({
          Show: true,
          message: `"Incorrect Data May be api goes to on Error"`,
          detail:
            'An error has occurred, please fill all require feilds. If the problem persists, contact IGI Life',
        }),
      );
    },
  });

  const handleSubmitRequest = () => {
    console.log('handleSubmit is trigger');
    let _apiData = {
      ...dependentApiData,
      dependentTypeID:
        dependentApiData?.dependentTypeID?.value === 'Main Member' &&
        dependentApiData?.gender?.label === 'Male'
          ? 1
          : dependentApiData?.dependentTypeID?.value === 'Main Member' &&
            dependentApiData?.gender?.label === 'Female'
          ? 6
          : dependentApiData?.dependentTypeID?.value === 'Spouse' &&
            dependentApiData?.gender?.label === 'Male'
          ? 6
          : dependentApiData?.dependentTypeID?.value === 'Spouse' &&
            dependentApiData?.gender?.label === 'Female'
          ? 1
          : dependentApiData?.dependentTypeID?.value,

      gender: dependentApiData?.gender?.label,
      Age: dependentApiData?.Age
        ? moment(dependentApiData.Age, 'D-MMM-YYYY').format('DDMMYYYY')
        : '',
    };

    console.log('data going after confirmation', _apiData);

    if (
      !dependentApiData?.dependentName ||
      !dependentApiData?.gender?.label ||
      !dependentApiData?.dependentTypeID?.value ||
      !dependentApiData?.Age
    ) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all require feilds"`,
          detail:
            'An error has occurred, please fill all require feilds. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      console.log('triggering updating');
      console.log('apiData', _apiData);
      trigger(_apiData);
      // setConfirmatonType('update');
    }
  };
  const onPressSubmit = () => {
    const filled = dependentCheckForError();

    // if (!filled) return;

    let _apiData = {
      ...dependentApiData,
      dependentTypeID:
        dependentApiData?.dependentTypeID?.value === 'Main Member' &&
        dependentApiData?.gender?.label === 'Male'
          ? 1
          : dependentApiData?.dependentTypeID?.value === 'Main Member' &&
            dependentApiData?.gender?.label === 'Female'
          ? 6
          : dependentApiData?.dependentTypeID?.value === 'Spouse' &&
            dependentApiData?.gender?.label === 'Male'
          ? 6
          : dependentApiData?.dependentTypeID?.value === 'Spouse' &&
            dependentApiData?.gender?.label === 'Female'
          ? 1
          : dependentApiData?.dependentTypeID?.value,

      gender: dependentApiData?.gender?.label,
      Age: dependentApiData?.Age
        ? moment(dependentApiData.Age, 'D-MMM-YYYY').format('DDMMYYYY')
        : '',
    };

    console.log(dependentApiData?.gender?.label, 'gender value while going');
    console.log(_apiData, 'data going');

    if (
      !dependentApiData?.dependentName ||
      !dependentApiData?.gender?.label ||
      !dependentApiData?.dependentTypeID?.value ||
      !dependentApiData?.Age
    ) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all require feildsss"`,
          detail:
            'An error has occurred, please fill all require feilds. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      if (isUpdate) {
        // trigger(_apiData);
        setConfirmationModal(true);
        setConfirmatonType('update');
      } else {
        console.log(_apiData, 'usman');
        trigger(_apiData);
        // setConfirmationModal(true);
        // setConfirmatonType('update');
      }
    }
  };

  const handleCancel = () => {
    navigation.navigate('Personal');
  };

  const resetStates = () => {
    navigation.navigate('Personal');
  };

  return {
    states: {
      genderOptions,
      relationsOptions,
      dependentApiData,
      addDependentLoading,
      confirmationModal,
      dependentData,
      dependentIndex,
      confirmationType,
      isUpdate,
    },
    functions: {
      onPressSubmit,
      dependentSetterForApiData,
      setConfirmationModal,
      resetStates,
      handleCancel,
      formatAgeToDate,
      handleSubmitRequest,
    },
  };
};

export default useAddDependentViewModal;
