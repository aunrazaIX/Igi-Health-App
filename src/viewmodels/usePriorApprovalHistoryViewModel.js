import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {icons} from '../assets';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';
import {all} from 'axios';

const usePriorApprovalHistoryViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);
  const [allData, setAllData] = useState([]);

  const transformClaimData = (claim, isInProcess) => ({
    headerLabel: `Prior Approval #${claim.RequestID}`,
    ClaimStatus: claim?.RequestStatus,
    headerIcon: icons.taskEdit,
    RelationName: claim?.UserRelationName
      ? formatName(claim?.UserRelationName.trim())
      : '--',
    items: [
      {
        label: 'Patient Name:',
        value: claim?.UserRelationName
          ? formatName(claim?.UserRelationName.trim())
          : '--',
      },
      {label: 'Relationship:', value: claim?.relation_type?.trim()},
      {
        label: 'Hospital Name:',
        value: claim?.HospitalName,
      },
      {label: 'Treatment/Service:', value: claim?.TreatmentTypeName?.trim()},
      {label: 'Admission/M.R.#:', value: claim?.admission_number ?? '--'},
      {
        label: 'Adm./Procedure Date:',
        value: claim?.admission_date
          ? moment(claim?.admission_date).format('DD-MMM-YYYY')
          : '--',
      },
      {label: 'Estimated Cost:', value: formatCurrencyWithPKR(claim?.Amount)},
      {label: 'Description:', value: claim?.RequestComments},
      {label: 'Status:', value: claim?.RequestStatus},
      {
        label: 'Request Date:',
        value: moment(claim?.RequestAddedDateTime).format(
          'MMM DD,YYYY hh:mm A',
        ),
      },
      {
        label: 'Closure Date:',
        value: claim?.ClosureDate
          ? moment(claim?.ClosureDate).format('MMM DD,YYYY hh:mm A')
          : '--',
      },
      {
        label: 'Decision Remarks:',
        value: claim?.request_closed_remarks || '--',
      },
    ].filter(Boolean),
  });

  const {loading} = useApiHook({
    apiEndpoint: endpoints.PriorApprovalHistory.getPriorApprovalRequests,
    method: 'get',
    argsOrBody: {userId: user?.UserId, clientCode: user?.ClientCode},
    onSuccess: res => {
      setAllData(res?.map(claim => transformClaimData(claim, true)));
    },
  });

  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    let currentData = allData;
    console.log(currentData);
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

  return {
    states: {
      data,
      claimDataLoading: loading,
      showRemarks,
      remarks,
      searchText,
    },
    functions: {
      goBack,
      onCloseRemarksModal,
      setSearchText,
    },
  };
};

export default usePriorApprovalHistoryViewModel;
