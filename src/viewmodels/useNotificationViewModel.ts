import {useNavigation} from '@react-navigation/native';

type useNotificationViewModel = {
  functions: {
    goBack: () => void;
  };
};
export const useNotificationViewModel = (): useNotificationViewModel => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return {
    functions: {
      goBack,
    },
  };
};


