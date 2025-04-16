type PatientSelectViewModal = {
  state: {
    selectData: PatientSelect[];
  };
};

type PatientSelect = {
  id: number;
  name: string;
};

const patientSelectViewModal = (): PatientSelectViewModal => {
  const selectData: PatientSelect[] = [
    {id: 1, name: 'Imran Naveed Qureshi'},
    {id: 2, name: 'Madiha Imran Qureshi'},
    {id: 3, name: 'Saad Imran Qureshi'},
  ];

  return {
    state: {
        selectData,
    },
  };
};

export default patientSelectViewModal;
