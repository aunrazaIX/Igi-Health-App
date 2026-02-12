import React from 'react';
import AddTreatmentView from '../../views/AddTreatmentView';
import useAddTreatmentModel from '../../viewmodels/useAddTreatmentModel';

const AddTreatment = ({
  navigation,
  route,
}) => {
  const {states, functions} = useAddTreatmentModel({navigation, route});
  const {
    treatmentTypes,
    apiData,
    treatmentIndex,
    isError,
    confirmationModal,
    loading,
    claimType,
  } = states;
  const {
    setterForApiData,
    onPressAddTreatment,
    setConfirmationModal,
  } = functions;
  return (
    <AddTreatmentView
      apiData={apiData}
      setterForApiData={setterForApiData}
      onPressAddTreatment={onPressAddTreatment}
      treatmentIndex={treatmentIndex}
      isError={isError}
      treatmentTypes={treatmentTypes}
      confirmationModal={confirmationModal}
      setConfirmationModal={setConfirmationModal}
      loading={loading}
      claimType={claimType}
    />
  );
};

export default AddTreatment;
