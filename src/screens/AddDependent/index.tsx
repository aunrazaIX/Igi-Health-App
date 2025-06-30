import useAddDependentViewModal from '../../viewmodels/useAddDependentViewModel';
import AddDependentView from '../../views/AddDependentView';

const AddDependent = ({navigation, route}: {navigation: any; route: any}) => {
  const {states, functions} = useAddDependentViewModal({navigation, route});

  const {
    relationsOptions,
    dependentApiData,
    genderOptions,
    confirmationModal,
    addDependentLoading,
    dependentData,
    dependentIndex,
    dependantsData,
    confirmationType,
    isUpdate,
  } = states;
  const {
    onPressSubmit,
    dependentSetterForApiData,
    setConfirmationModal,
    resetStates,
    handleCancel,
    formatAgeToDate,
    handleSubmitRequest,
  } = functions;

  return (
    <>
      <AddDependentView
        genderOptions={genderOptions}
        dependentApiData={dependentApiData}
        relationsOptions={relationsOptions}
        onPressSubmit={onPressSubmit}
        dependentSetterForApiData={dependentSetterForApiData}
        setConfirmationModal={setConfirmationModal}
        confirmationModal={confirmationModal}
        resetStates={resetStates}
        addDependentLoading={addDependentLoading}
        dependentData={dependentData}
        dependentIndex={dependentIndex}
        dependantsData={dependantsData}
        handleCancel={handleCancel}
        formatAgeToDate={formatAgeToDate}
        confirmatonType={confirmationType}
        handleSubmitRequest={handleSubmitRequest}
        isUpdate={isUpdate}
      />
    </>
  );
};

export default AddDependent;
