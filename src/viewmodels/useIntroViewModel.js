import {useNavigation} from '@react-navigation/native';
import {setIntroSlider} from '../redux/generalSlice';
import {useDispatch} from 'react-redux';
import {images} from '../assets';

const useIntroViewModel = () => {
  const backgroundImages = [
    {
      images: images['5'],
    },
    {
      images: images['1'],
    },
    {
      images: images['2'],
    },

    {
      images: images['4'],
    },
    {
      images: images['3'],
    },
  ];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNextButton = () => {
    navigation.navigate('Login');
    dispatch(setIntroSlider(false));
  };

  return {
    states: {
      backgroundImages,
    },
    functions: {
      handleNextButton,
    },
  };
};

export default useIntroViewModel;
