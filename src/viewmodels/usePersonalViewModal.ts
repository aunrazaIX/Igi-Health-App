type UsePersonalViewModal = {
  states: {
    data: DependentDetail[];
  };
};

type DependentDetail = {
  label: string;
  value: string;
};

const usePersonalViewModal = (): UsePersonalViewModal => {
  const data: DependentDetail[] = [
    {label: 'Name:', value: 'Madiha Imran Qureshi'},
    {label: 'Gender:', value: 'Female'},
    {label: 'Relationship:', value: 'Wife'},
    {label: 'Age:', value: '35 Years'},
  ]

  return {
    states: {
      data,
    },
  };
};

export default usePersonalViewModal;
