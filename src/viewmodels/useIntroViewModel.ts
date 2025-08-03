import {useNavigation} from '@react-navigation/native';
import {setIntroSlider} from '../redux/generalSlice';
import {useDispatch} from 'react-redux';

type useIntroViewProps = {
  functions: {
    handleNextButton: (route: string) => void;
  };
};
const useIntroViewModel = (): useIntroViewProps => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNextButton = (route: string) => {
    navigation.navigate(route);
    dispatch(setIntroSlider(false));
  };

  return {
    functions: {
      handleNextButton,
    },
  };
};

export default useIntroViewModel;
