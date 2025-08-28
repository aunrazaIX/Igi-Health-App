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
  const [data, setData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');

  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);

  const transformClaimData = (claim, isInProcess) => ({
    headerLabel: `Prior Approval #${claim.RequestID}`,
    ClaimStatus: claim?.RequestStatus,
    headerIcon: icons.taskEdit,
    RelationName: claim?.UserRelationName,
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
      {label: 'Request ID:', value: claim?.RequestID},
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
        label: 'DecisionRemarks:',
        value: claim?.request_closed_remarks || '--',
      },
    ].filter(Boolean),
  });

  const {loading} = useApiHook({
    apiEndpoint: endpoints.PriorApprovalHistory.getPriorApprovalRequests,
    method: 'get',
    argsOrBody: {userId: user?.UserId, clientCode: user?.ClientCode},
    onSuccess: res => {
      console.log(res, 'res');
      setData(res?.map(claim => transformClaimData(claim, true)));
    },
  });

  return {
    states: {
      data,
      claimDataLoading: loading,
      showRemarks,
      remarks,
    },
    functions: {
      goBack,
      onCloseRemarksModal,
    },
  };
};

export default usePriorApprovalHistoryViewModel;
