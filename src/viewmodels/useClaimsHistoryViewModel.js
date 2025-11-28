import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {icons} from '../assets';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';
import {useSelector} from 'react-redux';

const useClaimsHistoryViewModel = () => {
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
  const [allData, setAllData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const isInProcessAllowed = user?.coverageType?.some(
    obj => obj?.isAllowed !== true,
  );

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
          'All finalized claims, including hospital visits, reimbursements, rejections and portal submissions.',
      },
    };
  }, []);

  const transformClaimData = (claim, isInProcess) => ({
    headerLabel: `Claim #${claim.ClaimID}`,
    ClaimStatus: claim.ClaimStatus,
    headerIcon: icons.taskEdit,
    RelationName: claim?.RelationName
      ? formatName(claim?.RelationName.trim())
      : '--',
    items: [
      {
        label: 'Patient Name:',
        value: claim.RelationName
          ? formatName(claim.RelationName.trim())
          : '--',
      },
      claim.ClaimSubmittedDate && {
        label: 'Incurred Date:',
        value: moment(claim.ClaimSubmittedDate).format('DD-MMM-YYYY'),
      },
      claim.ClaimReceivedDate && {
        label: 'Received Date:',
        value: moment(claim.ClaimReceivedDate).format('DD-MMM-YYYY'),
      },
      claim.ActionClosed && {
        label: 'Claim Paid Date:',
        value: moment(claim.ActionClosed).format('DD-MMM-YYYY'),
      },
      {label: 'Claim Type:', value: claim.ClaimsSubTypeName},
      {label: 'Status:', value: claim.ClaimStatusName},
      {
        label: 'Provider Name:',
        value: claim?.Provider_Name ? claim.Provider_Name.trim() : '--',
      },
      {
        label: 'Diagnosis:',
        value: claim?.Diagnosis_Desc ? claim.Diagnosis_Desc.trim() : '--',
      },
      {
        label: 'Mode of Payment:',
        value: claim?.Payment_type ? claim.Payment_type.trim() : '--',
      },
      {
        label: 'Amount Claimed',
        value: formatCurrencyWithPKR(claim.SubmiitedClaim),
      },
      {label: 'Amount Paid', value: formatCurrencyWithPKR(claim.TotalPaid)},
      claim.ClaimStatus === '8' && {
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

  const hardcodedClaims = [
    {
      ClaimID: '1001',
      ClaimStatus: 'In-Process',
      RelationName: 'John Doe',
      ClaimSubmittedDate: '2025-10-01',
      ClaimReceivedDate: '2025-10-05',
      ActionClosed: '2025-10-10',
      ClaimsSubTypeName: 'Hospitalization',
      ClaimStatusName: 'Approved',
      Provider_Name: 'City Hospital',
      Diagnosis_Desc: 'Appendicitis',
      Payment_type: 'Cashless',
      SubmiitedClaim: 15000,
      TotalPaid: 14000,
      DeductedAmount: 1000,
      ClaimsDescription: 'Claim is under review',
      DeductionReason: 'N/A',
    },
    {
      ClaimID: '1002',
      ClaimStatus: 'Processed',
      RelationName: 'Jane Doe',
      ClaimSubmittedDate: '2025-09-15',
      ClaimReceivedDate: '2025-09-20',
      ActionClosed: '2025-09-25',
      ClaimsSubTypeName: 'OPD',
      ClaimStatusName: 'Paid',
      Provider_Name: 'Downtown Clinic',
      Diagnosis_Desc: 'Flu',
      Payment_type: 'Reimbursement',
      SubmiitedClaim: 2000,
      TotalPaid: 2000,
      DeductedAmount: 0,
      ClaimsDescription: 'Claim processed successfully',
      DeductionReason: '',
    },
  ];

  useEffect(() => {
    setAllData(
      hardcodedClaims.map(claim =>
        transformClaimData(claim, type === 'In-Process'),
      ),
    );
  }, [type]);

  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    let currentData = allData;
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
  }, [searchText, allData]);

  const onPressType = _type => {
    setType(_type);
  };

  return {
    states: {
      data,
      claimDataLoading: false,
      type,
      showRemarks,
      remarks,
      getHeadingSubHeading,
      isInProcessAllowed,
      searchText,
    },
    functions: {
      goBack,
      onPressType,
      onCloseRemarksModal,
      setSearchText,
    },
  };
};

export default useClaimsHistoryViewModel;
