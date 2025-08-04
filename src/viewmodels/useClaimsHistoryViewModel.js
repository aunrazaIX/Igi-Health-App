import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {icons} from '../assets';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import moment from 'moment';

const useClaimsHistoryViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [type, setType] = useState('In-Process');
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const goBack = () => {
    navigation.goBack();
  };

  const onPressType = _type => {
    setType(_type);

    if (_type == 'Processed') {
      getDxcClaims();
    }
    if (_type == 'In-Process') {
      geInProcessClaims();
    }
  };

  const {
    loading: dxcClaimLoading,
    data: _data,
    trigger: getDxcClaims,
  } = useApiHook({
    apiEndpoint: endpoints.claimHistory.getDxcClaims,
    method: 'get',
    argsOrBody: {userid: user?.UserId},
    skip: true,

    onSuccess: res => {
      setData(
        res?.Data?.map(item => ({
          headerLabel: `Claim #${item.ClaimID}`,
          ClaimStatus: item?.ClaimStatus,
          headerIcon: icons.taskEdit,
          RelationName: item.RelationName,
          items: [
            {label: 'Patient Name:', value: item?.RelationName.trim('')},
            item?.ClaimSubmittedDate && {
              label: 'Services Date:',
              value: moment(item?.ClaimSubmittedDate, 'YYYY-MM-DD').format(
                'DD-MMM-YYYY',
              ),
            },
            {label: 'Claim Type:', value: item?.ClaimsSubTypeName},

            {label: 'Status:', value: item?.ClaimStatusName},
            {label: 'Amount Claimed', value: item?.SubmiitedClaim},
            {label: 'Amount Paid', value: item?.TotalPaid},
            {label: 'Claims Remarks:', value: item?.ClaimsDescription},
          ].filter(Boolean),
        })),
      );
    },
  });

  console.log(_data);

  const {loading: claimDataLoading, trigger: geInProcessClaims} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getAllClaim,
    method: 'get',

    argsOrBody: {userid: user?.UserId},
    onSuccess: res => {
      setData(
        res?.Data?.map(item => ({
          headerLabel: `Claim #${item.ClaimID}`,
          ClaimStatus: item?.ClaimStatus,
          headerIcon: icons.taskEdit,
          RelationName: item.RelationName,
          items: [
            {label: 'Patient Name:', value: item?.RelationName.trim('')},
            {
              label: 'Services Date:',
              value: moment(item?.ClaimSubmittedDate, 'YYYY-MMM-DD').format(
                'DD-MMM-YYYY',
              ),
            },
            {label: 'Claim Type:', value: item?.ClaimsSubTypeName},

            {label: 'Status:', value: item?.ClaimStatusName},
            {label: 'Amount Claimed', value: item?.SubmiitedClaim},
            {label: 'Amount Paid', value: item?.TotalPaid},
            {label: 'Claims Remarks:', value: item?.ClaimsDescription},
          ],
        })),
      );
    },
  });

  return {
    states: {
      data,
      claimDataLoading: claimDataLoading || dxcClaimLoading,
      type,
    },
    functions: {
      goBack,
      onPressType,
    },
  };
};

export default useClaimsHistoryViewModel;
