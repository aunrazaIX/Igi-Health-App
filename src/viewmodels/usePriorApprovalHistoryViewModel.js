import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {icons} from '../assets';
import moment from 'moment';
import {formatCurrencyWithPKR, formatName} from '../utils';

const usePriorApprovalHistoryViewModel = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const goBack = () => navigation.goBack();
  const onCloseRemarksModal = () => setShowRemarks(false);

  const priorApprovals = [
    {
      RequestID: 112233,
      RequestStatus: 'Approved',
      UserRelationName: 'Ayesha Khan',
      relation_type: 'Wife',
      HospitalName: 'City Hospital Karachi',
      TreatmentTypeName: 'MRI Scan',
      admission_number: 'CH-9827',
      admission_date: '2024-05-03T10:30:00',
      Amount: 15000,
      RequestComments: 'Routine MRI scan requested.',
      RequestAddedDateTime: '2024-05-02T09:20:00',
      ClosureDate: '2024-05-03T18:20:00',
      request_closed_remarks: 'Approved after evaluation.',
    },
    {
      RequestID: 224466,
      RequestStatus: 'Rejected',
      UserRelationName: 'Ali Khan',
      relation_type: 'Son',
      HospitalName: 'Liaquat National Hospital',
      TreatmentTypeName: 'Consultation',
      admission_number: 'LN-4567',
      admission_date: '2024-04-10T14:00:00',
      Amount: 3000,
      RequestComments: 'General consultation approval.',
      RequestAddedDateTime: '2024-04-09T16:00:00',
      ClosureDate: '2024-04-10T18:00:00',
      request_closed_remarks: 'Rejected due to policy.',
    },
    {
      RequestID: 778899,
      RequestStatus: 'Pending',
      UserRelationName: 'Shahnaz Bibi',
      relation_type: 'Mother',
      HospitalName: 'Aga Khan Hospital',
      TreatmentTypeName: 'Lab Tests',
      admission_number: 'AKH-7712',
      admission_date: '2024-05-15T11:00:00',
      Amount: 8500,
      RequestComments: 'Blood tests required.',
      RequestAddedDateTime: '2024-05-14T09:00:00',
      ClosureDate: null,
      request_closed_remarks: null,
    },
  ];

  const transformClaimData = claim => ({
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
      {label: 'Hospital Name:', value: claim?.HospitalName},
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
          'MMM DD, YYYY hh:mm A',
        ),
      },
      {
        label: 'Closure Date:',
        value: claim?.ClosureDate
          ? moment(claim?.ClosureDate).format('MMM DD, YYYY hh:mm A')
          : '--',
      },
      {
        label: 'Decision Remarks:',
        value: claim?.request_closed_remarks || '--',
      },
    ],
  });

  useEffect(() => {
    const transformed = priorApprovals.map(item => transformClaimData(item));
    setAllData(transformed);
  }, []);

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
      claimDataLoading: false,
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
