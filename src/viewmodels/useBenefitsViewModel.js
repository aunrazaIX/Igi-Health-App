import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
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
  const payload = JSON.stringify(['abc']);
  const {loading: benefitsloading, trigger} = useApiHook({
    apiEndpoint: endpoints.Benefits.getBenefits,
    method: 'post',
    argsOrBody: payload,
    onSuccess: res => {
      setAllBenefits(res.data);
    },
    onError: e => {
      dispatch(
        setErrorModal({
          Show: true,
          message: e?.message,
        }),
      );
    },
  });
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, []),
  );

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
