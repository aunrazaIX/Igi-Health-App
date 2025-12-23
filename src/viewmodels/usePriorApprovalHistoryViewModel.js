import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {icons} from '../assets';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const usePriorApprovalHistoryViewModel = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);
//debouncing
  const {
    trigger,
    loading,
  } = useApiHook({
    apiEndpoint: endpoints.priorApproval.getPriorApprovalHistory,
    method: 'post',
    argsOrBody: {
      isAllRecord: true,
    },
    onSuccess: res => {
      const transformed = res?.data?.dataList?.map(transformClaimData);
      setAllData(transformed);
      setData(transformed);
    },
  });
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, []),
  );

  const transformClaimData = item => {
    const totalAmount = item?.services?.reduce(
      (sum, s) => sum + (s?.estimatedCost || 0),
      0,
    );
    const serviceName =
      item?.services?.map(s => s?.serviceName).join(', ') || '--';
    const status =
      item?.status === 1
        ? 'Pending'
        : item?.status === 2
        ? 'Approved'
        : 'Rejected';

    return {
      headerLabel: `Prior Approval #${item?.id}`,
      ClaimStatus: status,
      headerIcon: icons.taskEdit,
      RelationName: formatName(item?.patientName?.trim()),
      items: [
        {label: 'Patient Name:', value: formatName(item?.patientName?.trim())},
        {label: 'Hospital Name:', value: item?.hospital},
        {label: 'Service:', value: serviceName},
        {
          label: 'Procedure Date:',
          value: item?.services?.[0]?.procedureDate
            ? moment(item.services[0].procedureDate).format('DD-MMM-YYYY')
            : '--',
        },
        {
          label: 'Estimated Cost:',
          value: formatCurrencyWithPKR(totalAmount),
        },
        {label: 'Remarks:', value: item?.remarks || '--'},
        {label: 'Status:', value: status},
        {
          label: 'Request Date:',
          value: moment(item?.createdOn).format('DD-MMM-YYYY'),
        },
        {
          label: 'Decision Remarks:',
          value: item?.adminRemarks || '--',
        },
      ],
    };
  };

  useEffect(() => {
    const lowerText = searchText.toLowerCase();

    const filtered = allData.filter(
      item =>
        item.headerLabel.toLowerCase().includes(lowerText) ||
        item.items.some(sub => sub.value?.toLowerCase().includes(lowerText)),
    );

    setData(filtered);
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
