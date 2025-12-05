import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useBenefitsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const {policyClass} = useSelector(state => state.general);
  const navigation = useNavigation();
  const [allBenefits, setAllBenefits] = useState([]);

  const [selectedTab, setSelectedTab] = useState('Inpatient');
  const [modalVisible, setModalVisible] = useState({show: false, note: ''});
  const onPressTab = tab => {
    setSelectedTab(tab);
  };

  const formatPrice = value => {
    if (!value) return '0';

    const number = Number(value);
    if (isNaN(number)) return value;

    return new Intl.NumberFormat('en-PK').format(number);
  };

const {loading: benefitsloading, trigger} = useApiHook({
    apiEndpoint: endpoints.Benefits.getBenefits,
    method: 'post',
    argsOrBody: ["string"],
    onSuccess: res => {
      setAllBenefits(res.data);
      console.log(res)
    },
     onError: e => {
      console.log(e)}
  });
  useFocusEffect(
  useCallback(() => {
  trigger();
}, []))
console.log(benefitsloading, 'fhgfh');
  const filteredData = allBenefits
    ?.filter(item => {
      if (selectedTab === 'Outpatient') {
        return item.benefitTypeName === 'OPD';
      } else if (selectedTab === 'Inpatient') {
        return item.benefitTypeName === 'IPD';
      } else if (selectedTab === 'Maternity') {
        return item.benefitTypeName !== 'OPD' && item.benefitTypeName !== 'IPD';
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
