import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {useDispatch} from 'react-redux';
import {setTreatments} from '../redux/lodgeSlice';
import {setErrorModal} from '../redux/generalSlice';

const useAddTreatmentModel = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const {setterForApiData, apiData} = useErrorHandlingHook({
    treatment: {},
    receiptNumber: '',
    amount: '',
    description: '',
  });
  const {loading, data: opdTypes} = useApiHook({
    apiEndpoint: endpoints.treatments.getTypes,
    method: 'get',
    transform: {
      keyToLoop: 'Data',
      label: 'ClaimsSubTypeName',
      value: 'ClaimsSubTypeID',
    },
  });

  const onPressAddTreatment = () => {
    if (!apiData?.treatment?.label) {
      dispatch(setErrorModal({show: true, message: 'Please select treatment'}));
      return;
    }
    if (!apiData?.receiptNumber) {
      dispatch(
        setErrorModal({show: true, message: 'Please enter receipt number'}),
      );
      return;
    }
    if (!apiData?.amount) {
      dispatch(
        setErrorModal({
          show: true,
          message: 'Please enter amount',
        }),
      );
      return;
    }
    if (!apiData?.description) {
      dispatch(
        setErrorModal({
          show: true,
          message: 'Please enter description',
        }),
      );
      return;
    }
    const treatmentObj = {
      treatment: apiData?.treatment,
      receiptNumber: apiData?.receiptNumber,
      amount: apiData?.amount,
      description: apiData?.description,
    };
    dispatch(setTreatments([treatmentObj]));
    navigation.navigate('LodgeClaimProcess');
  };

  return {
    states: {
      loading,
      opdTypes,
      apiData,
    },
    functions: {
      setterForApiData,
      onPressAddTreatment,
    },
  };
};

export default useAddTreatmentModel;
