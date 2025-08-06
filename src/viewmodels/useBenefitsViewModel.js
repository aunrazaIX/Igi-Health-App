import {useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useState} from 'react';

const useBenefitsViewModel = () => {
  let {user} = useSelector(state => state.auth);
  let {policyClass} = useSelector(state => state.general);

  const [allBenefits, setAllBenefits] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Inpatient');

  const onPressTab = tab => {
    setSelectedTab(tab);
  };

  const formatPrice = value => {
    if (!value) return '0';

    const number = Number(value);
    if (isNaN(number)) return value;

    return new Intl.NumberFormat('en-PK').format(number);
  };
  const navigation = useNavigation();

  const {loading: benefitsloading, error} = useApiHook({
    apiEndpoint: endpoints.Benefits.getBenefits,
    method: 'get',
    argsOrBody: {
      ClientCode: user?.ClientCode,
      Policy_Class: policyClass,
    },
    onSuccess: res => {
      setAllBenefits(res);
    },
  });

  let filteredData = allBenefits
    ?.filter(item => {
      if (selectedTab === 'Outpatient') {
        return item.BenefitTypeName === 'OPD';
      } else if (selectedTab === 'Inpatient') {
        return item.BenefitTypeName === 'IPD';
      } else if (selectedTab === 'Maternity') {
        return item.BenefitTypeName !== 'OPD' && item.BenefitTypeName !== 'IPD';
      }
      return false;
    })
    .map(item => ({
      title: item.BenefitDetails,
      price: formatPrice(item?.EntitlementLimits),
      image: icons.benefits2,
    }));

  const goBack = () => {
    navigation.goBack();
  };

  return {
    states: {
      data: filteredData,
      selectedTab,
      benefitsloading,
    },
    functions: {
      goBack,
      onPressTab,
    },
  };
};

export default useBenefitsViewModel;
