export type UsePersonalModalTypes = {
    genderRelationStates: {
      gender: personalDetail[];
      relation: personalDetail[];
    };
  };

export type personalDetail = {
  id: number;
  name: string;
};
