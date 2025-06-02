import {useNavigation} from '@react-navigation/native';
import {icons} from '../assets';
import {ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useState} from 'react';

type UseBenefitsViewModel = {
  states: {
    data: CoverageBenefit[];

    benefitsloading: any;
  };
  functions: {
    goBack: () => void;
  };
};

type CoverageBenefit = {
  title: string;
  price: string;
  image: ImageSourcePropType;
};

const useBenefitsViewModel = (): UseBenefitsViewModel => {
  let {user} = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const {data: benefitsData, loading: benefitsloading} = useApiHook({
    apiEndpoint: endpoints.Benefits.getBenefits,
    method: 'get',
    argsOrBody: {
      ClientCode: user?.ClientCode,
    },
    onSuccess: res => {
      const formattedData = res.map(
        (item: any): CoverageBenefit => ({
          title: item.BenefitDetails,
          price: item?.EntitlementLimits,
          image: icons.medicalList,
        }),
      );

      setData(formattedData);
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  return {
    states: {
      data,

      benefitsloading,
    },
    functions: {
      goBack,
    },
  };
};

export default useBenefitsViewModel;
