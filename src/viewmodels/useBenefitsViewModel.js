import {useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {useSelector} from 'react-redux';
import {useState} from 'react';

const useBenefitsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const {policyClass} = useSelector(state => state.general);
  const navigation = useNavigation();
  const [allBenefits, setAllBenefits] = useState([
    {
      BenefitTypeName: 'IPD',
      BenefitDetails: 'Hospitalization Coverage',
      EntitlementLimits: 1000000,
      CoverageEligibility: 'Eligible after 30 days',
      Note: 'Includes room charges',
    },
    {
      BenefitTypeName: 'OPD',
      BenefitDetails: 'Outpatient Visits',
      EntitlementLimits: 50000,
      CoverageEligibility: 'Immediate',
      Note: '-',
    },
    {
      BenefitTypeName: 'MAT',
      BenefitDetails: 'Maternity Benefits',
      EntitlementLimits: 200000,
      CoverageEligibility: 'After 1 year',
      Note: 'Covers delivery expenses',
    },
  ]);

  const [selectedTab, setSelectedTab] = useState('Inpatient');
  const [modalVisible, setModalVisible] = useState({show: false, note: ''});
  const [benefitsLoading] = useState(false);

  const onPressTab = tab => {
    setSelectedTab(tab);
  };

  const formatPrice = value => {
    if (!value) return '0';

    const number = Number(value);
    if (isNaN(number)) return value;

    return new Intl.NumberFormat('en-PK').format(number);
  };

  const filteredData = allBenefits
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
      CoverageEligibility: `Coverage Eligibility: ${item?.CoverageEligibility}`,
      note: item?.Note !== '-' ? `Note: ${item?.Note}` : null,
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
      benefitsLoading,
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
