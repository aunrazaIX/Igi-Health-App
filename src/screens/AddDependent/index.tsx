import useAddDependentViewModal from '../../viewmodels/useAddDependentViewModel';
import AddDependentView from '../../views/AddDependentView';

const AddDependent = () => {
  const { states, functions } = useAddDependentViewModal();
  const { relationsOptions, dependentApiData, genderOptions, confirmationModal, addDependentLoading } = states;
  const { onPressSubmit, dependentSetterForApiData, setConfirmationModal, resetStates } = functions;

  return (
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


    />
  );
};

export default AddDependent;
