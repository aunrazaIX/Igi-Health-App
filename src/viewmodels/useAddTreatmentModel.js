import {useDispatch, useSelector} from 'react-redux';
import {setTreatments, updateTreatments} from '../redux/lodgeSlice';
import {useState} from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useAddTreatmentModel = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isError, selectedType} = useSelector(
    state => state?.lodge?.modules[state.lodge.activeModule],
  );
  const [confirmationModal, setConfirmationModal] = useState(false);
  const {treatmentIndex, treatmentData, claimType} = route?.params || {};
  const [treatmentTypes, setTreatmentTypes] = useState([]);

  const extractedData = {
    treatment: treatmentData?.treatment,
    admissionDate: treatmentData?.info?.[1]?.value,
    amount: treatmentData?.info?.[2]?.value,
    description: treatmentData?.info?.[3]?.value,
  };

  const {setterForApiData, apiData} = useErrorHandlingHook({
    treatment: extractedData.treatment,
    admissionDate: extractedData.admissionDate,
    amount: extractedData.amount,
    description: extractedData.description,
  });
  const {data} = useApiHook({
    apiEndpoint: endpoints.priorApproval.GetPriorApprovalServices,
    method: 'get',
    onSuccess: res => {
      const formatted = res?.data?.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setTreatmentTypes(formatted);
    },
  });

  const loading = false;
  const error = null;
  const onPressAddTreatment = () => {
    const treatmentObj = {
      treatment: apiData?.treatment,
      admissionDate: apiData?.admissionDate,
      claimType: claimType,
      amount: apiData?.amount,
      description: apiData?.description,
    };

    if (typeof treatmentIndex === 'number') {
      dispatch(
        updateTreatments({
          index: treatmentIndex,
          data: apiData,
          navigateOnSuccess: () => {
            navigation.goBack();
          },
        }),
      );
    } else {
      dispatch(
        setTreatments({
          ...treatmentObj,
          navigateOnSuccess: () => {
            navigation.goBack();
          },
        }),
      );
    }
  };

  return {
    states: {
      loading,
      treatmentTypes,
      apiData,
      treatmentIndex,
      isError,
      confirmationModal,
      claimType,
      error,
    },
    functions: {
      setterForApiData,
      onPressAddTreatment,
      setConfirmationModal,
    },
  };
};

export default useAddTreatmentModel;
