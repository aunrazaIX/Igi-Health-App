export type ClaimHistory = {
  label: string;
  value: string;
};

type UseClaimsHistoryViewModel = {
  states: {
    data: ClaimHistory[][];
  };
};

const useClaimsHistoryViewModel = (): UseClaimsHistoryViewModel => {
  const data: ClaimHistory[][] = [
    [
      {label: 'Claim:', value: '0071453'},
      {label: 'Approved Value:', value: '6140.0'},
      {label: 'Patient Name:', value: 'Imran Naveed Qureshi'},
      {label: 'Services Date:', value: '23/01/2021'},
      {label: 'Claim Type:', value: 'IPD'},
      {label: 'Claim Number:', value: '00714886'},
      {label: 'Claim Value:', value: '6210.0'},
      {label: 'Cheque Number:', value: '18745'},
      {label: 'Status:', value: 'Claim Payment Processed'},
    ],
    [
      {label: 'Claim:', value: '0071453'},
      {label: 'Approved Value:', value: '6140.0'},
      {label: 'Patient Name:', value: 'Imran Naveed Qureshi'},
      {label: 'Services Date:', value: '23/01/2021'},
      {label: 'Claim Type:', value: 'IPD'},
      {label: 'Claim Number:', value: '00714886'},
      {label: 'Claim Value:', value: '6210.0'},
      {label: 'Cheque Number:', value: '18745'},
      {label: 'Status:', value: 'Claim Payment Processed'},
    ],
  ];

  return {
    states: {
      data,
    },
  };
};

export default useClaimsHistoryViewModel;
