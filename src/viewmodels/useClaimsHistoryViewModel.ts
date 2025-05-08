import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { icons } from '../assets';
import { ImageSourcePropType } from 'react-native';



export type AmountStatus = 'paidAmount' | 'PendingAmount';
export type daysStatus = 'Daily' | 'Monthly' | 'Yearly';



export type ClaimHistoryGroup = {
  headerLabel: string;
  headerIcon: ImageSourcePropType,
  items: ClaimHistory[];
}
export type ClaimHistory = {
  label: string;
  value: string;
};

type UseClaimsHistoryViewModel = {
  states: {
    data: ClaimHistoryGroup[];
    amountStatusTab: AmountStatus;
    daysStatusTab: daysStatus;
    isCalendarVisible: boolean;
  };
  functions: {
    onPressAmountStatusTab: (tab: AmountStatus) => void;
    onPressDaysStatusTab: (tab: daysStatus) => void;
    onPressHeaderIcon: () => void;
    goBack: () => void
  };
};

const useClaimsHistoryViewModel = (): UseClaimsHistoryViewModel => {
  const [amountStatusTab, setAmountStatusTab] =
    useState<AmountStatus>('paidAmount');

  const [daysStatusTab, setDaysStatusTab] = useState<daysStatus>('Daily');
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const onPressAmountStatusTab = (tab: AmountStatus) => {
    setAmountStatusTab(tab);
  };

  const onPressDaysStatusTab = (tab: daysStatus) => {
    setDaysStatusTab(tab);
  };

  const onPressHeaderIcon = () => {
    setIsCalendarVisible(prev => !prev);
  };

  const goBack = () => {
    navigation.goBack();
  }



  const data: ClaimHistoryGroup[] = [
    {
      headerLabel: 'Claim #00714886',
      headerIcon: icons.taskEdit,
      items: [
        { label: 'name:', value: 'Heart & General Hospital' },
        { label: 'phone:', value: '81-2822408, 081-2822409' },
        { label: 'Address:', value: '15D, 16D, Model Town, Old Pishin Bus Stop, Quetta' },
        { label: 'City:', value: 'Baluchistan, Quetta' },
      ],
    },




    {
      headerLabel: 'Claim #00734894',
      headerIcon: icons.taskEdit,
      items: [
        { label: 'name:', value: 'NICVD Larkana' },
        { label: 'phone:', value: '---' },
        { label: 'Address:', value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana' },
        { label: 'City:', value: 'Larkana' },
      ],
    },


    {
      headerLabel: 'Claim #00714886',
      headerIcon: icons.taskEdit,
      items: [
        { label: 'name:', value: 'NICVD Larkana' },
        { label: 'phone:', value: '---' },
        { label: 'Address:', value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana' },
        { label: 'City:', value: 'Hyderabad' },
      ],
    },


    {
      headerLabel: 'Claim #00714886',
      headerIcon: icons.taskEdit,
      items: [
        { label: 'name:', value: 'NICVD Larkana' },
        { label: 'phone:', value: '---' },
        { label: 'Address:', value: 'Department of Cardiology, Civil Hospital, VIP Road, Larkana' },
        { label: 'City:', value: 'Hyderabad' },
      ],
    },


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
      goBack
    },
  };
};

export default useClaimsHistoryViewModel;
