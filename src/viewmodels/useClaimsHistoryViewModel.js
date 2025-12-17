import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {icons} from '../assets';
import moment from 'moment';
import {formatCurrencyWithPKR} from '../utils';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useClaimsHistoryViewModel = () => {
  const navigation = useNavigation();
  const [type, setType] = useState('In-Process');
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  //const [selectedStatus, setSelectedStatus] = useState('Approved');
  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);
  // const tabs = ['Approved', 'Pending', 'Rejected'];
  // const statusId = {
  //   Approved: 3,
  //   Pending: 2,
  //   Rejected: 4,
  // };
  const statusIconMap = {
    Approved: icons.claimPaid,
    Rejected: icons.rejected,
    Pending: icons.pending,
  };

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
          'All finalized claims, including hospital visits, reimbursements, rejections and portal submissions.',
      },
    };
  }, []);

  const transformClaimData = (claim, isInProcess) => {
    const amountClaimed = claim.claimTreatments?.reduce(
      (sum, t) => sum + (t.claimAmount || 0),
      0,
    );
    const amountDeducted = amountClaimed - (claim?.totalAmountPaid || 0);

    return {
      headerLabel: `Claim #${claim.claimId ?? claim?.claimID}`,
      claimStatus: claim?.status,
      headerIcon: icons.taskEdit,
      RelationName: isInProcess ? claim?.patientName : claim?.relationName,
      items: [
        {
          label: 'Patient Name:',
          value: claim?.patientName ?? claim.relationName.trim(),
        },
        {label: 'Status:', value: claim?.status ?? claim?.claimStatusName},
        {
          label: 'Claim Paid Date:',
          value: moment(claim?.paidDate ?? claim?.claimReceivedDate).format(
            'DD-MMM-YYYY',
          ),
        },
        claim?.provider_Name && {
          label: 'Provider Name:',
          value: claim?.provider_Name?.trim(''),
        },
        {
          label: 'Diagnosis:',
          value: claim?.claimDescription ?? claim?.diagnosis_Desc.trim(),
        },
        claim?.payment_type && {
          label: 'Mode of Payment:',
          value: claim?.payment_type?.trim(),
        },
        {
          label: 'Submitted Date:',
          value: moment(claim?.createdOn ?? claim?.claimSubmittedDate).format(
            'DD-MMM-YYYY',
          ),
        },
        {
          label: 'Amount Claimed:',
          value: formatCurrencyWithPKR(amountClaimed ?? claim?.submiitedClaim),
        },
        {
          label: 'Amount Paid:',
          value: formatCurrencyWithPKR(
            claim?.totalAmountPaid ?? claim?.totalPaid,
          ),
        },
        {
          label: 'Amount Deducted:',
          value: formatCurrencyWithPKR(amountDeducted ?? claim?.deductedAmount),
        },
        {
          label: 'Deduction Reason:',
          value: claim?.deductionReason,
        },

        (isInProcess ? claim?.comments : claim?.deductionReason) && {
          label: 'Claim Remarks:',
          value: 'View Remarks',
          isUnderLine: true,
          onPress: () => {
            setShowRemarks(true);
            setRemarks(isInProcess ? claim?.comments : claim?.deductionReason);
          },
        },
      ].filter(Boolean),
    };
  };
  const {loading: claimDataLoading, trigger} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getAllClaim,
    method: 'post',
    argsOrBody: {
      pagination: {
        isAllRecord: true,
      },
      // statusId: statusId[selectedStatus],
    },
    onSuccess: res => {
      {
        type === 'In-Process' &&
          setData(
            res?.data?.claims?.map(claim => transformClaimData(claim, true)),
          );
      }
    },
  });
  const {loading: dxcClaimLoading, trigger: getDxcClaims} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getDxcClaims,
    method: 'post',
    argsOrBody: {
      isAllRecord: true,
    },
    onSuccess: res => {
      console.log(res);
      type === 'Processed' &&
        setData(res?.data?.map(claim => transformClaimData(claim, false)));
    },
  });
  useEffect(() => {
    setSearchText('');
    setData([]);
    if (type === 'Processed') {
      getDxcClaims();
    } else {
      trigger();
    }
  }, [type]); //[type, selectedStatus]

  // const onSelectTab = tab => {
  //   setSelectedStatus(tab);
  // };
  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    let currentData = data;
    if (searchText.trim()) {
      currentData = currentData.filter(
        item =>
          item.headerLabel?.toLowerCase().includes(lowerText) ||
          item.items?.some(subItem =>
            subItem.value?.toLowerCase().includes(lowerText),
          ),
      );
    }
    setData(currentData);
  }, [searchText]);

  const onPressType = _type => {
    setType(_type);
  };

  return {
    states: {
      data,
      claimDataLoading: claimDataLoading || dxcClaimLoading,
      type,
      showRemarks,
      remarks,
      getHeadingSubHeading,
      searchText,
      statusIconMap,
      // tabs,
      // selectedStatus,
    },
    functions: {
      goBack,
      onPressType,
      onCloseRemarksModal,
      setSearchText,
      // onSelectTab,
    },
  };
};

export default useClaimsHistoryViewModel;
