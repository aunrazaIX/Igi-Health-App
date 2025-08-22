import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {icons} from '../assets';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';

const usePriorApprovalHistoryViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [type, setType] = useState(
    user?.coverageType?.some(obj => obj?.isAllowed !== true)
      ? 'Processed'
      : 'In-Process',
  );
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');

  const isInProcessAllowed = user?.showPriorApproval;

  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);

  const getHeadingSubHeading = useMemo(() => {
    return {
      'In-Process': {
        heading: 'In-Process Prior Approvals',
        messsage:
          'Prior Approvals initiated via the app or portal that are currently being evaluated.',
      },
      Processed: {
        heading: 'Processed Prior Approvals',
        messsage:
          'All finalized Prior Approvals, including hospital visits, reimbursements, rejections and portal submissions.',
      },
    };
  }, []);

  const transformClaimData = (claim, isInProcess) => ({
    headerLabel: `Claim #${claim.RequestID}`,
    ClaimStatus: claim.RequestSatus,
    headerIcon: icons.taskEdit,
    RelationName: claim.RelationName,
    items: [
      {
        label: 'Patient Name:',
        value: claim.UserRelationName
          ? formatName(claim.UserRelationName.trim())
          : '--',
      },
      claim.RequestAddedDateTime && {
        label: 'Admission/Procedure Date:',
        value: moment(
          claim.RequestAddedDateTime,
          isInProcess ? 'YYYY-MMM-DD' : 'YYYY-MM-DD',
        ).format('DD-MMM-YYYY'),
      },
      {label: 'Treatment Type:', value: claim?.TreatmentTypeName},
      {
        label: 'Hospital Name:',
        value: claim?.HospitalName,
      },
      {label: 'Status:', value: claim.RequestStatus},
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
    skip: !isInProcessAllowed,
    onSuccess: res => {
      setData(res?.Data?.map(claim => transformClaimData(claim, false)));
    },
  });

  const {loading: claimDataLoading, trigger: geInProcessClaims} = useApiHook({
    apiEndpoint: endpoints.PriorApprovalHistory.getPriorApprovalRequests,
    method: 'get',
    argsOrBody: {userid: user?.UserId},
    skip: isInProcessAllowed,
    onSuccess: res => {
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
      isInProcessAllowed,
    },
    functions: {
      goBack,
      onPressType,
      onCloseRemarksModal,
    },
  };
};

export default usePriorApprovalHistoryViewModel;
