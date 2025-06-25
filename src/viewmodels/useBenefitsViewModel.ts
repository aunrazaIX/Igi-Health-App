import {useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useState} from 'react';
import {RootState} from '../redux/store';

type UseBenefitsViewModel = {
  states: {
    data: CoverageBenefit[];

    benefitsloading: any;
    selectedTab: any;
  };
  functions: {
    goBack: () => void;
    onPressTab: any;
  };
};

type CoverageBenefit = {
  title: string;
  price: string;
  image: ImageSourcePropType;
};

const useBenefitsViewModel = (): UseBenefitsViewModel => {
  let {user} = useSelector((state: RootState) => state.auth);

  const [allBenefits, setAllBenefits] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Inpatient');

  const onPressTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const formatPrice = (value: any) => {
    if (!value) return '0';

    const number = Number(value);
    if (isNaN(number)) return value;

    return new Intl.NumberFormat('en-PK').format(number);
  };
  const navigation = useNavigation();

  const {data: benefitsData, loading: benefitsloading} = useApiHook({
    apiEndpoint: endpoints.Benefits.getBenefits,
    method: 'get',
    argsOrBody: {
      ClientCode: user?.ClientCode,
    },
    onSuccess: res => {
      setAllBenefits(res);
    },
  });

  let filteredData = allBenefits
    .filter((item: any) => {
      if (selectedTab === 'Outpatient') {
        return item.BenefitTypeName === 'OPD';
      } else if (selectedTab === 'Inpatient') {
        return item.BenefitTypeName === 'IPD';
      } else if (selectedTab === 'Maternity') {
        return item.BenefitTypeName !== 'OPD' && item.BenefitTypeName !== 'IPD';
      }
      return false;
    })
    .map(
      (item: any): CoverageBenefit => ({
        title: item.BenefitDetails,
        price: formatPrice(item?.EntitlementLimits),
        image: icons.medicalList,
        // imageDisabled : icons.
      }),
    );

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
