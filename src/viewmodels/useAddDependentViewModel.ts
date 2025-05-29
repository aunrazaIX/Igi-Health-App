import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {personalDetail, UsePersonalModalTypes} from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {RootState} from '../redux/store';

const useAddDependentViewModal = (): UsePersonalModalTypes => {
  const {user} = useSelector((state: RootState) => state.auth);

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    dependentName: null,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: null,
    dependentRequestTypesID: 1,
    dependentRequestID: 0,
    gender: null,
    Age: null,
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

  const {trigger, loading} = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
  });

  const onPressSubmit = () => {
    const filled = dependentCheckForError();
    if (!filled) return;
    let _apiData = {
      ...dependentApiData,
      dependentTypeID: dependentApiData?.dependentTypeID?.value,
      gender: dependentApiData?.gender?.value,
    };
    trigger(_apiData);
  };

  return {
    states: {
      genderOptions,
      relationsOptions,
      dependentApiData,
    },
    functions: {
      onPressSubmit,
      dependentSetterForApiData,
    },
  };
};

export default useAddDependentViewModal;
