import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {icons} from '../assets';
import moment from 'moment';
import {formatCurrencyWithPKR} from '../utils';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useClaimsHistoryViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [type, setType] = useState('In-Process');
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Approved');
  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);
  const tabs = ['Approved', 'Pending', 'Rejected'];
  const statusId = {
    Approved: 3,
    Pending: 2,
    Rejected: 4,
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
      headerLabel: `Claim #${claim.claimId}`,
      claimStatus: claim?.status,
      headerIcon: icons.taskEdit,
      RelationName: claim?.patientName,
      items: [
        {
          label: 'Patient Name:',
          value: claim?.patientName,
        },
        {
          label: 'Submitted Date:',
          value: moment(claim?.createdOn).format('DD-MMM-YYYY'),
        },
        {label: 'Status:', value: claim?.status},
        claim?.paidDate && {
          label: 'Claim Paid Date:',
          value: moment(claim?.paidDate).format('DD-MMM-YYYY'),
        },
        {
          label: 'Diagnosis:',
          value: claim?.claimDescription,
        },
        {
          label: 'Amount Claimed:',
          value: formatCurrencyWithPKR(amountClaimed),
        },
        {
          label: 'Amount Paid:',
          value: formatCurrencyWithPKR(claim?.totalAmountPaid),
        },
        {
          label: 'Amount Deducted:',
          value: formatCurrencyWithPKR(amountDeducted),
        },
        claim?.deductionReason && {
          label: 'Deduction Reason:',
          value: claim?.deductionReason,
        },
        (isInProcess ? claim?.comments : claim?.DeductionReason) && {
          label: 'Claim Remarks:',
          value: 'View Remarks',
          isUnderLine: true,
          onPress: () => {
            setShowRemarks(true);
            setRemarks(isInProcess ? claim?.comments : claim?.DeductionReason);
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
      statusId: statusId[selectedStatus],
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

  useEffect(() => {
    if (type === 'Processed') {
      setData([]);
      return;
    }
    setSearchText('');
    trigger();
  }, [type, selectedStatus]);

  const onSelectTab = tab => {
    setSelectedStatus(tab);
  };
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
      claimDataLoading,
      type,
      showRemarks,
      remarks,
      getHeadingSubHeading,
      searchText,
      tabs,
      selectedStatus,
    },
    functions: {
      goBack,
      onPressType,
      onCloseRemarksModal,
      setSearchText,
      onSelectTab,
    },
  };
};

export default useClaimsHistoryViewModel;
