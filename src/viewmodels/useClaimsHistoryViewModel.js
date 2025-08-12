import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {icons} from '../assets';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';

const useClaimsHistoryViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const [type, setType] = useState('In-Process');
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');

  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);

  const getHeadingSubHeading = useMemo(() => {
    return {
      'In-Process': {
        heading: 'In-Process Claims',
        messsage:
          'Claims initiated via the app or portal that are currently being evaluated.',
      },
      Processed: {
        heading: 'Processed Claims',
        messsage:
          'All finalized claims from our system, including hospital visits, reimbursements, and portal submissions.',
      },
    };
  }, []);

  const transformClaimData = (claim, isInProcess) => ({
    headerLabel: `Claim #${claim.ClaimID}`,
    ClaimStatus: claim.ClaimStatus,
    headerIcon: icons.taskEdit,
    RelationName: claim.RelationName,
    items: [
      {
        label: 'Patient Name:',
        value: claim.RelationName
          ? formatName(claim.RelationName.trim())
          : '--',
      },
      claim.ClaimSubmittedDate && {
        label: 'Incurred Date:',
        value: moment(
          claim.ClaimSubmittedDate,
          isInProcess ? 'YYYY-MMM-DD' : 'YYYY-MM-DD',
        ).format('DD-MMM-YYYY'),
      },
      claim.ClaimReceivedDate && {
        label: 'Received Date:',
        value: moment(
          claim.ClaimReceivedDate,
          isInProcess ? 'YYYY-MMM-DD' : 'YYYY-MM-DD',
        ).format('DD-MMM-YYYY'),
      },
      claim.ActionClosed && {
        label: 'Claim Paid Date:',
        value: moment(claim.ActionClosed, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
      },
      {label: 'Claim Type:', value: claim.ClaimsSubTypeName},

      {label: 'Status:', value: claim.ClaimStatusName},
      {
        label: 'Provider Name:',
        value: claim?.Provider_Name ? claim?.Provider_Name?.trim('') : '--',
      },
      {
        label: 'Diagnosis:',
        value: claim?.Diagnosis_Desc ? claim?.Diagnosis_Desc?.trim('') : '--',
      },
      {
        label: 'Mode of Payment:',
        value: claim?.Payment_type ? claim?.Payment_type?.trim('') : '--',
      },
      {
        label: 'Amount Claimed',
        value: formatCurrencyWithPKR(claim.SubmiitedClaim),
      },
      {
        label: 'Amount Paid',
        value: formatCurrencyWithPKR(claim.TotalPaid),
      },
      claim.ClaimStatus == '8' && {
        label: 'Amount Deducted',
        value: formatCurrencyWithPKR(claim.DeductedAmount),
      },
      (isInProcess ? claim.ClaimsDescription : claim.DeductionReason) && {
        label: 'Claim Remarks:',
        value: 'View Remarks',
        isUnderLine: true,
        onPress: () => {
          setShowRemarks(true);
          setRemarks(
            isInProcess ? claim.ClaimsDescription : claim.DeductionReason,
          );
        },
      },
    ].filter(Boolean),
  });

  const {loading: dxcClaimLoading, trigger: getDxcClaims} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getDxcClaims,
    method: 'get',
    argsOrBody: {userid: user?.UserId},
    skip: true,
    onSuccess: res => {
      console.log(res, 'resClaims');
      setData(res?.Data?.map(claim => transformClaimData(claim, false)));
    },
  });

  const {loading: claimDataLoading, trigger: geInProcessClaims} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getAllClaim,
    method: 'get',
    argsOrBody: {userid: user?.UserId},
    onSuccess: res => {
      console.log(res, 'resProcess');
      setData(res?.Data?.map(claim => transformClaimData(claim, true)));
    },
  });

  const onPressType = _type => {
    setType(_type);
    setData([]);
    _type === 'Processed' ? getDxcClaims() : geInProcessClaims();
  };

  return {
    states: {
      data,
      claimDataLoading: claimDataLoading || dxcClaimLoading,
      type,
      showRemarks,
      remarks,
      getHeadingSubHeading,
    },
    functions: {
      goBack,
      onPressType,
      onCloseRemarksModal,
    },
  };
};

export default useClaimsHistoryViewModel;
