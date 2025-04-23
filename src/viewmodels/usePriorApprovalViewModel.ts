import {icons} from '../assets';

type UsePriorApprovalViewModal = {
  states: {
    data: PriorApproval[];
  };
};

type PriorApproval = {
  sectionTitle: string;
  icon: string;
  data: LabelValue[];
};
type LabelValue = {
  label: string;
  value: string;
};

const usePriorViewModel = (): UsePriorApprovalViewModal => {
  const data: PriorApproval[] = [
    {
      sectionTitle: 'Personal Details',
      icon: icons.personalDetail,
      data: [
        {label: 'Name of Employee:', value: 'Imran Naveed Qureshi'},
        {label: 'Bank Name:', value: 'Bank Al Habib'},
        {label: 'Account Number:', value: '1234-5678-9101112-3'},
        {label: 'Bank IBAN:', value: 'PK47 XYZ 1234 5678 9101112 3 0'},
      ],
    },
    {
      sectionTitle: 'Claims Details',
      icon: icons.claimDetails,
      data: [
        {label: 'Services:', value: 'General OPD, Dental, Optical'},
        {label: 'Eligible Users:', value: 'Self, Spouse, Children'},
        {label: 'Reimbursement:', value: '28827'},
        {label: 'Total OPD:', value: '---'},
      ],
    },
  ];

  return {
    states: {
      data,
    },
  };
};

export default usePriorViewModel;
