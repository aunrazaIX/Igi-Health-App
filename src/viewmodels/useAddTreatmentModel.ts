import {useEffect, useState} from 'react';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

const useAddTreatmentModel = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {allTreatments} = route?.params || {};
  const [treatments, setTreatments] = useState([]);
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

  useEffect(() => {
    if (allTreatments) {
      setTreatments(allTreatments);
    } else {
      setTreatments([]);
    }
  }, [allTreatments]);

  const onPressAddTreatment = () => {
    if (!apiData?.treatment) {
      return;
    }
    if (!apiData?.receiptNumber) {
      return;
    }
    if (!apiData?.amount) {
      return;
    }
    if (!apiData?.description) {
      return;
    }
    const treatmentObj = {
      treatment: apiData?.treatment,
      receiptNumber: apiData?.receiptNumber,
      amount: apiData?.amount,
      description: apiData?.description,
    };
    navigation.popTo('LodgeClaimProcess', {
      treatments: [...treatments, treatmentObj],
      stepFromTreatment: 2,
    });
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
