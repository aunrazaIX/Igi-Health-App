import useAddDependentViewModal from '../../viewmodels/useAddDependentViewModel';
import AddDependentView from '../../views/AddDependentView';

const AddDependent = () => {
  const {states, functions} = useAddDependentViewModal();
  const {relationsOptions, dependentApiData, genderOptions} = states;
  const {onPressSubmit, dependentSetterForApiData} = functions;

  return (
    <AddDependentView
      genderOptions={genderOptions}
      dependentApiData={dependentApiData}
      relationsOptions={relationsOptions}
      onPressSubmit={onPressSubmit}
      dependentSetterForApiData={dependentSetterForApiData}
    />
  );
};

export default AddDependent;
