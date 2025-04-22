import {useState} from 'react';

export type AmountStatus = 'paidAmount' | 'PendingAmount';
export type daysStatus = 'Daily' | 'Monthly' | 'Yearly';

export type ClaimHistory = {
  label: string;
  value: string;
};

 type UseClaimsHistoryViewModel = {
  states: {
    data: ClaimHistory[][];
    amountStatusTab: AmountStatus;
    daysStatusTab: daysStatus;
    isCalendarVisible: boolean;
  };
  functions: {
    onPressAmountStatusTab: (tab: AmountStatus) => void;
    onPressDaysStatusTab: (tab: daysStatus) => void;
    onPressHeaderIcon: () => void;
  };
};

const useClaimsHistoryViewModel = (): UseClaimsHistoryViewModel => {
  const [amountStatusTab, setAmountStatusTab] =
    useState<AmountStatus>('paidAmount');

  const [daysStatusTab, setDaysStatusTab] = useState<daysStatus>('Daily');
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  const onPressAmountStatusTab = (tab: AmountStatus) => {
    setAmountStatusTab(tab);
  };

  const onPressDaysStatusTab = (tab: daysStatus) => {
    setDaysStatusTab(tab);
  };

  const onPressHeaderIcon = () => {
    setIsCalendarVisible(prev => !prev);
  };

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
      amountStatusTab,
      daysStatusTab,
      isCalendarVisible,
    },
    functions: {
      onPressAmountStatusTab,
      onPressDaysStatusTab,
      onPressHeaderIcon,
    },
  };
};

export default useClaimsHistoryViewModel;
