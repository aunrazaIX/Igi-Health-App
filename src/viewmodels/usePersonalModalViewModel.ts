import { personalDetail, UsePersonalModalTypes } from "../types/personalTypes";


const usePersonalModalViewModel = (): UsePersonalModalTypes => {
  const gender: personalDetail[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  const relation: personalDetail[] = [
    { id: 1, name: 'Father' },
    { id: 2, name: 'Son' },
    { id: 3, name: 'Husband' },
  ];

  return {
    genderRelationStates: {
      gender,
      relation,
    },
  };
};

export default usePersonalModalViewModel;
