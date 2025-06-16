import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {icons} from '../assets';
import {ImageSourcePropType} from 'react-native';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import useApiHook from '../hooks/useApiHook';
import moment from 'moment';

export type AmountStatus = 'paidAmount' | 'PendingAmount';
export type daysStatus = 'Daily' | 'Monthly' | 'Yearly';

export type ClaimHistoryGroup = {
  headerLabel: string;
  headerIcon: ImageSourcePropType;
  items: ClaimHistory[];
};
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
    claimDataLoading: boolean;
  };
  functions: {
    onPressAmountStatusTab: (tab: AmountStatus) => void;
    onPressDaysStatusTab: (tab: daysStatus) => void;
    onPressHeaderIcon: () => void;
    goBack: () => void;
  };
};

const useClaimsHistoryViewModel = (): UseClaimsHistoryViewModel => {
  const {user} = useSelector((state: RootState) => state.auth);
  const {treatments} = useSelector((state: RootState) => state.lodge);
  const navigation = useNavigation();
  const [amountStatusTab, setAmountStatusTab] =
    useState<AmountStatus>('paidAmount');
  const [daysStatusTab, setDaysStatusTab] = useState<daysStatus>('Daily');
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [data, setData] = useState([]);
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
  };

  const {data: claimData, loading: claimDataLoading} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getAllClaim,
    method: 'get',
    argsOrBody: {userid: '776'},
    onSuccess: res => {
      setData(
        res?.Data?.map(item => ({
          headerLabel: `Claim #${item.ClaimID}`,
          headerIcon: icons.taskEdit,
          items: [
            {label: 'Patient Name:', value: item?.RelationName.trim('')},
            {label: 'Services Date:', value: item?.ClaimSubmittedDate},
            {label: 'Claim Type:', value: item?.ClaimsSubTypeName},
            {label: 'Claims Remarks:', value: item?.ClaimsDescription},
            {label: 'Claim Value:', value: item?.SubmiitedClaim},
            {label: 'Status:', value: item?.ClaimStatusName},
          ],
        })),
      );
    },
  });

  const filterByClaimStatus = useMemo(() => {
    return data?.filter(claim => {
      const temp = claim?.items[5];
      if (!temp?.value) return false;
      const statusValue = temp?.value;
      return amountStatusTab === 'paidAmount'
        ? statusValue === 8
        : statusValue !== 8;
    });
  }, [data, amountStatusTab]);

  const filterDataByTime = useMemo(() => {
    return filterByClaimStatus?.filter(claim => {
      const temp = claim?.items[1];
      if (!temp?.value) return false;
      const claimDate = moment(temp?.value, 'YYYY-MM-DD');
      if (daysStatusTab === 'Daily') {
        return claimDate.isSame(moment(), 'day');
      } else if (daysStatusTab === 'Monthly') {
        return claimDate.isSame(moment(), 'month');
      } else if (daysStatusTab === 'Yearly') {
        return claimDate.isSame(moment(), 'year');
      }
      return true;
    });
  }, [daysStatusTab, filterByClaimStatus]);

  return {
    states: {
      data: filterDataByTime,
      amountStatusTab,
      daysStatusTab,
      isCalendarVisible,
      claimDataLoading,
    },
    functions: {
      onPressAmountStatusTab,
      onPressDaysStatusTab,
      onPressHeaderIcon,
      goBack,
    },
  };
};

export default useClaimsHistoryViewModel;
