import {useDispatch, useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {personalDetail, UsePersonalModalTypes} from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {RootState} from '../redux/store';
import {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import {DetailsContainer} from '../components';
import moment from 'moment';
import {formatName} from '../utils';

const useAddDependentViewModal = ({route}): UsePersonalModalTypes => {
  let {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {dependentData, dependentIndex, isUpdate} = route?.params || {};
  const navigation = useNavigation();
  const [confirmationType, setConfirmatonType] = useState('');
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [relationsOptions, setRelationsOptions] = useState([]);
  console.log(isUpdate, 'isUpdate');
  const {data: _relationsOptions} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependentType,
    method: 'get',
    onSuccess: res => {
      console.log(res);
      setRelationsOptions(
        !isUpdate
          ? res
              ?.map(item =>
                item?.DependentTypeName !== 'Mother' &&
                item?.DependentTypeName !== 'Father'
                  ? item
                  : null,
              )
              .filter(Boolean)
              .map(item => ({
                label: item?.DependentTypeName,
                value: item?.DependentTypeID,
              }))
          : res.map(item => ({
              label: item?.DependentTypeName,
              value: item?.DependentTypeID,
            })),
      );
    },
  });

  let prefilledData = useMemo(() => {
    let temp = relationsOptions?.find(
      item =>
        item?.DependentTypeName === dependentData?.dependentDetail[2]?.value,
    );
    return {
      dependentName: formatName(dependentData?.dependentDetail[0]?.value),
      gender: {
        label: dependentData?.dependentDetail[1]?.value,
        value: dependentData?.dependentDetail[1]?.value,
      },
      relationship: {
        label: dependentData?.dependentDetail[2]?.value,
        value: temp,
      },
      age: dependentData?.dependentDetail[3]?.value,
    };
  }, [relationsOptions]);

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
    dependentName: prefilledData?.dependentName ?? null,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: {
      label: prefilledData?.relationship?.label,
      value: prefilledData?.relationship?.value?.value,
    },
    dependentRequestTypesID: dependentIndex ? 2 : 1,
    dependentRequestID: '0',
    gender: {
      label: prefilledData?.gender?.label,
      Value: prefilledData?.gender?.value,
    },
    Age: prefilledData?.age?.toString() ?? null,
    dependentRequestStatus: true,
    createdBy: user?.UserId,
  });

  const genderOptions: personalDetail[] = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];
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
      console.log(error, 'error');
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Something Went Wrong',
          detail:
            'An error has occurred, please fill all require fields. If the problem persists, contact IGI Life',
        }),
      );
    },
  });

  const handleSubmitRequest = () => {
    const filled = dependentCheckForError();
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
    if (!filled) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all required fields"`,
          detail:
            'An error has occurred, please fill all required feilds. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      trigger(_apiData);
    }
  };
  console.log(addDependentLoading, 'addDependentLoading');

  const onPressSubmit = () => {
    const filled = dependentCheckForError();
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

    if (!filled) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all required fields"`,
          detail:
            'An error has occurred, pleased fill all require fields. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      if (isUpdate) {
        // trigger(_apiData);

        setConfirmationModal(true);
        setConfirmatonType('update');
      } else {
        trigger(_apiData);
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
