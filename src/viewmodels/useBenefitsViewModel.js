/* eslint-disable curly */
import {useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useSelector} from 'react-redux';

const useBenefitsViewModel = () => {
  const navigation = useNavigation();
  const [allBenefits, setAllBenefits] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Inpatient');
  const [modalVisible, setModalVisible] = useState({show: false, note: ''});
  const {selectedPolicyObject} = useSelector(state => state.general);
  const onPressTab = tab => {
    setSelectedTab(tab);
  };

  const formatPrice = value => {
    if (!value) return '0';
    const number = Number(value);
    if (isNaN(number)) return value;
    return new Intl.NumberFormat('en-PK').format(number);
  };

  const {loading: benefitsloading} = useApiHook({
    argsOrBody: {
      PolicyNumber: selectedPolicyObject?.policyNumber,
      PlanCode: selectedPolicyObject?.planCode,
    },
    apiEndpoint: endpoints.benefits.getBenefits,
    method: 'get',
    onSuccess: res => {
      setAllBenefits(res?.data);
    },
    onError: e => {
      console.log('Error', e);
    },
  });

  const filteredData = allBenefits
    ?.filter(item => {
      if (selectedTab === 'Outpatient') {
        return item?.benefitType?.benefitTypeName === 'OPD';
      } else if (selectedTab === 'Inpatient') {
        return item?.benefitType?.benefitTypeName === 'IPD';
      } else if (selectedTab === 'Maternity') {
        return (
          item?.benefitType?.benefitTypeName !== 'OPD' &&
          item?.benefitType?.benefitTypeName !== 'IPD'
        );
      }
      return false;
    })
    .map(item => ({
      title: item.benefitDetails,
      price: formatPrice(item?.entitlementLimits),
      image: icons.benefits2,
      CoverageEligibility: `Coverage Eligibility: ${item?.coverageEligibility}`,
      note: item?.note !== '-' ? `Note: ${item?.note}` : null,
    }));

  const goBack = () => {
    navigation.goBack();
  };

  const setModalData = ({show, itemData}) => {
    setModalVisible({
      itemData: itemData,
      show: show,
    });
  };

  return {
    states: {
      data: filteredData,
      selectedTab,
      benefitsloading,
      modalVisible,
    },
    functions: {
      goBack,
      onPressTab,
      setModalData,
    },
  };
};

export default useBenefitsViewModel;
